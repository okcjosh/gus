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

import jsonpatch from 'fast-json-patch';

import gateway from './../../gateway';

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
    return v == 'yes' ? 1 : 0;
  }

  var c = {
    base: {
      cost: event.JobType.base_price,
      total: event.JobType.base_price || 0
    },
    officers: {
      cost: event.JobType.officer_rate,
      count: Math.ceil(event.crowd_size / 20), //event.prefered_officer_name.split(',').length,
      total: (event.JobType.officer_rate * Math.ceil(event.crowd_size / 20)) || 0//(event.prefered_officer_name.split(',').length)) || 0
    },
    time: {
      cost: event.JobType.hour_rate,
      count: event.hours_expected,
      total: (event.JobType.hour_rate * event.hours_expected) || 0
    },
    crowd: {
      cost: event.JobType.crowd_rate,
      count: event.crowd_size,
      total: (event.JobType.crowd_rate * (event.crowd_size / 10)) || 0
    },
    alcohol: {
      cost: event.JobType.alcohol,
      count: event.alcohol,
      total: (event.JobType.alcohol * yesNo(event.alcohol)) || 0
    },
    police_vehicle: {
      cost: event.JobType.police_vehicle,
      count: event.police_vehicle,
      total: (event.JobType.police_vehicle * yesNo(event.police_vehicle)) || 0
    },
    barricade: {
      cost: event.JobType.barricade,
      count: event.barricade,
      total: (event.JobType.barricade * yesNo(event.barricade)) || 0
    },
    amplified_sound: {
      cost: event.JobType.amplified_sound,
      count: event.amplified_sound,
      total: (event.JobType.amplified_sound * yesNo(event.amplified_sound)) || 0
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

// Gets a list of Events
export function index(req, res) {
  return Event.findAll({
    include: [JobType, Status]
  })
    .then(respondWithResult(res))
    .catch(() => handleError(res));
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
      return Event.findOne({ where: { _id: req.params.id }, include: [User, JobType]})
        .then(event => {
          let amount = req.body.amount || CostCalculator(event);
          let leoShare = amount - (amount * .07);

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

export function approve(req, res) {
  var id = req.params._id;
  Event.seq.query('update Events set StatusId = 2 where _id =' + id);
  res.status(200).end();
}

export function getEventCost(req, res) {
  return Event.find({
    where: {
      _id: req.params.id
    },
    include: [JobType]
  }).then(function(event) {
    var c = CostCalculator(event);
    res.json(c);
  });
}

// Creates a new Event in the DB
export function create(req, res) {
  return Event.create(req.body)
    .then(function(event) {
      event.setUser(req.user._id)
        .then(function(user) {
          event.reload({
            include: [User, JobType]
          }).then(function() {
            res.status(201).json({
              event: event,
              cost: CostCalculator(event)
            });
          });
        });
    })
    //.then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Upserts the given Event in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    delete req.body._id;
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
    delete req.body._id;
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
    .then(leo => leo.firstName + ' ' + leo.lastName)
    .then(name => {
      Event.find({ where: { _id: req.params.event_id }})
        .then(handleEntityNotFound(res))
        .then(event => {
          let interestedOfficers = [];
          if(event.interested_officers) {
            // Using set to make array unique
            interestedOfficers = [... new Set(event.interested_officers.split(','))];
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
