
'use strict';

var braintree = require('braintree');
var gateway;

// require('dotenv').load();
// environment = process.env.BT_ENVIRONMENT.charAt(0).toUpperCase() + process.env.BT_ENVIRONMENT.slice(1);

gateway = braintree.connect({
  environment: 'Sandbox',
  merchantId: 'swvg9scjkhfhq9rs',
  publicKey: '78ghksfzt5z5hfcx',
  privateKey: '1f210164c4fff82b6da4c29131f30379'
});
