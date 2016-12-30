'use strict';

export default function routes($stateProvider) {
  'ngInject';
  $stateProvider
    .state('leo', {
      url: '/leo',
      template: '<leo></leo>',
      authenticate: true
    });
}
