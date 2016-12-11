'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('drag', {
      url: '/drag',
      template: '<drag></drag>'
    });
}
