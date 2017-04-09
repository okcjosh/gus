/**
 * Created by joshuajohnson on 3/15/17.
 */
'use strict';

let braintree = require('braintree');
let environment, gateway;
let serviceFeeAmount = 11 * .25;

gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: 'swvg9scjkhfhq9rs',
  publicKey: '78ghksfzt5z5hfcx',
  privateKey: '1f210164c4fff82b6da4c29131f30379'
});

module.exports = gateway;

gateway.transaction.sale({
  merchantAccountId: 'blue_ladders_store',
  amount: '1999.00',
  paymentMethodNonce: 'fake-valid-nonce',
  serviceFeeAmount,
  options: {
    submitForSettlement: true
  }
}, function(err, result) {
  console.log(err, result);
  console.log(serviceFeeAmount);
});
