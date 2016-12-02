'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('reject', {
      url: '/reject',
      template: '<reject></reject>'
    });
}
