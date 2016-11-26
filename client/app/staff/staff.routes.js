'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('staff', {
      url: '/staff',
      template: '<staff></staff>'
    });
}
