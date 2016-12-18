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
  event_type = '';
  crowd_security = '';
  special_patrols = '';
  traffic_direction = '';
  escorts = '';
  asset_protection = '';
  officer_needed = '';
  hours_expected = '';
  crowd_size = '';
  officer_attire = '';
  officer_skillset = '';
  language = '';
  operational_details = '';


  /*@ngInject*/
  constructor($http, $scope, socket, $state) {
    this.$http = $http;
    this.socket = socket;
    this.$state = $state;
    this.$scope = $scope;

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
    var $scope = this.$scope;
    var $state = this.$state;
    this.$http.get('/api/events')
      .then(response => {
        this.awesomeEvents = response.data;
        this.socket.syncUpdates('event', this.awesomeEvents);
      });

    this.$scope.progress = 1;
    this.$scope.nextStep = function() {
      // Check for validity of filled data
      if (true) {
        if ($scope.progress == 3) $state.go('checkout');
        $scope.progress++;
      }
    }
    this.$scope.prevStep = function() {
      $scope.progress--;
    }

    this.$scope.submitForm = function(e) {
      e.preventDefault();
    }

    this.initializeJQueryPlugins();
  }

  initializeJQueryPlugins() {
    $('.selectpicker').selectpicker({
      style: 'btn-default',
      size: 4
    });

    // To open selectpicker list
    $('.bootstrap-select').click(function() {
      $(this).toggleClass('open');
    });

    $('#jobType').change(function () {
      $('.selectpicker').selectpicker('deselectAll');
      $("#jobSpecs option").each(function() {	$( this ).hide();});
      $("#jobType option:selected").each(function () {
        str = $(this).val();
      });
      $("#jobSpecs option[data-job='" + str + "']").each(function() {
        $( this ).show();
      });
      $('.selectpicker').selectpicker('render');
      $('.selectpicker').selectpicker('refresh');

    });

    $('#creationEventDate').datetimepicker({
      format: "DD MMMM YYYY"
    });


    /** ******************************
     * Required Fields
     ****************************** **/
    $("form :input[required='required']").blur(function () {
      if (!$(this).val()) {
        $(this).addClass('hasError');
      } else {
        if ($(this).hasClass('hasError')) {
          $(this).removeClass('hasError');
        }
      }
    });
    $("form :input[required='required']").change(function () {
      if ($(this).hasClass('hasError')) {
        $(this).removeClass('hasError');
      }
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
          event_type: this.event_type,
          crowd_security: this.crowd_security,
          special_patrols: this.special_patrols,
          traffic_direction: this.traffic_direction,
          escorts: this.escorts,
          asset_protection: this.asset_protection,
          officer_needed: this.officer_needed,
          hours_expected: this.hours_expected,
          crowd_size: this.crowd_size,
          officer_attire: this.officer_attire,
          officer_skillset: this.officer_skillset,
          language: this.language,
          operational_details: this.operational_details,
        });

        this.awesomeEvents = [];
        this.eventTitle = '';
        this.date = '';
        this.Location_Desc = '';
        this.Address = '';
        this.Job_Type = '';
        this.event_type = '';
        this.crowd_security = '';
        this.special_patrols = '';
        this.traffic_direction = '';
        this.escorts = '';
        this.asset_protection = '';
        this.officer_needed = '';
        this.hours_expected = '';
        this.crowd_size = '';
        this.officer_attire = '';
        this.officer_skillset = '';
        this.language = '';
        this.operational_details = '';
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
