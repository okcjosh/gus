'use strict';

import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './account.routes';
import login from './login';
import settings from './settings';
import verifyPhone from './verify_phone';
import signup from './signup';
import oauthButtons from '../../components/oauth-buttons';

export default angular.module('myofficersApp.account', [uiRouter, login, settings, verifyPhone, signup, oauthButtons])
  .config(routing)
  .run(function($rootScope) {
    'ngInject';

    $rootScope.$on('$stateChangeStart', function(event, next, nextParams, current) {
      if(next.name === 'logout' && current && current.name && !current.authenticate) {
        next.referrer = current.name;
      }
    });
  })
  .name;
