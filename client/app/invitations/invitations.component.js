'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './invitations.routes';

export class InvitationsComponent {
  /*@ngInject*/
  constructor() {
    this.message = 'Hello';
  }
}

export default angular.module('gusApp.invitations', [uiRouter])
  .config(routes)
  .component('invitations', {
    template: require('./invitations.html'),
    controller: InvitationsComponent,
    controllerAs: 'invitationsCtrl'
  })
  .name;
