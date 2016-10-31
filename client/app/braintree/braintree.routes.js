'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('braintree', {
      url: '/braintree',
      template: '<braintree></braintree>'
    });
}
