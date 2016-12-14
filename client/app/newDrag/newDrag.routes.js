'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('newDrag', {
      url: '/newDrag',
      template: '<new-drag></new-drag>'
    });
}
