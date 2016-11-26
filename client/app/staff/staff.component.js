'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './staff.routes';

export class StaffComponent {
  /*@ngInject*/
  constructor($http, $scope, socket) {
    this.$http = $http;
    this.socket = socket;

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('staff');
    });
  }

  $onInit() {
    this.$http.get('/api/staffings')
      .then(response => {
        this.newStaffings = response.data;
        this.socket.syncUpdates('staff', this.newStaffings);
      });
  }

  addThing() {
    if (this.newStaffing) {
      this.$http.post('/api/staffings', {
        name: this.newStaffing
      });
      this.newStaffing = '';
    }
  }

  deleteStaff(staff) {
    this.$http.delete(`/api/staffings/${thing._id}`);
  }
}

export default angular.module('gusApp.staff', [uiRouter])
  .config(routes)
  .component('staff', {
    template: require('./staff.html'),
    controller: StaffComponent,
    controllerAs: 'staffCtrl'
  })
  .name;
