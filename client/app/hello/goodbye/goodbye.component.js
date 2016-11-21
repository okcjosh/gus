'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './goodbye.routes';

export class GoodbyeComponent {
  /*@ngInject*/
  constructor() {
    this.message = 'Hello';
  }
}

export default angular.module('gusApp.goodbye', [uiRouter])
  .config(routes)
  .component('goodbye', {
    template: require('./goodbye.html'),
    controller: GoodbyeComponent,
    controllerAs: 'goodbyeCtrl'
  })
  .name;
