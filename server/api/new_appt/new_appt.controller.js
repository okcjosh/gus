/* eslint-disable prefer-reflect */
/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/new_appts              ->  index
 * POST    /api/new_appts              ->  create
 * GET     /api/new_appts/:id          ->  show
 * PUT     /api/new_appts/:id          ->  upsert
 * PATCH   /api/new_appts/:id          ->  patch
 * DELETE  /api/new_appts/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import {NewAppt} from '../../sqldb';

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

// Gets a list of NewAppts
export function index(req, res) {
  return NewAppt.findAll()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single NewAppt from the DB
export function show(req, res) {
  return NewAppt.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new NewAppt in the DB
export function create(req, res) {
  return NewAppt.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Upserts the given NewAppt in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }

  return NewAppt.upsert(req.body, {
    where: {
      _id: req.params.id
    }
  })
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Updates an existing NewAppt in the DB
export function patch(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  return NewAppt.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a NewAppt from the DB
export function destroy(req, res) {
  return NewAppt.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
