'use strict';
const angular = require('angular');
const moment = require('moment');

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
    var event_id = this.$state.params.event_id;
    this.$http.get('/api/events/' + event_id)
      .then(res => {
        if (res.status === 200) {
          let event = res.data;
          event.startDate = moment(event.date).format('llll');

          event.endDate = moment(event.date).add(event.hours_expected, 'h')
                                            .format('llll');

          this.initMap(event.address);
          this.$scope.event = res.data;
        }
      }, err => {
        alert('error: ' + err);
      });
    // this.$http.get('/api/users/me')
    //   .then( response => {
    //     this.$scope.user = response.data;
    //   });
  }

  initMap(address) {
    var geocoder = new google.maps.Geocoder();
    // Create a map object and specify the DOM element for display.
    const map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: -34.397, lng: 150.644},
      scrollwheel: false,
      zoom: 10
    });

    geocoder.geocode({ address }, function(results, status) {
      if(status === 'OK') {
        map.setCenter(results[0].geometry.location);
        const marker = new google.maps.Marker({
          map,
          position: results[0].geometry.location
        });
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
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
