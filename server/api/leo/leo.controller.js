/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/leos              ->  index
 * POST    /api/leos              ->  create
 * GET     /api/leos/:id          ->  show
 * PUT     /api/leos/:id          ->  upsert
 * PATCH   /api/leos/:id          ->  patch
 * DELETE  /api/leos/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import {Leo} from '../../sqldb';

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

// Gets a list of Leos
export function index(req, res) {
  return Leo.findAll()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Leo from the DB
export function show(req, res) {
  return Leo.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Leo in the DB
export function create(req, res) {
  return Leo.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Upserts the given Leo in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }

  return Leo.upsert(req.body, {
    where: {
      _id: req.params.id
    }
  })
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Updates an existing Leo in the DB
export function patch(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  return Leo.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Leo from the DB
export function destroy(req, res) {
  return Leo.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
