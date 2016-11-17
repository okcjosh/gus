'use strict';
const angular = require('angular');
const uiRouter = require('angular-ui-router');
import routing from './event.routes';
export class EventComponent {
  awesomeEvents = [];
  eventTitle = '';
  date = '';
  location_desc = '';
  address = '';
  department_id = '';
  status_id = '';
  leo_id = '';

  /*@ngInject*/
  constructor($http, $scope, socket) {
    this.$http = $http;
    this.socket = socket;

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('event');
    });
  }

  $onInit() {
    this.$http.get('/api/events')
      .then(response => {
        this.awesomeEvents = response.data;
        this.socket.syncUpdates('event', this.awesomeEvents);
      });
  }

  addEvent() {
    if (this.eventTitle) {
      this.$http.post('/api/events', {
        eventTitle: this.eventTitle,
        date: this.date,
        location_desc: this.location_desc,
        address: this.address,
        department_id: this.department_id,
        status_id: this.status_id,
        leo_id: this.leo_id
      });
      this.eventTitle = '';
      this.date = '';
      this.location_desc = '';
      this.address = '';
      this.department_id = '';
      this.status_id = '';
      this.leo_id = '';
    }
  }

  deleteEvent(event) {
    this.$http.delete(`/api/events/${event._id}`);
  }
}

export default angular.module('es42App.event', [uiRouter])
  .config(routing)
  .component('event', {
    template: require('./event.html'),
    controller: EventComponent,
  })
  .name;
