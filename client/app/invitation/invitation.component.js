'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './invitation.routes';

export class InvitationComponent {
  /*@ngInject*/
  constructor($scope, $http) {
    this.message = 'Hello';
    $http.get('/api/jobs')
      .then(response => {
        $scope.job = response.data[0];
      });
    //$scope.job = {location: 'American Airlines Center'};

  }
}

export default angular.module('gusApp.invitation', [uiRouter])
  .config(routes)
  .component('invitation', {
    template: require('./invitation.html'),
    controller: InvitationComponent,
    controllerAs: 'invitationCtrl'
  })
  .name;
