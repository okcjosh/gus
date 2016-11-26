'use strict';

export default function routes($stateProvider) {
  'ngInject';
  $stateProvider
    .state('checkout', {
      url: '/checkout',
      template: '<checkout></checkout>'
    })
    .state('transaction', {
      url: '/checkout/transaction',
      template: '<transaction></transaction>'
    })
}
