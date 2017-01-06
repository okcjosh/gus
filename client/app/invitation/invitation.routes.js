'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('invitation', {
      url: '/invitation/:event_id',
      template: '<invitation></invitation>',
    });
}
