'use strict';
/*eslint no-process-env:0*/

const path = require('path');
const _ = require('lodash');

/*function requiredProcessEnv(name) {
  if(!process.env[name]) {
    throw new Error('You must set the ' + name + ' environment letiable');
  }
  return process.env[name];
}*/

// All configurations will extend these options
// ============================================
let all = {
  env: process.env.NODE_ENV,

  // Root path of server
  root: path.normalize(`${__dirname}/../../..`),

  // Browser-sync port
  browserSyncPort: process.env.BROWSER_SYNC_PORT || 3000,

  // Server port
  port: process.env.PORT || 9000,

  // Server IP
  ip: process.env.IP || '0.0.0.0',

  // Should we populate the DB with sample data?
  seedDB: false,

  // Secret for session, you will want to change this and make it an environment letiable
  secrets: {
    session: 'myofficers-secret'
  },

  facebook: {
    clientID: process.env.FACEBOOK_ID || 'id',
    clientSecret: process.env.FACEBOOK_SECRET || 'secret',
    callbackURL: `${process.env.DOMAIN || ''}/auth/facebook/callback`
  },

  twitter: {
    clientID: process.env.TWITTER_ID || 'id',
    clientSecret: process.env.TWITTER_SECRET || 'secret',
    callbackURL: `${process.env.DOMAIN || ''}/auth/twitter/callback`
  },

  google: {
    clientID: process.env.GOOGLE_ID || 'id',
    clientSecret: process.env.GOOGLE_SECRET || 'secret',
    callbackURL: `${process.env.DOMAIN || ''}/auth/google/callback`
  }
};

// // Export the config object based on the NODE_ENV
// // ==============================================
// module.exports = _.merge(
//   all,
//   require('./shared'),
//   require(`./${process.env.NODE_ENV}.js`) || {});

// Export the config object based on the NODE_ENV
// ==============================================
var processRequire = process.env.NODE_ENV != undefined ? require(`./${process.env.NODE_ENV}.js`) : {};
module.exports = _.merge(
  all,
  require('./shared'),
  processRequire);
