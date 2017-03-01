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

  constructor($http, $scope, socket, $state, $uibModal, $uibModalStack) {
    this.$http = $http;
    this.$scope = $scope;
    this.$scope.$state = $state;
    this.$uibModal = $uibModal;
    this.$uibModalStack = $uibModalStack;
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

    this.$http.get('/api/lookups')
      .then(function(res) {
        $scope.lookups = res.data;
      });

    $scope.saveRates = this.saveRates.bind(this, $scope);
    $scope.saveGenerals = this.saveGenerals.bind(this, $scope);
    $scope.addLookup = this.addLookup.bind(this);
    $scope.editModal = this.editModal.bind(this);
    $scope.deleteModal = this.deleteModal.bind(this);
  }

  $onInit() {

  }

  saveRates($scope) {
    $scope.jobTypes.forEach((jobType) => {
      let rate = {
        base_price: jobType.base_price,
        crowd_rate: jobType.crowd_rate,
        hour_rate: jobType.hour_rate,
        officer_rate: jobType.officer_rate
      };
      this.$http.put('/api/job_types/' + jobType._id, rate)
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

  addLookup(lookup) {
    this.$http.post('/api/lookups', lookup)
      .then((res) => {
        this.$scope.newLookup = {};
        this.$scope.lookups.push(res.data);
      });
  }

  editModal(lookup) {

    const modInstance = this.$uibModal.open({                       
      templateUrl: 'editModal.html',
      controller: ($scope, $uibModalStack) => {
        $scope.editingLookup = lookup;
        $scope.jobTypes = this.$scope.jobTypes;

        $scope.editLookup = () => {
          this.$http.put('/api/lookups/' + lookup._id, lookup)
            .then((res) => {
              const index = this.$scope.jobTypes.findIndex((item) => item._id === lookup.JobTypeId);
              lookup.JobType = this.$scope.jobTypes[index];
              $uibModalStack.dismissAll({});
              $scope.editingLookup = null;
            });
        };

        $scope.close = function() {
          $uibModalStack.dismissAll({});
        }
      }
    });
  }

  deleteModal(lookup) {

    const modInstance = this.$uibModal.open({
      templateUrl: 'deleteModal.html',
      controller: ($scope, $uibModalStack) => {
        $scope.deletingLookup = lookup;

        $scope.deleteLookup = () => {
          this.$http.delete('/api/lookups/' + lookup._id)
            .then((res) => {
              const index = this.$scope.lookups.findIndex((item) => item._id === lookup._id);
              this.$scope.lookups.splice(index, 1);
              $uibModalStack.dismissAll({});
              $scope.deletingLookup = null;
            });
        };

        $scope.close = function() {
          $uibModalStack.dismissAll({});
        }
      }
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
