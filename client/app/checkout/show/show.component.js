'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './show.routes';

export class ShowComponent {
  /*@ngInject*/
  constructor() {
    this.message = 'Hello';
  }
}

export default angular.module('gusApp.show', [uiRouter])
  .config(routes)
  .component('show', {
    template: require('./show.html'),
    controller: ShowComponent,
    controllerAs: 'showCtrl'
  })
  .name;
