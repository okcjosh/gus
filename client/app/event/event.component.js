'use strict';
const angular = require('angular');
const uiRouter = require('angular-ui-router');
let $ = window.$;

const moment = require('moment');

import routing from './event.routes';

export class EventComponent {
  awesomeEvents = [];

  /*@ngInject*/
  constructor($http, $scope, socket, $state, $q, toastr) {
    this.$http = $http;
    this.socket = socket;
    this.$state = $state;
    this.$scope = $scope;
    this.$q = $q;
    this.toastr = toastr;


    $scope.loadRecuringModal = this.loadRecuringModal;//.bind(null, $scope);
  }

  checkStepValid(step) {
    // return true; // uncomment for testing event form to move without validation
    let $s = this.$scope;
    switch (step) {
    case 1:
      this.jQueryShowErrorStep('#step1');
      if($s.newEventForm.nameOfVenue.$valid
        && $s.newEventForm.address.$valid
        && $s.newEventForm.phoneNumber.$valid
        && $s.newEventForm.poContact.$valid
        && $s.newEventForm.email.$valid) {
        return true;
      } else {
        if(!$s.newEventForm.email.$valid) {
          this.toastr.error('invalid email address');
        }
        return false;
      }
      break;

    case 2:
      this.jQueryShowErrorStep('#step2');
      $s.eventData.creationEventDate = document.getElementById('creationEventDate').value;
      // Because the datetimepicker plugin is jquery not angular, so selecting date doesn't set to a model, so we have to get it manually
      $s.eventData.officer_arrival_time = document.getElementById('OfficerArriveTime').value;
      // Because the datetimepicker plugin is jquery not angular, so selecting date doesn't set to a model, so we have to get it manually
      if($s.newEventForm.jobType.$valid
        && $s.newEventForm.jobSpecs.$valid
        // && $s.newEventForm.officerName.$valid
        && $s.newEventForm.jobRecuring.$valid
        && $s.newEventForm.officer_stay_hours.$modelValue > 0
        && $s.newEventForm.officerUniform.$valid
        && $s.newEventForm.attendeesNum.$modelValue > 0
        && $s.newEventForm.alcoholServed.$valid
        && $s.newEventForm.policeVehicle.$valid
        && $s.newEventForm.barricadeRequested.$valid
        && $s.newEventForm.amplifiedSound.$valid) {
        return true;
      } else {
        return false;
      }
      break;

    case 3:
      this.jQueryShowErrorStep('#step3');

      return true; // No fields yet for third step
      break;

    default:
    }
  }

  $onInit() {
    let $scope = this.$scope;
    let $state = this.$state;

    this.$scope.progress = 1;
    this.$scope.nextStep = () => {
      // Check for validity of filled data
      if(true || this.checkStepValid($scope.progress)) {
        if($scope.progress == 2) {
          // To submit the Event
          this.postEvent($scope)
            .then(function(data) {
              // Store created event on scope
              $scope.event = data.event;
              $scope.eventCost = data.cost;
              $scope.progress++;
            });
        } else if($scope.progress == 3) {
          // To go to checkout page
          $state.go('checkout', { event_id: $scope.event._id });
        } else {
          $scope.progress++;
        }
      } else {
        console.log('Not Valid ===>>>', $scope.newEventForm);
        alert('Not Valid');
      }
    };

    this.$scope.prevStep = function() {
      $scope.progress--;
    };

    this.$scope.submitForm = function(e) {
      e.preventDefault();
    };

    this.$scope.showRecurringModal = function() {
      $('#recuringJobSelect').prop('disabled', false);
      $('#recurrentJob').modal('show');

      setTimeout(() => {
        $('#recurring-calendar').fullCalendar('today');
        $('#recurring-calendar').fullCalendar('changeView', 'agendaWeek');
      }, 1000);
    };

    this.$scope.setRecurringEvents = function() {
      let events = $('#recurring-calendar').fullCalendar('clientEvents');

      events = events.map(e => {
        // moment objects
        // if no end is specified, automatically fullcalendar means 2 hours
        let twoHoursFromStart = e.start.clone().add(2, 'h');
                                  //.toDate();

        e.end = e.end ? e.end : twoHoursFromStart;
        e.start = e.start;//.toDate();
        return e;
      });

      $scope.eventData.recuring_data = events;
    };

    this.$scope.eventData = {
      creationEventDate: moment().add(7, 'days').format('DD MMMM YYYY hh:mm'),
      is_recuring: '0',
      hours_expected: 0,
      crowd_size: 0,
      operational_details: [],
      jobSpecs: [],
      officerName: []
    };

    this.$q.all([
      this.$http.get('/api/leos'),
      this.$http.get('/api/job_types?lookups=true')
    ])
      .then(responses => {
        this.$scope.awesomeLeos = responses[0].data;
        this.$scope.jobTypes = responses[1].data;

        setTimeout(() => this.initializeJQueryPlugins(), 0);
      });
  }

  initializeJQueryPlugins() {
    $('.selectpicker').selectpicker({
      style: 'btn-default',
      size: 10
    });

    $('#officer-select').selectpicker('refresh');

    $('#jobType').change(function() {
      $('#jobSpecs').selectpicker('val', []);
      $('#jobSpecs').selectpicker('refresh');
    });

    $('#creationEventDate').datetimepicker({
      format: 'DD MMMM YYYY LT',
      minDate: moment().add(7, 'days')
    });

    $('#creationEventDateGroup').datetimepicker({
      format: 'DD MMMM YYYY LT',
      minDate: moment().add(7, 'days')
    });

    $('#OfficerArriveTime').datetimepicker({
      format: 'LT'
    });

    $('#OfficerArriveTimeGroup').datetimepicker({
      format: 'LT'
    });

    $('#creationdateafter').datetimepicker({
      format: 'DD MMMM YYYY'
    });
    $('#creationdatebefore').datetimepicker({
      format: 'DD MMMM YYYY',
      useCurrent: false
    });
    $('#creationdateafter').on('dp.change', function(e) {
      $('#creationdatebefore').data('DateTimePicker')
        .minDate(e.date);
    });
    $('#creationdatebefore').on('dp.change', function(e) {
      $('#creationdateafter').data('DateTimePicker')
        .maxDate(e.date);
    });

    $('#recurring-calendar').fullCalendar({
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay'
      },
      allDaySlot: false,
      editable: true,
      droppable: true
    });

    $('#external-events .fc-event').each(function() {
      // make the event draggable using jQuery UI
      $(this).draggable({
        zIndex: 999,
        revert: true,      // will cause the event to go back to its
        revertDuration: 0  //  original position after the drag
      });
    });


    /** ******************************
     * Required Fields
     ****************************** **/
    $('form :input[required=\'required\']').blur(function() {
      if(!$(this).val()) {
        $(this).addClass('hasError');
      } else {
        if($(this).hasClass('hasError')) {
          $(this).removeClass('hasError');
        }
      }
    });
    $('form :input[required=\'required\']').change(function() {
      if($(this).hasClass('hasError')) {
        $(this).removeClass('hasError');
      }
    });
  }

  jQueryShowErrorStep(step) {
    $(`${step} :input[required='required']`).each(function() {
      if(!$(this).val()) {
        $(this).addClass('hasError');
      } else if($(this).hasClass('hasError')) {
        $(this).removeClass('hasError');
      }
    });
  }

  postEvent($scope) {
    let eventPayload = {
      title: $scope.eventData.title,
      venue: $scope.eventData.nameOfVenue,
      address: $scope.eventData.location ? $scope.eventData.location.formatted_address : $scope.eventData.location,
      phone_number: $scope.eventData.phoneNumber,
      point_of_contact: $scope.eventData.poContact,
      email: $scope.eventData.email,
      JobTypeId: $scope.eventData.jobType._id,
      job_type_specs: $scope.eventData.jobSpecs.join(','),
      prefered_officer_name: $scope.eventData.officerName.join(','),
      is_recuring: $scope.eventData.is_recuring,
      recuring_data: $scope.eventData.recuring_data,
      date: $scope.eventData.creationEventDate,

      description: $scope.eventData.description,
      crowd_size: $scope.eventData.crowd_size,
      officer_arrival_time: $scope.eventData.officer_arrival_time,
      hours_expected: $scope.eventData.hours_expected,
      officer_attire: $scope.eventData.officer_attire,

      alcohol: $scope.eventData.alcohol,
      barricades: $scope.eventData.barricades,
      police_vehicle: $scope.eventData.police_vehicle,
      amplified_sound: $scope.eventData.amplified_sound,
      operational_details: $scope.eventData.operational_details.join(',')
    };

    console.log(eventPayload);

    let d = this.$q.defer();

    this.$http.post('/api/events', eventPayload)
      .then(function(res) {
        console.log(res.data);
        if(res.status === 201) {
          d.resolve(res.data);
          //$state.go('checkout', { event_id: res.data._id });
        } else {
          d.reject(res);
          console.log(`Error ${res.statusText}`);
        }
      });

    return d.promise;
  }

  deleteEvent(event) {
    this.$http.delete(`/api/events/${event._id}`);
  }
}


export default angular.module('myofficers2App.event', [uiRouter])
  .config(routing)
  .component('event', {
    template: require('./event.html'),
    controller: EventComponent,
  })
  .name;
