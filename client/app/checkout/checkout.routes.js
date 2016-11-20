
'use strict';

export default function ($stateProvider) {
  'ngInject';
  $stateProvider
    .state('checkout', {
      url: '/checkout',
      template: '<checkout></checkout>'
    })
    .state('show', {
      url: '/checkout/show',
      template: '<show></show>'
    })
}
