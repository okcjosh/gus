'use strict';
const angular = require('angular');
const uiRouter = require('angular-ui-router');

// export class TransactionComponent {
//   /*@ngInject*/
//   constructor() {
//     this.message = 'Hello';
//   }
// }
export function TransactionComponent($scope, $http, $state) {
  //alert('tranid: ' + $location.search()['tranid']);
  //let tranid = $location.search()['tranid'];
  /** @namespace $state.params.tranid */
  let tranid = $state.params.tranid;
  $http.get(`/transaction/${tranid}`).then(function(response) {
    $scope.transaction = response.data.BTtransaction;
    $scope.event = response.data.transaction.Event;
    $scope.result = response.data.result;
  }, function(err) {
    console.log(err);
  });
}

export default angular.module('myofficersApp.transaction', [uiRouter])
  .component('transaction', {
    template: require('./transaction.html'),
    controller: TransactionComponent,
    controllerAs: 'TransactionCtrl'
  })
  .name;
