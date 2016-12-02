'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('accept', {
      url: '/accept',
      template: '<accept></accept>'
    });
}
