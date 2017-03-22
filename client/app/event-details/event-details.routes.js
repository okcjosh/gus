'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('event-details', {
      url: '/event/:event_id',
      template: '<event-details></event-details>',
      authenticate: false
    });
}
