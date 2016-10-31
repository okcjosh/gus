'use strict';
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routes from './braintree.routes';
import braintree from 'braintree-web';

export class BraintreeComponent {

  /*@ngInject*/
  constructor($scope, $http) {
    this.$http = $http;
    $scope.hasCalledBack = 'Nope';
    braintree.setup(
      // Replace this with a client token from your server
         "eyJ2ZXJzaW9uIjoyLCJhdXRob3JpemF0aW9uRmluZ2VycHJpbnQiOiI4NTljYWUzYmM0NDIyMDAzYTg2MjE2NGYzNDQ3NjkyZTEyYmY2MmU0ZDdjYjI2MTU2Y2RmYTBiOWU4ZjI4MWU5fGNyZWF0ZWRfYXQ9MjAxNi0xMC0zMVQyMDowMToyMy43NTk0NzIzNzQrMDAwMFx1MDAyNm1lcmNoYW50X2lkPXN3dmc5c2Nqa2hmaHE5cnNcdTAwMjZwdWJsaWNfa2V5PTc4Z2hrc2Z6dDV6NWhmY3giLCJjb25maWdVcmwiOiJodHRwczovL2FwaS5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tOjQ0My9tZXJjaGFudHMvc3d2ZzlzY2praGZocTlycy9jbGllbnRfYXBpL3YxL2NvbmZpZ3VyYXRpb24iLCJjaGFsbGVuZ2VzIjpbXSwiZW52aXJvbm1lbnQiOiJzYW5kYm94IiwiY2xpZW50QXBpVXJsIjoiaHR0cHM6Ly9hcGkuc2FuZGJveC5icmFpbnRyZWVnYXRld2F5LmNvbTo0NDMvbWVyY2hhbnRzL3N3dmc5c2Nqa2hmaHE5cnMvY2xpZW50X2FwaSIsImFzc2V0c1VybCI6Imh0dHBzOi8vYXNzZXRzLmJyYWludHJlZWdhdGV3YXkuY29tIiwiYXV0aFVybCI6Imh0dHBzOi8vYXV0aC52ZW5tby5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tIiwiYW5hbHl0aWNzIjp7InVybCI6Imh0dHBzOi8vY2xpZW50LWFuYWx5dGljcy5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tL3N3dmc5c2Nqa2hmaHE5cnMifSwidGhyZWVEU2VjdXJlRW5hYmxlZCI6dHJ1ZSwicGF5cGFsRW5hYmxlZCI6dHJ1ZSwicGF5cGFsIjp7ImRpc3BsYXlOYW1lIjoiQW1lcmljYW4gSHVzdGxlciBTeW5kaWNhdGUiLCJjbGllbnRJZCI6bnVsbCwicHJpdmFjeVVybCI6Imh0dHA6Ly9leGFtcGxlLmNvbS9wcCIsInVzZXJBZ3JlZW1lbnRVcmwiOiJodHRwOi8vZXhhbXBsZS5jb20vdG9zIiwiYmFzZVVybCI6Imh0dHBzOi8vYXNzZXRzLmJyYWludHJlZWdhdGV3YXkuY29tIiwiYXNzZXRzVXJsIjoiaHR0cHM6Ly9jaGVja291dC5wYXlwYWwuY29tIiwiZGlyZWN0QmFzZVVybCI6bnVsbCwiYWxsb3dIdHRwIjp0cnVlLCJlbnZpcm9ubWVudE5vTmV0d29yayI6dHJ1ZSwiZW52aXJvbm1lbnQiOiJvZmZsaW5lIiwidW52ZXR0ZWRNZXJjaGFudCI6ZmFsc2UsImJyYWludHJlZUNsaWVudElkIjoibWFzdGVyY2xpZW50MyIsImJpbGxpbmdBZ3JlZW1lbnRzRW5hYmxlZCI6dHJ1ZSwibWVyY2hhbnRBY2NvdW50SWQiOiJhbWVyaWNhbmh1c3RsZXJzeW5kaWNhdGUiLCJjdXJyZW5jeUlzb0NvZGUiOiJVU0QifSwiY29pbmJhc2VFbmFibGVkIjpmYWxzZSwibWVyY2hhbnRJZCI6InN3dmc5c2Nqa2hmaHE5cnMiLCJ2ZW5tbyI6Im9mZiJ9",
      'dropin', {
        container: 'dropin',
        onPaymentMethodReceived: function (obj) {
          $scope.$apply(function () {
            $scope.hasCalledBack = 'YEP!';
            alert('Did the scope variable change? Yes!');
            console.log(obj)
          });
        }
      });
  }

  $onInit() {
    this.$http.post('/api/token')
      .then(response => {
        this.clientToken = response.data;
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
