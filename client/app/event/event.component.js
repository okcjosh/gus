'use strict';
const angular = require('angular');
const uiRouter = require('angular-ui-router');
import routing from './event.routes';
export class EventComponent {
  awesomeEvents = [];
  eventTitle = '';
  date = '';
  Location_Desc = '';
  Address = '';
  Job_Type = '';
  One_Field = '';
  Two_Field = '';
  Three_Field = '';
  Four_Field = '';
  Five_Field = '';
  Six_Field = '';
  Seven_Field = '';
  Eight_Field = '';
  Nine_Field = '';
  Ten_Field = '';
  Eleven_Field = '';
  Twelve_Field = '';
  Ryan_Is_A_Dick_Field = '';

  /*@ngInject*/
  constructor($http, $scope, socket, $state) {
    this.$http = $http;
    this.socket = socket;
    this.$state = $state;

    $scope.$on('$destroy',function () {
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
          date: this.Date,
          location_desc: this.Location_Desc,
          address: this.Address,
          job_type: this.Job_Type,
          One_Field: this.One_Field,
          Two_Field: this.Two_Field,
          Three_Field: this.Three_Field,
          Four_Field: this.Four_Field,
          Five_Field: this.Five_Field,
          Six_Field: this.Six_Field,
          Seven_Field: this.Seven_Field,
          Eight_Field: this.Eight_Field,
          Nine_Field: this.Nine_Field,
          Ten_Field: this.Ten_Field,
          Eleven_Field: this.Eleven_Field,
          Twelve_Field: this.Twelve_Field,
          Ryan_Is_A_Dick_Field: this.Ryan_Is_A_Dick_Field,
        });

        this.eventTitle = '';
        this.Date = '';
        this.Location_Desc = '';
        this.Address = '';
        this.Job_Type = '';
        this.One_Field = '';
        this.Two_Field = '';
        this.Three_Field = '';
        this.Four_Field = '';
        this.Five_Field = '';
        this.Six_Field = '';
        this.Seven_Field = '';
        this.Eight_Field = '';
        this.Nine_Field = '';
        this.Ten_Field = '';
        this.Eleven_Field = '';
        this.Twelve_Field = '';
        this.Ryan_Is_A_Dick_Field = '';
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
