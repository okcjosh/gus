'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('es4admin', {
      url: '/es4admin',
      template: '<es-4-admin></es-4-admin>'
    });
}
