'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('goodbye', {
      url: '/hello/goodbye',
      template: '<goodbye></goodbye>'
    });
}
