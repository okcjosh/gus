'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('invitation', {
      url: '/invitation/:invitation_id/event/:event_id',
      template: '<invitation></invitation>',
      controllerAs: 'vm'
    });
}
