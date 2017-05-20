/* eslint-disable camelcase,prefer-reflect */
/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/job_types              ->  index
 * POST    /api/job_types              ->  create
 * GET     /api/job_types/:id          ->  show
 * PUT     /api/job_types/:id          ->  upsert
 * PATCH   /api/job_types/:id          ->  patch
 * DELETE  /api/job_types/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import {JobType, Lookup} from '../../sqldb';

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
    res.status(statusCode).send(err);
  };
}

// Gets a list of JobTypes
export function index(req, res) {
  let options = {};
  if(req.query.lookups) {
    options.include = [Lookup];
  }
  return JobType.findAll(options)
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single JobType from the DB
export function show(req, res) {
  return JobType.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new JobType in the DB
export function create(req, res) {
  return JobType.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Upserts the given JobType in the DB at the specified ID
export function update(req, res) {
  return JobType.update(req.body, {
    where: {
      _id: req.params.id
    }
  })
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Updates all rows in the table to have the general costs
export function setGeneralCosts(req, res) {
  let cost = {
    alcohol: req.body.alcohol,
    police_vehicle: req.body.police_vehicle,
    barricade: req.body.barricade,
    amplified_sound: req.body.amplified_sound
  };

  return JobType.update(cost, {
    where: {
      _id: {
        $gt: 0
      }
    }
  })
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Updates an existing JobType in the DB
export function patch(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  return JobType.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a JobType from the DB
export function destroy(req, res) {
  return JobType.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
