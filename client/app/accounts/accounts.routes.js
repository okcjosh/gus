'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('accounts', {
      url: '/accounts',
      template: '<accounts></accounts>',
      authenticated: 'admin',
    });
}
