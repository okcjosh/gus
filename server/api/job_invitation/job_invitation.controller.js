/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/job_invitations              ->  index
 * POST    /api/job_invitations              ->  create
 * GET     /api/job_invitations/:id          ->  show
 * PUT     /api/job_invitations/:id          ->  upsert
 * PATCH   /api/job_invitations/:id          ->  patch
 * DELETE  /api/job_invitations/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import {JobInvitation} from '../../sqldb';

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

// Gets a list of JobInvitations
export function index(req, res) {
  var jobs;
  if (req.query.party_id) {
    jobs = JobInvitation.findAll({
      where: {
        party_id: req.query.party_id
      }
    });
  } else {
    jobs = JobInvitation.findAll();
  }
  return jobs
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single JobInvitation from the DB
export function show(req, res) {
  return JobInvitation.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new JobInvitation in the DB
export function create(req, res) {
  var createInvite, event_id;

  if (req.body instanceof Array) {
    createInvite = JobInvitation.bulkCreate;
    event_id = req.body[0].party_id;
  } else {
    createInvite = JobInvitation.create;
    event_id = req.body.party_id;
  }

  return JobInvitation.destroy({
    where: {
      party_id: event_id
    }
  }).then(function(del) {
    // After deleting former invitations create fresh ones
    return createInvite.call(JobInvitation, req.body)
      .then(respondWithResult(res, 201))
      .catch(handleError(res));
  });
}

// Upserts the given JobInvitation in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }

  return JobInvitation.upsert(req.body, {
    where: {
      _id: req.params.id
    }
  })
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Updates an existing JobInvitation in the DB
export function patch(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  return JobInvitation.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a JobInvitation from the DB
export function destroy(req, res) {
  return JobInvitation.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
