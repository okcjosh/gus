/* eslint-disable no-unused-vars,arrow-body-style,camelcase,prefer-reflect */
/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/events              ->  index
 * POST    /api/events              ->  create
 * GET     /api/events/:id          ->  show
 * PUT     /api/events/:id          ->  upsert
 * PATCH   /api/events/:id          ->  patch
 * DELETE  /api/events/:id          ->  destroy
 */

'use strict';

import sequelize from 'sequelize';

import jsonpatch from 'fast-json-patch';

import gateway from './../../gateway';

import shortid from 'shortid';
import moment from 'moment';

import {Event, Status, JobType, User, Leo, JobInvitation} from '../../sqldb';

import { sendEventCompletionEmail } from './../../email';
import { sendEventCompletionText } from './../../twilio';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if(entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
  };
}

function patchUpdates(patches) {
  return function(entity) {
    try {
      jsonpatch.apply(entity, patches, /*validate*/ true);
    } catch(err) {
      return Promise.reject(err);
    }

    return entity.save();
  };
}

function removeEntity(res) {
  return function(entity) {
    if(entity) {
      return entity.destroy()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if(!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    console.log(statusCode);
    console.log(err);
    res.status(statusCode).send(err);
  };
}

function getLeosForEvent(eventId, status) {
  let query = {
    where: {
      event_id: eventId
    }, include: [Leo]
  };

  status && (query.where.status = status);

  return JobInvitation.findAll(query);
}

function payLeo(leo, amount) {
  return new Promise((resolve, reject) => {
    gateway.transaction.sale({
      merchantAccountId: leo.name,
      amount: parseInt(amount, 10),
      paymentMethodNonce: 'fake-valid-nonce',
      serviceFeeAmount: 11 * .25,
      options: {
        submitForSettlement: true
      }
    }, function(err, result) {
      // console.log(err, result);
      if(err) {
        return reject(err);
      }
      resolve(result);
    });
  });
}

function chargeForService(amount) {
  return new Promise((resolve, reject) => {
    gateway.transaction.sale({
      merchantAccountId: 'americanhustlersyndicate',
      amount: parseInt(amount, 10),
      paymentMethodNonce: 'fake-valid-nonce',
      options: {
        submitForSettlement: true
      }
    }, function(err, result) {
      // console.log(err, result);
      if(err) {
        return reject(err);
      }
      resolve(result);
    });
  });
}

// Pass the event with the JobType included for which the cost is to be calculted
export function CostCalculator(event) {
  function yesNo(v) {
    return v === 'yes' ? 1 : 0;
  }

  event.JobType = event.JobType || {};

  let c = {
    base: {
      cost: event.JobType.base_price,
      total: event.JobType.base_price || 0
    },
    officers: {
      cost: event.JobType.officer_rate,
      count: Math.ceil(event.crowd_size / 20), //event.prefered_officer_name.split(',').length,
      total: event.JobType.officer_rate * Math.ceil(event.crowd_size / 20) || 0//(event.prefered_officer_name.split(',').length)) || 0
    },
    time: {
      cost: event.JobType.hour_rate,
      count: event.hours_expected,
      total: event.JobType.hour_rate * event.hours_expected || 0
    },
    crowd: {
      cost: event.JobType.crowd_rate,
      count: event.crowd_size,
      total: event.JobType.crowd_rate * (event.crowd_size / 10) || 0
    },
    alcohol: {
      cost: event.JobType.alcohol,
      count: event.alcohol,
      total: event.JobType.alcohol * yesNo(event.alcohol) || 0
    },
    police_vehicle: {
      cost: event.JobType.police_vehicle,
      count: event.police_vehicle,
      total: event.JobType.police_vehicle * yesNo(event.police_vehicle) || 0
    },
    barricade: {
      cost: event.JobType.barricade,
      count: event.barricade,
      total: event.JobType.barricade * yesNo(event.barricade) || 0
    },
    amplified_sound: {
      cost: event.JobType.amplified_sound,
      count: event.amplified_sound,
      total: event.JobType.amplified_sound * yesNo(event.amplified_sound) || 0
    },
  };

  c.grand_total = c.base.total
                + c.officers.total
                + c.time.total
                + c.crowd.total
                + c.alcohol.total
                + c.police_vehicle.total
                + c.barricade.total
                + c.amplified_sound.total;

  // The extra 7% for MyOfficers
  c.service_charge = parseInt(c.grand_total * 0.07, 10);
  // Add Service Charge to Grand Total
  c.grand_total += c.service_charge;

  return c;
}

// This will accumulate the cost JSON for all shifts into one
export function CostCalculatorRecurring(events) {
  let recurringCost = {
    shiftsCosts: [],
    totalCost: {}
  };

  events.forEach(ev => {
    let c = CostCalculator(ev);
    recurringCost.shiftsCosts.push(c);
  });

  let firstCost = JSON.parse(JSON.stringify(recurringCost.shiftsCosts[0]));

  recurringCost.totalCost = recurringCost.shiftsCosts.reduce((acc, cost) => {
    let newCost = Object.assign({}, cost);

    [
      'officers',
      'time',
      'crowd',
      'alcohol',
      'police_vehicle',
      'barricade',
      'amplified_sound'
    ].forEach(i => {
      acc[i].cost = acc[i].cost + newCost[i].cost;
      acc[i].count = acc[i].count + newCost[i].count;
      acc[i].total = acc[i].total + newCost[i].total;
    });

    acc.base.cost = acc.base.cost + newCost.base.cost;
    acc.base.total = acc.base.total + newCost.base.total;
    acc.grand_total = acc.grand_total + newCost.grand_total;

    return acc;
  });

  recurringCost.shiftsCosts[0] = firstCost;

  return recurringCost;
}

// Gets a list of Events
export function index(req, res) {
  return Event.findAll({
    include: [JobType, Status],
    where: {
      is_recuring: false
    }
    // order: [
    //   ['date', 'ASC']
    // ]
  })
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a list of Events
export function listRecurringCollection(req, res) {
  return Event.findAll({
    include: [JobType, Status],
    where: {
      recuring_collection_id: req.params.id
    }
    // order: [
    //   ['date', 'ASC']
    // ]
  })
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a list of Events
export function indexRecurring(req, res) {
  return Event.findAll({
    // include: [JobType, Status],
    where: {
      is_recuring: true
    },
    attributes: [
      [sequelize.fn('DISTINCT', sequelize.col('recuring_collection_id')), 'recuring_id'],
      'venue',
      'email',
      'address',
      'phone_number'
    ]
  })
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Event from the DB
export function show(req, res) {
  return Event.find({
    where: {
      _id: req.params.id
    },
    include: [JobType, User, Status]
  })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

export function leosForEvent(req, res) {
  return getLeosForEvent(req.params.id, req.query.status)
    .then(respondWithResult(res))
    .catch(handleError(res));
}

export function completeEventPayment(req, res) {
  return getLeosForEvent(req.params.id, 'Accepted')
    .then(handleEntityNotFound(res))
    .then(leos => {
      Event.findOne = function(param) {
      };
      return Event.findOne({ where: { _id: req.params.id }, include: [User, JobType]})
        .then(event => {
          let amount;
          amount = CostCalculator(event) || req.body.amount;
          let leoShare = amount - amount * .07;

          chargeForService(amount * .07)
            .then(result => {
              Event.update({
                btTransactionId: result.transaction.id,
                paymentStatus: result.transaction.status
              }, { where: {
                _id: req.params.id
              }});
            })
            .catch(() => {
              Event.update({
                paymentStatus: 'Error'
              }, { where: {
                _id: req.params.id
              }});
            });

          // divide leoShare among number of leos who accepted the job
          leos.forEach(leo => {
            payLeo(leo, leoShare / leos.length)
              .then(result => {
                JobInvitation.update({
                  btTransactionId: result.transaction.id,
                  paymentStatus: result.transaction.status
                }, { where: {
                  event_id: req.params.id,
                  leo_id: leo._id
                }});
              })
              .catch(() => {
                JobInvitation.update({
                  paymentStatus: 'Error'
                }, { where: {
                  event_id: req.params.id,
                  leo_id: leo._id
                }});
              });
          });
          return event;
        });
    })
    .then(event => {
      sendEventCompletionText(event);
      sendEventCompletionEmail(event);
      // 5 is Completed Status Id
      event.StatusId = 5;
      event.save();
      return event;
    })
    .then(respondWithResult(res))
    .catch(handleError(res));
}

export function showByStatus(req, res) {
  return Event.find({
    where: {
      status_id: req.params.status_id
    }
  })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// export function getStatus(req, res) {
//   let StatusId;
//   return Event.find({
//     where: {
//       status_id: req.params.StatusId
//
//     }
//
//   })
//
//     .then(handleEntityNotFound(res))
//     .then(respondWithResult(res))
//     .catch(handleError(res));
// }

export function approve(req, res) {
  let id = req.params.id;
  Event.seq.query(`update Events set StatusId = 2 where _id =${id}`);
  res.status(200).end();
}

export function getEventCost(req, res) {
  return Event.find({
    where: {
      _id: req.params.id
    },
    include: [JobType]
  }).then(function(event) {
    let c = CostCalculator(event);
    res.json(c);
  });
}

// Creates a new Event or series of events in the DB
export function create(req, res) {
  req.body.UserId = req.user._id;
  let eventData = req.body;

  // This will run if the event is a recurring event
  if(eventData.is_recuring) {
    eventData.recuring_data = eventData.recuring_data || [];
    if(!eventData.recuring_data.length) {
      return handleError(res, 400)('Recurring Data must be at least 1');
    }
    eventData.recuring_collection_id = shortid.generate();
    let recuringEvents = eventData.recuring_data.map(data => {
      let newEvent = Object.assign({}, eventData);

      newEvent.date = data.start;
      newEvent.hours_expected = moment(data.end).diff(moment(data.start), 'h');
      delete newEvent.recuring_data;

      return newEvent;
    });

    return Event.bulkCreate(recuringEvents)
      .then(() => {
        return Event.findAll({
          where: {
            recuring_collection_id: eventData.recuring_collection_id
          },
          include: [JobType, User]
        })
          .then(reloadedEvents => {
            let recurringCost = CostCalculatorRecurring(reloadedEvents);
            res.status(201).json({
              event: reloadedEvents[0],
              events: reloadedEvents,
              cost: recurringCost.shiftsCosts[0],
              recurringCost,
              totalCost: recurringCost.totalCost
            });
          });
      })
      .catch(handleError(res));
  }

  // This will run if the event is a Single event
  return Event.create(req.body)
    .then(function(event) {
      event.setUser(req.user._id)
        .then(function(user) {
          event.reload({
            include: [User, JobType]
          }).then(function() {
            res.status(201).json({
              event,
              cost: CostCalculator(event)
            });
          });
        });
    })
    .catch(handleError(res));
}

// Upserts the given Event in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    Reflect.deleteProperty(req.body._id);
  }

  return Event.upsert(req.body, {
    where: {
      _id: req.params.id
    }
  })
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Updates an existing Event in the DB
export function patch(req, res) {
  if(req.body._id) {
    Reflect.deleteProperty(req.body._id);
  }
  return Event.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

export function expressInterest(req, res) {
  Leo.findOne({ where: { _id: req.params.leo_id }})
    .then(leo => `${leo.firstName} ${leo.lastName}`)
    .then(name => {
      Event.find({ where: { _id: req.params.event_id }})
        .then(handleEntityNotFound(res))
        .then(event => {
          let interestedOfficers = [];
          if(event.interested_officers) {
            // Using set to make array unique
            interestedOfficers = [...new Set(event.interested_officers.split(','))];
          }

          interestedOfficers.push(name);
          event.interested_officers = interestedOfficers.join(',');

          return event.save();
        })
        .then(respondWithResult(res))
        .catch(handleError(res));
    });
}

// Deletes a Event from the DB
export function destroy(req, res) {
  return Event.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
