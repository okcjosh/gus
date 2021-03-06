/* eslint-disable camelcase,no-unused-vars */
'use strict';
const angular = require('angular');
const uiRouter = require('angular-ui-router');
import routes from './checkout.routes';
import braintree from 'braintree-web';


export function CheckoutComponent($scope, $http, $state) {
  let event_id = $state.params.event_id;
  $scope.event_id = event_id;

  if(!event_id) {
    $state.go('event');
    return;
  }

  $http.get(`api/events/${event_id}`)
    .then(res => {
      $scope.event = res.data;
    });

  $http.get(`api/events/${event_id}/cost`)
      .then(res => {
        $scope.cost = res.data;
      });

  $http.post('checkout/transaction/token')
    .then(response => {
      this.clientToken = response.data;
      // console.log(this.clientToken);
      braintree.setup = function(clientToken, s, param3) {
      };
      braintree.setup(this.clientToken,
        'dropin', {
          container: 'dropin'
        });
    });
}
export default angular.module('gusApp.checkout', [uiRouter])
  .config(routes)
  .component('checkout', {
    template: require('./checkout.html'),
    controller: CheckoutComponent,
    controllerAs: 'checkoutCtrl'
  })
  .name;
