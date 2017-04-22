'use strict';

import angular from 'angular';

export function OauthButtonsController($window) {
  'ngInject';

  this.loginOauth = function(provider) {
    $window.location.href = `/auth/${provider}`;
  };
}

export default angular.module('myofficersApp.oauthButtons', [])
  .directive('oauthButtons', function() {
    return {
      template: require('./oauth-buttons.html'),
      restrict: 'EA',
      controller: OauthButtonsController,
      controllerAs: 'OauthButtons',
      scope: {
        classes: '@'
      }
    };
  })
  .name;

//
// 1040621307575-olsn9vkl5nnaoh9vcct3e36po2ecd3gc.apps.googleusercontent.com
// bvVhL_KCmVAKTKBzPTWgQesM
