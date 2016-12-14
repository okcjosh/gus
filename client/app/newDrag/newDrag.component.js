'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './newDrag.routes';

export class NewDragComponent {
  /*@ngInject*/
  constructor() {
    this.message = 'Hello';
  }
}

export default angular.module('gusApp.newDrag', [uiRouter])
  .config(routes)
  .component('newDrag', {
    template: require('./newDrag.html'),
    controller: NewDragComponent,
    controllerAs: 'newDragCtrl'
  })
  .name;
