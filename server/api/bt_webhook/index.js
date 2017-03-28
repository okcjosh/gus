'use strict';

var express = require('express');
var controller = require('./bt_webhook.controller');

var router = express.Router();

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

router.post('/webhook/incoming', function (req, res) {
  gateway.webhookNotification.parse(
    req.body.bt_signature,
    req.body.bt_payload,
    function (err, webhookNotification) {
      console.log("[Webhook Received " + webhookNotification.timestamp + "] | Kind: " + webhookNotification.kind);
    }
  );
  res.status(200).send();
});

