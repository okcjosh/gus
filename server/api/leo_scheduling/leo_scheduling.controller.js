/* eslint-disable prefer-reflect */
/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/leo_scheduling              ->  index
 * POST    /api/leo_scheduling              ->  create
 * GET     /api/leo_scheduling/:id          ->  show
 * PUT     /api/leo_scheduling/:id          ->  upsert
 * PATCH   /api/leo_scheduling/:id          ->  patch
 * DELETE  /api/leo_scheduling/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import {LeoScheduling} from '../../sqldb';

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

// Gets a list of LeoSchedulings
export function index(req, res) {
  return LeoScheduling.findAll()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single LeoScheduling from the DB
export function show(req, res) {
  return LeoScheduling.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new LeoScheduling in the DB
export function create(req, res) {
  return LeoScheduling.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Upserts the given LeoScheduling in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }

  return LeoScheduling.upsert(req.body, {
    where: {
      _id: req.params.id
    }
  })
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Updates an existing LeoScheduling in the DB
export function patch(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  return LeoScheduling.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a LeoScheduling from the DB
export function destroy(req, res) {
  return LeoScheduling.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
