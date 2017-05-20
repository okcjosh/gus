/* eslint-disable prefer-reflect */
/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/lookups              ->  index
 * POST    /api/lookups              ->  create
 * GET     /api/lookups/:id          ->  show
 * PUT     /api/lookups/:id          ->  upsert
 * PATCH   /api/lookups/:id          ->  patch
 * DELETE  /api/lookups/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import {Lookup, JobType} from '../../sqldb';

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

// Gets a list of Lookups
export function index(req, res) {
  return Lookup.findAll({
    include: [JobType]
  })
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Lookup from the DB
export function show(req, res) {
  return Lookup.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Lookup in the DB
export function create(req, res) {
  return Lookup.create(req.body)
    .then(function(lookup) {
      return Lookup.findById(lookup._id, {
        include: [JobType]
      })
        .then(respondWithResult(res, 201))
        .catch(handleError(res));
    })
    // .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Upserts the given Lookup in the DB at the specified ID
export function upsert(req, res) {
  return Lookup.update(req.body, {
    where: {
      _id: req.params.id
    }
  })
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Updates an existing Lookup in the DB
export function patch(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  return Lookup.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Lookup from the DB
export function destroy(req, res) {
  return Lookup.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
