'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './hello.routes';

export class HelloComponent {
  /*@ngInject*/
  constructor() {
    this.message = 'Hello';
  }
}

export default angular.module('gusApp.hello', [uiRouter])
  .config(routes)
  .component('hello', {
    template: require('./hello.html'),
    controller: HelloComponent,
    controllerAs: 'helloCtrl'
  })
  .name;
