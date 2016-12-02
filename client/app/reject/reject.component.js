'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './reject.routes';

export class RejectComponent {
  /*@ngInject*/
  constructor() {
    this.message = 'Hello';
  }
}

export default angular.module('gusApp.reject', [uiRouter])
  .config(routes)
  .component('reject', {
    template: require('./reject.html'),
    controller: RejectComponent,
    controllerAs: 'rejectCtrl'
  })
  .name;
