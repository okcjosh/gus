'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './leos.routes';

export class LeosComponent {
  /*@ngInject*/
  constructor() {
    this.message = 'Hello';
  }
}

export default angular.module('gusApp.leos', [uiRouter])
  .config(routes)
  .component('leos', {
    template: require('./leos.html'),
    controller: LeosComponent,
    controllerAs: 'leosCtrl'
  })
  .name;
