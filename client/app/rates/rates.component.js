'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');
const jquery = require('jquery');
import routes from './rates.routes';

let $ = require('jquery');
require( 'datatables.net' );
require( 'datatables.net-buttons');
require( 'datatables.net-buttons-bs');
require( 'datatables.net-bs');
require( 'datatables.net-buttons-bs');
require( 'datatables.net-fixedheader');
require( 'datatables.net-keytable');
require( 'datatables.net-responsive');
require( 'datatables.net-responsive-bs');
require( 'datatables.net-select');
require( 'datatables.net-scroller');

export class RatesComponent {
  /*@ngInject*/

  constructor($http, $scope, socket, $state) {
    this.$http = $http;
    this.$scope = $scope;
    this.$scope.$state = $state;
    this.init($scope);
  }

  init($scope) {
    this.$http.get('/api/job_types')
      .then(function(res) {
        $scope.jobTypes = res.data;
        let first = res.data[0];
        $scope.all = {
          alcohol: first.alcohol,
          police_vehicle: first.police_vehicle,
          barricade: first.barricade,
          amplified_sound: first.amplified_sound
        }
      });

    $scope.saveRates = this.saveRates.bind(this, $scope);
    $scope.saveGenerals = this.saveGenerals.bind(this, $scope);
  }

  $onInit() {

  }

  saveRates($scope) {
    $scope.jobTypes.forEach((jobType) => {
      let j = {
        base_price: jobType.base_price,
        crowd_rate: jobType.crowd_rate,
        hour_rate: jobType.hour_rate,
        officer_rate: jobType.officer_rate
      };
      this.$http.put('/api/job_types/' + jobType._id, j)
        .then(function(res) {
          //console.log(res);
        });
    });
  }

  saveGenerals($scope) {
    this.$http.put('/api/job_types/general_costs', $scope.all)
      .then(function(res) {

      });
  }
}

export default angular.module('gusApp.rates', [uiRouter])
  .config(routes)
  .component('rates', {
    template: require('./rates.html'),
    controller: RatesComponent,
    controllerAs: 'ratesCtrl'
  })
  .name;
