'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('rates', {
      url: '/rates',
      template: '<rates></rates>'
    });
}
