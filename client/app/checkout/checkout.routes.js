'use strict';

export default function routes($stateProvider) {
  'ngInject';
  $stateProvider
    .state('checkout', {
      url: '/checkout?event_id',
      template: '<checkout></checkout>',
      authenticate: true
    })
    .state('transaction', {
      url: '/checkout/transaction?tranid',
      template: '<transaction></transaction>',
      authenticate: true
    });
}
