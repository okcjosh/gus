'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('invitations', {
      url: '/invitations',
      template: '<invitations></invitations>'
    });
}
