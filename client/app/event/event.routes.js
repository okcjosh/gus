'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('event', {
      url: '/event',
      template: '<event></event>'
    })
    .state('buy', {
      url: '/event/buy',
      template: '<nonce-received></nonce-received>'
    })
    .state('client-token', {
      url: '/event/client-token',
      template: '<nonce-received></nonce-received>'
    });
}
