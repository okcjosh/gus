'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './invitation.routes';

export class InvitationComponent {
  /*@ngInject*/
  constructor() {
    this.message = 'Hello';
  }
}

export default angular.module('gusApp.invitation', [uiRouter])
  .config(routes)
  .component('invitation', {
    template: require('./invitation.html'),
    controller: InvitationComponent,
    controllerAs: 'invitationCtrl'
  })
  .name;
