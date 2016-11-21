'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('transaction', {
      url: '/checkout/transaction',
      template: '<transaction></transaction>'
    });
}
