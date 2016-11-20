'use strict';
const angular = require('angular');
const uiRouter = require('angular-ui-router');
const braintree = require('braintree-web');
import routes from './checkout.routes';

export function CheckoutComponent($http) {
  $http.post('checkout/token')
    .then(response => {
      this.clientToken = response.data;
      console.log(this.clientToken);
      braintree.setup(this.clientToken,
        'dropin', {
          container: 'dropin'
        })
    });
}


export default angular.module('gusApp.checkout', [uiRouter])
  .constant('clientTokenPath', '/api/braintree/client_token')
  .config(routes)
  .component('checkout', {
    template: require('./checkout.html'),
    controller: CheckoutComponent,
    controllerAs: 'checkoutCtrl'
  })
  .name;
