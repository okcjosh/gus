'use strict';
const angular = require('angular');
const uiRouter = require('angular-ui-router');
import routing from './event.routes';
export class EventComponent {
  awesomeEvents = [];
  // eventTitle = '';
  // date = '';
  // Location_Desc = '';
  // Address = '';
  // Job_Type = '';
  // event_type = '';
  // crowd_security = '';
  // special_patrols = '';
  // traffic_direction = '';
  // escorts = '';
  // asset_protection = '';
  // officer_needed = '';
  // hours_expected = '';
  // crowd_size = '';
  // officer_attire = '';
  // officer_skillset = '';
  // language = '';
  // operational_details = '';


  /*@ngInject*/
  constructor($http, $scope, socket, $state) {
    this.$http = $http;
    this.socket = socket;
    this.$state = $state;
    this.$scope = $scope;

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('event');
    });
    // $scope.$on('FormSubmit', function () {
    //   if(event-form.$valid) {
    //     $state.go('/checkout');
    //   }
    // })
  }

  checkStepValid(step) {
    var $s = this.$scope;;
    switch (step) {
      case 1:
        if (
          $s.newEventForm.nameOfVenue.$valid &&
          $s.newEventForm.address.$valid &&
          $s.newEventForm.phoneNumber.$valid &&
          $s.newEventForm.poContact.$valid ) {
          return true;
        } else {
          return false;
        }
        break;

      case 2:
        $s.eventData.creationEventDate = document.getElementById("creationEventDateField").value; // Because the datetimepicker plugin is jquery not angular, so selecting date doesn't set to a model, so we have to get it manually
        if (
          $s.newEventForm.jobType.$valid &&
          $s.newEventForm.jobSpecs.$valid &&
          $s.newEventForm.officerName.$valid &&
          $s.newEventForm.jobRecuring.$valid ) {
          return true;
        } else {
          return false;
        }
        break;

      case 3:
        return true; // No fields yet for third step
        break;

      default:
    }
  }

  $onInit() {
    var $scope = this.$scope;
    var $state = this.$state;
    var _self = this;
    this.$http.get('/api/events')
      .then(response => {
        this.awesomeEvents = response.data;
        this.socket.syncUpdates('event', this.awesomeEvents);
      });

    this.$scope.progress = 1;
    this.$scope.nextStep = function() {
      // Check for validity of filled data
      if (_self.checkStepValid($scope.progress)) {
        if ($scope.progress == 3) {
          console.log($scope.eventData);
          _self.postEvent($state, $scope); // If data was submitted successfully User will be redirected
        } else {
          $scope.progress++;
        }
      } else {
        console.log('Not Valid', $scope.newEventForm);
      }
    }
    this.$scope.prevStep = function() {
      $scope.progress--;
    }

    this.$scope.submitForm = function(e) {
      e.preventDefault();
    }

    this.$scope.eventData = {};

    this.initializeJQueryPlugins();
  }

  initializeJQueryPlugins() {
    $('.selectpicker').selectpicker({
      style: 'btn-default',
      size: 4
    });

    var str;

    // $('input[name="jobRecuring"]').change(function () {
    //   //$('.selectpicker').selectpicker('deselectAll');
    //   $("#jobSpecs option").each(function() {	$( this ).hide();});
    //   $("#jobType option:selected").each(function () {
    //     str = $(this).val();
    //   });
    //   $("#jobSpecs option[data-job='" + str + "']").each(function() {
    //     $( this ).show();
    //   });
    //   $('.selectpicker').selectpicker('render');
    //   $('.selectpicker').selectpicker('refresh');
    //
    // });

    $('#creationEventDate').datetimepicker({
      format: "DD MMMM YYYY"
    });


    /** ******************************
     * Required Fields
     ****************************** **/
    $("form :input[required='required']").blur(function() {
      if (!$(this).val()) {
        $(this).addClass('hasError');
      } else {
        if ($(this).hasClass('hasError')) {
          $(this).removeClass('hasError');
        }
      }
    });
    $("form :input[required='required']").change(function() {
      if ($(this).hasClass('hasError')) {
        $(this).removeClass('hasError');
      }
    });
  }

  postEvent($state, $scope) {
    var eventPayload = {
      venue: $scope.eventData.nameOfVenue,
      location_desc: $scope.eventData.location.formatted_address,
      phone_number: $scope.eventData.phoneNumber,
      point_of_contact: $scope.eventData.point_of_contact,
      job_type: $scope.eventData.jobType,
      job_specs: $scope.eventData.jobSpecs,
      officer_name: $scope.eventData.officerName,
      is_recuring: Boolean($scope.eventData.isRecuring),
      recuring_interval: $scope.eventData.recuringInterval,
      date: $scope.eventData.creationEventDate
    }

    this.$http.post('/api/events', eventPayload)
      .then(function(res) {
        if (res.status === 201) {
          $state.go('checkout');
        } else {
          console.log('Error');
        }
      });
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
