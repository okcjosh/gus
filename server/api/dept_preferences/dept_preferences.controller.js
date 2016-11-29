/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /dept_preferences              ->  index
 * POST    /dept_preferences              ->  create
 * GET     /dept_preferences/:id          ->  show
 * PUT     /dept_preferences/:id          ->  upsert
 * PATCH   /dept_preferences/:id          ->  patch
 * DELETE  /dept_preferences/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import {DeptPreferences} from '../../sqldb';

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

// Gets a list of DeptPreferencess
export function index(req, res) {
  return DeptPreferences.findAll()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single DeptPreferences from the DB
export function show(req, res) {
  return DeptPreferences.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new DeptPreferences in the DB
export function create(req, res) {
  return DeptPreferences.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Upserts the given DeptPreferences in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }

  return DeptPreferences.upsert(req.body, {
    where: {
      _id: req.params.id
    }
  })
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Updates an existing DeptPreferences in the DB
export function patch(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  return DeptPreferences.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a DeptPreferences from the DB
export function destroy(req, res) {
  return DeptPreferences.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
