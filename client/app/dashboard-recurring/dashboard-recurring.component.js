/* eslint-disable consistent-this,camelcase,no-unused-vars,array-callback-return,no-invalid-this,prefer-template */
'use strict';
const angular = require('angular');
const uiRouter = require('angular-ui-router');
const moment = require('moment');
const $ = require('jquery');
import routes from './dashboard-recurring.routes';

require('datatables.net');
require('datatables.net-buttons');
require('datatables.net-buttons-bs');
require('datatables.net-bs');
require('datatables.net-buttons-bs');
require('datatables.net-fixedheader');
require('datatables.net-keytable');
require('datatables.net-responsive');
require('datatables.net-responsive-bs');
require('datatables.net-select');
require('datatables.net-scroller');


export class DashboardRecurringComponent {
  /*@ngInject*/

  constructor($http, $scope, $state, $interpolate) {
    this.$http = $http;
    this.$scope = $scope;
    this.$state = $state;
    this.$interpolate = $interpolate;
    this.init($scope);
  }

  init($scope) {
    this.$http.get('/api/leos')
      .then(response => {
        $scope.leos = response.data;
      });
  }

  $onInit() {
    const _self = this;

    this.$http.get('/api/events/recurring/' + this.$state.params.recurring_id)
      .then(response => {
        this.$scope.recurringEvents = response.data.map(ev => {
          ev.formattedDate = moment(ev.date).format('llll');
          return ev;
        });

        setTimeout(() => $('#events').DataTable(), 1000);
      });
  }
}

export default angular.module('gusApp.dashboard-recurring', [uiRouter])
  .config(routes)
  .component('dashboardRecurring', {
    template: require('./dashboard-recurring.html'),
    controller: DashboardRecurringComponent,
    controllerAs: 'dashboardCtrl'
  })
  .name;
