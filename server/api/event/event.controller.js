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
import {Event, Status, JobType} from '../../sqldb';

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
      cost: event.job_type.base_price,
      total: event.job_type.base_price || 0
    },
    officers: {
      cost: event.job_type.officer_rate,
      count: event.prefered_officer_name.split(',').length,
      total: (event.job_type.officer_rate * (event.prefered_officer_name.split(',').length)) || 0
    },
    time: {
      cost: event.job_type.hour_rate,
      count: event.hours_expected,
      total: (event.job_type.hour_rate * event.hours_expected) || 0
    },
    crowd: {
      cost: event.job_type.crowd_rate,
      count: event.crowd_size,
      total: (event.job_type.crowd_rate * event.crowd_size) || 0
    },
    alchohol: {
      cost: event.job_type.alchohol,
      count: event.alchohol,
      total: (event.job_type.alchohol * yesNo(event.alchohol)) || 0
    },
    police_vehicle: {
      cost: event.job_type.police_vehicle,
      count: event.police_vehicle,
      total: (event.job_type.police_vehicle * yesNo(event.police_vehicle)) || 0
    },
    barricade: {
      cost: event.job_type.barricade,
      count: event.barricade,
      total: (event.job_type.barricade * yesNo(event.barricade)) || 0
    },
    amplified_sound: {
      cost: event.job_type.amplified_sound,
      count: event.amplified_sound,
      total: (event.job_type.amplified_sound * yesNo(event.amplified_sound)) || 0
    }
  };

  c.grand_total = c.base.total +
                  c.officers.total +
                  c.time.total +
                  c.crowd.total +
                  c.alchohol.total +
                  c.police_vehicle.total +
                  c.barricade.total +
                  c.amplified_sound.total;

  return c;
}

// Gets a list of Events
export function index(req, res) {
  return Event.findAll({
    include: [JobType]
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
    include: [JobType]
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

export function getEventCost(req, res) {
  Event.find({
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
  // need the current user id
  return Event.create(req.body)
    .then(respondWithResult(res, 201))
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
