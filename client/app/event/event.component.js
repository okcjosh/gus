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
  job_type = '';
  one_field = '';
  two_field = '';
  three_field = '';
  four_field = '';
  five_field = '';
  six_field = '';
  seven_field = '';
  eight_field = '';
  nine_field = '';
  ten_field = '';
  eleven_field = '';
  twelve_field = '';
  ryan_is_a_dick_field = '';

  /*@ngInject*/
  constructor($http, $scope, socket, $state) {
    this.$http = $http;
    this.socket = socket;
    this.$state = $state;

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('event');
    });
    // $scope.$on('FormSubmit', function () {
    //   if(event-form.$valid) {
    //     $state.go('/checkout');
    //   }
    // })
  }

  $onInit() {
    this.$http.get('/api/events')
      .then(response => {
        this.awesomeEvents = response.data;
        this.socket.syncUpdates('event', this.awesomeEvents);
      });
  }

  addEvent($state) {
    {
      if (this.eventTitle) {
        this.$http.post('/api/events', {
          eventTitle: this.eventTitle,
          date: this.date,
          location_desc: this.location_desc,
          address: this.address,
          job_type: this.job_type,
          one_field: this.one_field,
          two_field: this.two_field,
          three_field: this.three_field,
          four_field: this.four_field,
          five_field: this.five_field,
          six_field: this.six_field,
          seven_field: this.seven_field,
          eight_field: this.eight_field,
          nine_field: this.nine_field,
          ten_field: this.ten_field,
          eleven_field: this.eleven_field,
          twelve_field: this.twelve_field,
          ryan_is_a_dick_field: this.ryan_is_a_dick_field,
        });

        this.eventTitle = '';
        this.date = '';
        this.location_desc = '';
        this.address = '';
        this.job_type = '';
        this.one_field = '';
        this.two_field = '';
        this.three_field = '';
        this.four_field = '';
        this.five_field = '';
        this.six_field = '';
        this.seven_field = '';
        this.eight_field = '';
        this.nine_field = '';
        this.ten_field = '';
        this.eleven_field = '';
        this.twelve_field = '';
        this.ryan_is_a_dick_field = '';
      }
    }
    // $state.go('checkout');
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
