'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');
const jquery = require('jquery');
import routes from './rates.routes';

let $ = require('jquery');
// require( 'datatables.net' );
// require( 'datatables.net-buttons');
// require( 'datatables.net-buttons-bs');
// require( 'datatables.net-bs');
// require( 'datatables.net-buttons-bs');
// require( 'datatables.net-fixedheader');
// require( 'datatables.net-fixedheader-bs');
// require( 'datatables.net-keytable');
// require( 'datatables.net-responsive');
// require( 'datatables.net-responsive-bs');
// require( 'datatables.net-select');
// require( 'datatables.net-scroller');
// require( 'datatables.net-scroller-bs');

export class RatesComponent {
  /*@ngInject*/

  constructor($http, $scope, socket, $state) {
    this.$http = $http;
    this.$scope = $scope;
    this.$scope.$state = $state;
    this.init($scope);
  }

  init($scope) {
    // This will be replaced with http get for all jobtypes
    let j = [];
    for (let i = 1; i < 10; i++) {
      j.push({
        job_type_id: i,
        name: 'A name ' + Math.random(),
        description: 'A description',
        price: 1000
      });
    }
    $scope.jobTypes = j;
    // END: Replacement.. Generated dummy data

    $scope.saveRates = this.saveRates.bind(null, $scope);
  }

  $onInit() {

  }

  saveRates($scope) {
    console.log($scope.jobTypes);
    console.log('There will be a post request here!')
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
