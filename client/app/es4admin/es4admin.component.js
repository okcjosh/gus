'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './es4admin.routes';

export class Es4adminComponent {
  /*@ngInject*/
  constructor() {
    this.message = 'Hello';
  }
}

export default angular.module('gusApp.es4admin', [uiRouter])
  .config(routes)
  .component('es4admin', {
    template: require('./es4admin.html'),
    controller: Es4adminComponent,
    controllerAs: 'es4adminCtrl'
  })
  .name;
