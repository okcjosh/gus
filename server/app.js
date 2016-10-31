/**
 * Main application file
 */

'use strict';

import express from 'express';
import sqldb from './sqldb';
import config from './config/environment';
import http from 'http';
import braintree from 'braintree';
var environment, gateway;

require('dotenv').load();
environment = process.env.BT_ENVIRONMENT.charAt(0).toUpperCase() + process.env.BT_ENVIRONMENT.slice(1);

gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: 'swvg9scjkhfhq9rs',
  publicKey: '78ghksfzt5z5hfcx',
  privateKey: '1f210164c4fff82b6da4c29131f30379',
});

module.exports = gateway;


// Populate databases with sample data
if(config.seedDB) {
  require('./config/seed');
}

// Setup server
var app = express();
var server = http.createServer(app);
var socketio = require('socket.io')(server, {
  serveClient: config.env !== 'production',
  path: '/socket.io-client'
});
require('./config/socketio').default(socketio);
require('./config/express').default(app);
require('./routes').default(app);

// Start server
function startServer() {
  app.angularFullstack = server.listen(config.port, config.ip, function() {
    console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
  });
}

export function startBraintree() {
  app.post('/api/token', function (request, response) {
    gateway.clientToken.generate({}, function (err, res) {
      if (err) throw err;
      response.json({
        "client_token": res.clientToken
      });
      console.log(res.clientToken)
    });
  });
}

// if using alert or other debugging use the below startBraintree because it will return token as a string to prevent Object object errors.

// export function startBraintree() {
//   app.post('/api/token', function (request, response) {
//     gateway.clientToken.generate({}, function (err, res) {
//       if (err) throw err;
//       response.json(res.clientToken);
//       console.log(res.clientToken)
//     });
//   });
// }

sqldb.sequelize.sync()
  .then(startServer)
  .catch(function(err) {
    console.log('Server failed to start due to error: %s', err);
  })
  .then(startBraintree)
  .catch(function(err) {
    console.log('Braintree', err);
  });

// Expose app
exports = module.exports = app;
