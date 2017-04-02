/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/bt_webhooks              ->  index
 * POST    /api/bt_webhooks              ->  create
 * GET     /api/bt_webhooks/:id          ->  show
 * PUT     /api/bt_webhooks/:id          ->  upsert
 * PATCH   /api/bt_webhooks/:id          ->  patch
 * DELETE  /api/bt_webhooks/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import {BtWebhook, Leo} from '../../sqldb';

let braintree = require('braintree');

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

// Gets a list of BtWebhooks
export function index(req, res) {
  return BtWebhook.findAll()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single BtWebhook from the DB
export function show(req, res) {
  return BtWebhook.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new BtWebhook in the DB
export function create(req, res) {
  return BtWebhook.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Upserts the given BtWebhook in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }

  return BtWebhook.upsert(req.body, {
    where: {
      _id: req.params.id
    }
  })
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Updates an existing BtWebhook in the DB
export function patch(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  return BtWebhook.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a BtWebhook from the DB
export function destroy(req, res) {
  return BtWebhook.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}

export function webhook(req, res) {
  var gateway = braintree.connect({
    environment: braintree.Environment.Sandbox,
    merchantId: 'swvg9scjkhfhq9rs',
    publicKey: '78ghksfzt5z5hfcx',
    privateKey: '1f210164c4fff82b6da4c29131f30379'
  });

  gateway.webhookNotification.parse(
    req.body.bt_signature,
    req.body.bt_payload,
    function (err, webhookNotification) {
      // console.log('=====HOOK=====');

      var approved = webhookNotification.kind ===
        braintree.WebhookNotification.Kind.SubMerchantAccountApproved;
      
      // console.log(braintree.merchantAccount, JSON.stringify(webhookNotification), '<<<<<<<========');

      let status = approved ? 'Approved': 'Declined';

      gateway.merchantAccount
        .find(webhookNotification.merchantAccount.id,
          function (err, merchantAccount) {
            Leo.update(
             { btStatus: status },
             { where: {email: merchantAccount.individual.email} }
            )
              .then(() => res.send())
              .catch(() => res.status(400).send());
          });
      // console.log("[Webhook Received " + webhookNotification.timestamp + "] | Kind: " + webhookNotification.kind);
    }
  );
  res.status(200).send();
}


