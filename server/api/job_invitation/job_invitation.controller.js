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
import {JobInvitation, Leo} from '../../sqldb';

import { sendText } from './../../twilio';

import { sendInvitationEmail } from './../../email';

const DEV_SERVER = '';
const REAL_SERVER = 'myofficers.com';
const LOCAL_SERVER = '192.168.0.17';

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

function sendInvitationSMSToLeo(invite) {
  // console.log(leoId, invite, '=============================');
  let msg = 'You have been selected to work a security detail for DPD. '
    + `Please visit http://${REAL_SERVER}/invitation/${invite._id}/event/${invite.event_id} to accept this job.`;

  Leo.findOne({
    where: { _id: invite.leo_id }
  })
  .then(leo => {
    sendText(leo.phone, msg);
  });
}

// Gets a list of JobInvitations
export function index(req, res) {
  let query = {
    where: {}
  };

  req.query.event_id && (query.where.event_id = req.query.event_id);
  req.query.status && (query.where.status = req.query.status);

  return JobInvitation.findAll(query)
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

// Creates JobInvitations in the DB
export function create(req, res) {
  let event_id = req.params.event_id;

  let inv = req.body.map(invite => JobInvitation.findOrCreate({
    where: {
      event_id,
      leo_id: invite.leo_id
    }, defaults: invite
  }));

  Promise.all(inv)
    .then(findCreateResults => {
      let inviteIds = [];
      findCreateResults.forEach(result => {
        let invite = result[0];
        let newlyCreated = result[1];
        inviteIds.push(invite._id);

        if(newlyCreated) {
          sendInvitationEmail(invite);
          sendInvitationSMSToLeo(invite);
        }
      });
      return inviteIds;
    })
    .then(inviteIds => {
      if(!inviteIds.length) {
        inviteIds[0] = 0;
      }
      return JobInvitation.destroy({
        where: {
          event_id,
          _id: { $notIn: inviteIds }
        }
      });
    })
    .then(() => res.sendStatus(201))
    .catch(handleError(res));
}

// Upserts the given JobInvitation in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }

  return JobInvitation.update(req.body, {
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
