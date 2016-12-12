'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('columndemo', {
      url: '/columndemo',
      template: '<columndemo></columndemo>'
    });
}
