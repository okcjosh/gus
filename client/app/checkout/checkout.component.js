'use strict';
const angular = require('angular');
const uiRouter = require('angular-ui-router');
import routes from './checkout.routes';
import braintree from 'braintree-web';

export function CheckoutComponent($http) {
  $http.post('checkout/transaction/token')
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
  .config(routes)
  .component('checkout', {
    template: require('./checkout.html'),
    controller: CheckoutComponent,
    controllerAs: 'checkoutCtrl'
  })
  .name;
