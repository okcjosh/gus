'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('leos', {
      url: '/leos',
      template: '<leos></leos>'
    });
}
