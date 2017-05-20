/* eslint-disable camelcase,no-unused-vars,no-sync */
'use strict';
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './leo-dashboard.routes';
const Flickity = require('flickity');

let $ = require('jquery');
require('moment');
require('fullcalendar');
require('datatables.net');
require('datatables.net-buttons');
require('datatables.net-buttons-bs');
require('datatables.net-bs');
require('datatables.net-buttons-bs');
require('datatables.net-fixedheader');
require('datatables.net-keytable');
require('datatables.net-responsive');
require('datatables.net-responsive-bs');
require('datatables.net-select');
require('datatables.net-scroller');

export class LeoDashboardController {
  /*@ngInject*/
  constructor($http, $scope, socket, $state, $interpolate, Auth) {
    this.$http = $http;
    this.socket = socket;
    this.$state = $state;
    this.isLoggedIn = Auth.isLoggedInSync;
    this.$scope = $scope;
    this.$scope.$state = $state;
    this.$interpolate = $interpolate;

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('thing');
    });
  }

  $onInit() {
    let flkty = new Flickity('.carousel', {
      // options
      autoPlay: true,
      wrapAround: true
    });

    this.loadEventsInitCalendar();
  }

  loadEventsInitCalendar() {
    this.$http.get(`/api/leos/${this.$state.params.leo_id}/events`)
      .then(res => res.data)
      .then(events => events.map(event => ({ id: event._id, title: event.title || event.venue, start: event.date})))
      .then(calendarEvents => $('#calendar').fullCalendar({
        events: calendarEvents,
        eventClick: event => {
          if(event) {
            this.$state.go('event-details', { event_id: event.id});
          }
        }
      }));
  }
}

export default angular.module('myofficersApp.leoDashboard', [uiRouter])
  .config(routing)
  .component('leoDashboard', {
    template: require('./leo-dashboard.html'),
    controller: LeoDashboardController
  })
  .name;
