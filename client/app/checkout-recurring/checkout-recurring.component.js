/* eslint-disable camelcase,no-unused-vars */
'use strict';
const angular = require('angular');
const uiRouter = require('angular-ui-router');
import routes from './checkout-recurring.routes';


export function CheckoutRecurringComponent($scope, $http, $state) {

}
export default angular.module('gusApp.checkout-recurring', [uiRouter])
  .config(routes)
  .component('checkoutRecurring', {
    template: require('./checkout-recurring.html'),
    controller: CheckoutRecurringComponent,
    controllerAs: 'checkoutCtrl'
  })
  .name;
