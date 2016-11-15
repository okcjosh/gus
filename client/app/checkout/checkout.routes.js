'use strict';

export default function ($stateProvider) {
  'ngInject';
  $stateProvider
    .state('checkout', {
      url: '/checkout',
      template: '<checkout></checkout>'
    })
    .state('new', {
      url: '/checkout/new',
      template: '<new></new>'
    })
}
