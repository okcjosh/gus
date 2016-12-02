'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './accept.routes';

export class AcceptComponent {
  /*@ngInject*/
  constructor() {
    this.message = 'Hello';
  }
}

export default angular.module('gusApp.accept', [uiRouter])
  .config(routes)
  .component('accept', {
    template: require('./accept.html'),
    controller: AcceptComponent,
    controllerAs: 'acceptCtrl'
  })
  .name;
