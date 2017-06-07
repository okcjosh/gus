'use strict';

export default function routes($stateProvider) {
  'ngInject';
  $stateProvider
    .state('checkout-recurring', {
      url: '/checkout-recurring?event_id',
      template: '<checkout-recurring></checkout-recurring>',
      authenticate: true
    });
    // .state('transaction', {
    //   url: '/checkout/transaction?tranid',
    //   template: '<transaction></transaction>',
    //   authenticate: true
    // });
}
