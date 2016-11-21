'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('hello', {
      url: '/hello',
      template: '<hello></hello>'
    });
}
