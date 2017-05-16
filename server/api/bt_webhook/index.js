'use strict';

let express = require('express');
let controller = require('./bt_webhook.controller');

let router = express.Router();

let braintree = require('braintree');
let environment, gateway;

gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: 'swvg9scjkhfhq9rs',
  publicKey: '78ghksfzt5z5hfcx',
  privateKey: '1f210164c4fff82b6da4c29131f30379'
});

module.exports = gateway;

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.upsert);
router.patch('/:id', controller.patch);
router.delete('/:id', controller.destroy);
router.post('/incoming', controller.webhook);

module.exports = router;

// // Set bt_signature_param and bt_payload_param to the "bt_signature" and "bt_payload" POST parameters
// gateway.webhookNotification.parse(
//   btSignatureParam,
//   btPayloadParam,
//   function (err, webhookNotification) {
//     webhookNotification.kind
//     // "subscriptionWentPastDue"
//
//     webhookNotification.timestamp
//     // Sun Jan 1 00:00:00 UTC 2012
//     console.log(webhookNotification.kind);
//     console.log(webhookNotification.timestamp)
//   }
// );
