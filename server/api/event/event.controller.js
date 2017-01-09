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
import {Event, Status, JobType, User} from '../../sqldb';

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
      count: Math.ceil(event.crowd_size / 20),//event.prefered_officer_name.split(',').length,
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
    }
  };

  c.grand_total = c.base.total +
                  c.officers.total +
                  c.time.total +
                  c.crowd.total +
                  c.alcohol.total +
                  c.police_vehicle.total +
                  c.barricade.total +
                  c.amplified_sound.total;

  return c;
}

// Gets a list of Events
export function index(req, res) {
  return Event.findAll({
    include: [JobType, Status]
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
  var id = req.params._id
  Event.seq.query("update Events set StatusId = 2 where _id =" + id);
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
    res.send(c);
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
