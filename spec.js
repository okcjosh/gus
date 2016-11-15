'use strict';
/*eslint-env node*/
let testsContext;

require('babel-polyfill');
require('angular');
require('angular-mocks');
require('./client/components/ui-router/ui-router.mock');
require('./client/components/socket/socket.mock');

testsContext = require.context('./client', true, /\.spec\.js$/);
testsContext.keys().forEach(testsContext);
