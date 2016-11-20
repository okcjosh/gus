'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('show', {
      url: '/checkout/show',
      template: '<show></show>'
    });
}
