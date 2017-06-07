'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('dashboard-recurring', {
      url: '/recurring/:recurring_id',
      template: '<dashboard-recurring></dashboard-recurring>',
      authenticate: 'admin'
    });
}
