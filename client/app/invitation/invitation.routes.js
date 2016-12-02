'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('invitation', {
      url: '/invitation',
      template: '<invitation></invitation>'
    });
}
