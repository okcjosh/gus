'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './accounts.routes';

export class AccountsComponent {
  /*@ngInject*/
  constructor() {
    this.message = 'Hello';
  }
}

export default angular.module('gusApp.accounts', [uiRouter])
  .config(routes)
  .component('accounts', {
    template: require('./accounts.html'),
    controller: AccountsComponent,
    controllerAs: 'accountsCtrl'
  })
  .name;
