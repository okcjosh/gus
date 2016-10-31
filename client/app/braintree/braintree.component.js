'use strict';
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routes from './braintree.routes';
import braintree from 'braintree-web';

export class BraintreeComponent {

  /*@ngInject*/
  constructor($scope, $http, $clientToken) {
    this.$http = $http;
    this.clientToken = $clientToken;
    $scope.hasCalledBack = 'Nope';
    braintree.setup({$clientToken},
      // Replace this with a client token from your server
      'dropin', {
        container: 'dropin',
        onPaymentMethodReceived: function (obj) {
          $scope.$apply(function () {
            $scope.hasCalledBack = 'YEP!';
            alert('Did the scope variable change? Yes!');
          });
        }
      });
  }

  $onInit($clientToken) {
    this.$http.post('/api/token')
      .then(response => {
        $clientToken = response.data;
        console.log(response.data);
      });
  }
}

export default angular.module('gusApp.braintree', [uiRouter])
  .config(routes)
  .component('braintree', {
    template: require('./braintree.html'),
    controller: BraintreeComponent,
    controllerAs: 'braintreeCtrl'
  })
  .name;
