'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './invitation.routes';

export class InvitationComponent {
  /*@ngInject*/
  constructor($scope, $http, $state) {
    this.$scope = $scope;
    this.$http = $http;
    this.$state = $state;
  }

  $onInit() {
    //alert(this.$state.params.event_id);
    var event = this.$state.params.event_id;
    this.$http.get('/api/events/' + event)
      .then(response => {
        this.$scope.event = response.data;
      }, err => {
        alert('error: ' + err);
      });
    // this.$http.get('/api/users/me')
    //   .then( response => {
    //     this.$scope.user = response.data;
    //   });
  }

  acceptInvite() {
    const id = this.$state.params.invitation_id;
    this.$http.put('/api/invitations/' + id, { status: 'Accepted' })
      .then(() => this.$state.go('main'));
  }

  rejectInvite() {
    const id = this.$state.params.invitation_id;
    this.$http.put('/api/invitations/' + id, { status: 'Rejected' })
      .then(() => this.$state.go('main'));
  }

}

export default angular.module('gusApp.invitation', [uiRouter])
  .config(routes)
  .component('invitation', {
    template: require('./invitation.html'),
    controller: InvitationComponent
  })
  .name;
