'use strict';
const angular = require('angular');
const uiRouter = require('angular-ui-router');
import routing from './event.routes';
export class EventComponent {
  awesomeEvents = [];

  /*@ngInject*/
  constructor($http, $scope, socket, $state, $q) {
    this.$http = $http;
    this.socket = socket;
    this.$state = $state;
    this.$scope = $scope;
    this.$q = $q;

    $scope.loadRecuringModal = this.loadRecuringModal;//.bind(null, $scope);

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('event');
    });
  }

  checkStepValid(step) {
    // return true; // uncomment for testing event form to move without validation
    var $s = this.$scope;
    switch (step) {
      case 1:
        this.jQueryShowErrorStep('#step1');
        if (
          $s.newEventForm.nameOfVenue.$valid &&
          $s.newEventForm.address.$valid &&
          $s.newEventForm.phoneNumber.$valid &&
          $s.newEventForm.poContact.$valid &&
          $s.newEventForm.email.$valid ) {
          return true;
        } else {
          return false;
        }
        break;

      case 2:
        this.jQueryShowErrorStep('#step2');
        $s.eventData.creationEventDate = document.getElementById("creationEventDate").value; // Because the datetimepicker plugin is jquery not angular, so selecting date doesn't set to a model, so we have to get it manually
        $s.eventData.officer_arrival_time = document.getElementById("OfficerArriveTime").value; // Because the datetimepicker plugin is jquery not angular, so selecting date doesn't set to a model, so we have to get it manually
        if (
          $s.newEventForm.jobType.$valid &&
          $s.newEventForm.jobSpecs.$valid &&
          $s.newEventForm.officerName.$valid &&
          $s.newEventForm.jobRecuring.$valid &&
          $s.newEventForm.officer_stay_hours.$modelValue > 0 &&
          $s.newEventForm.officerUniform.$valid &&
          $s.newEventForm.attendeesNum.$modelValue > 0 &&
          $s.newEventForm.alchoholServed.$valid &&
          $s.newEventForm.policeVehicle.$valid &&
          $s.newEventForm.barricadeRequested.$valid &&
          $s.newEventForm.amplifiedSound.$valid ) {
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
        if ($scope.progress == 2) {
          _self.postEvent($scope)
            .then(function(data) {
              // Store created event on scope
              $scope.event = data.event;
              $scope.eventCost = data.cost;
              $scope.progress++;
            });
        } else if ($scope.progress == 3) {
          $state.go('checkout', { event_id: $scope.event._id });

          console.log($scope.eventData);
          // _self.postEvent($scope); // If data was submitted successfully User will be redirected
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

    this.$scope.showRecurringModal = function() {
      $("#recuringJobSelect").prop('disabled', false);
      $('#recurrentJob').modal('show');
    }

    this.$scope.eventData = {
      creationEventDate: moment().add(7, 'days').format('DD MMMM YYYY hh:mm'),
      is_recuring: "0",
      hours_expected: 0,
      crowd_size: 0,
      operational_details: [],
      jobSpecs: [],
      officerName: []
    };

    this.$http.get('/api/job_types')
      .then(function(res) {
        _self.$scope.jobTypes = res.data;
      });

    this.$scope.jobTypeSpecs = [
      { value: '39', data_job: '8', type_spec: 'Apartment Roving Patrol' },
      { value: '53', data_job: '13', type_spec: 'Appartment Roving Patrol' },
      { value: '54', data_job: '13', type_spec: 'Bank Security' },
      { value: '55', data_job: '13', type_spec: 'Construction Safety / Control' },
      { value: '15', data_job: '1', type_spec: 'Intersection Control' },
      { value: '19', data_job: '2', type_spec: 'Intersection Control' },
      { value: '23', data_job: '3', type_spec: 'Intersection Control' },
      { value: '27', data_job: '4', type_spec: 'Intersection Control' },
      { value: '31', data_job: '5', type_spec: 'Intersection Control' },
      { value: '43', data_job: '10', type_spec: 'Intersection Control' },
      { value: '47', data_job: '11', type_spec: 'Intersection Control' },
      { value: '56', data_job: '13', type_spec: 'Intersection Control' },
      { value: '16', data_job: '1', type_spec: 'Money Drop Security' },
      { value: '20', data_job: '2', type_spec: 'Money Drop Security' },
      { value: '24', data_job: '3', type_spec: 'Money Drop Security' },
      { value: '32', data_job: '5', type_spec: 'Money Drop Security' },
      { value: '36', data_job: '7', type_spec: 'Money Drop Security' },
      { value: '40', data_job: '8', type_spec: 'Money Drop Security' },
      { value: '42', data_job: '9', type_spec: 'Money Drop Security' },
      { value: '57', data_job: '13', type_spec: 'Money Drop Security' },
      { value: '17', data_job: '1', type_spec: 'Neighborhood Patrol' },
      { value: '21', data_job: '2', type_spec: 'Neighborhood Patrol' },
      { value: '25', data_job: '3', type_spec: 'Neighborhood Patrol' },
      { value: '28', data_job: '4', type_spec: 'Neighborhood Patrol' },
      { value: '33', data_job: '5', type_spec: 'Neighborhood Patrol' },
      { value: '37', data_job: '7', type_spec: 'Neighborhood Patrol' },
      { value: '41', data_job: '8', type_spec: 'Neighborhood Patrol' },
      { value: '44', data_job: '10', type_spec: 'Neighborhood Patrol' },
      { value: '48', data_job: '11', type_spec: 'Neighborhood Patrol' },
      { value: '58', data_job: '13', type_spec: 'Neighborhood Patrol' },
      { value: '30', data_job: '4', type_spec: 'Other' },
      { value: '35', data_job: '6', type_spec: 'Other' },
      { value: '38', data_job: '7', type_spec: 'Other' },
      { value: '46', data_job: '10', type_spec: 'Other' },
      { value: '51', data_job: '11', type_spec: 'Other' },
      { value: '61', data_job: '13', type_spec: 'Other' },
      { value: '18', data_job: '1', type_spec: 'Parking ingress / egress' },
      { value: '22', data_job: '2', type_spec: 'Parking ingress / egress' },
      { value: '26', data_job: '3', type_spec: 'Parking ingress / egress' },
      { value: '29', data_job: '4', type_spec: 'Parking ingress / egress' },
      { value: '34', data_job: '5', type_spec: 'Parking ingress / egress' },
      { value: '49', data_job: '11', type_spec: 'Parking ingress / egress' },
      { value: '52', data_job: '12', type_spec: 'Parking ingress / egress' },
      { value: '59', data_job: '13', type_spec: 'Parking ingress / egress' },
      { value: '45', data_job: '10', type_spec: 'Special Community Patrol' },
      { value: '50', data_job: '11', type_spec: 'Special Community Patrol' },
      { value: '60', data_job: '13', type_spec: 'Special Community Patrol' }
    ];

    // Wait for angular to load jobTypes in ng-repeat
    setTimeout(function() { _self.initializeJQueryPlugins() }, 1000);
  }

  initializeJQueryPlugins() {
    $('.selectpicker').selectpicker({
      style: 'btn-default',
      size: 10
    });

    var str;

    // eveweb

    $("#jobSpecs option").each(function() {
      $(this).hide();
    });

    $('#jobType').change(function() {
      $('#jobSpecs').selectpicker('deselectAll');
      $("#jobSpecs").prop('disabled', 'disabled');
      $("#jobSpecs option").each(function() {
        $(this).hide();
      });
      $("#jobType option:selected").each(function() {
        str = $(this).val();
      });
      if (str.length >= 1) {
        $("#jobSpecs option[data-job='" + str + "']").each(function() {
          $(this).show();
        });
        $("#jobSpecs").prop('disabled', false);
      }
      $('.selectpicker').selectpicker('render');
      $('.selectpicker').selectpicker('refresh');

    });

    $('#creationEventDate').datetimepicker({
      format: "DD MMMM YYYY HH:mm",
      minDate: moment().add(7, 'days')
    });

    $('#creationEventDateGroup').datetimepicker({
      format: "DD MMMM YYYY HH:mm",
      minDate: moment().add(7, 'days')
    });

    $('#OfficerArriveTime').datetimepicker({
      format: "HH:mm"
    });

    $('#OfficerArriveTimeGroup').datetimepicker({
      format: "HH:mm"
    });

    $('#creationdateafter').datetimepicker({
      format: "DD MMMM YYYY"
    });
    $('#creationdatebefore').datetimepicker({
      format: "DD MMMM YYYY",
      useCurrent: false
    });
    $("#creationdateafter").on("dp.change", function(e) {
      $('#creationdatebefore').data("DateTimePicker").minDate(e.date);
    });
    $("#creationdatebefore").on("dp.change", function(e) {
      $('#creationdateafter').data("DateTimePicker").maxDate(e.date);
    });

    // Recurring modal pop func
    // $('.recuringJob').change(function() {
    //   $("#recuringJobSelect").prop('selectedIndex', 0);
    //   var rVal = $(this).val();
    //   if (rVal == '1') {
    //     $("#recuringJobSelect").prop('disabled', false);
    //     $('#recurrentJob').modal('show');
    //   } else {
    //     $("#recuringJobSelect").prop('disabled', 'disabled');
    //     $('#recurrentJob').modal('hide');
    //   }
    // });


    // endia

    // $('#creationEventDate').datetimepicker({
		// 	format: "DD MMMM YYYY hh:mm",
		// 	minDate: moment().add(7, 'days')
		// });
    //
		// $('#creationEventDateGroup').datetimepicker({
		// 	format: "DD MMMM YYYY hh:mm",
		// 	minDate: moment().add(7, 'days')
		// });
    //
		// $('#creationEventTime').datetimepicker({
		// 	format: "LT"
		// });
    //
		// $('#creationEventTimeGroup').datetimepicker({
		// 	format: "LT"
		// });
    //
    // $(' [name="jobRecuring"]').change(function(){
		// 	//$("#recuringJobSelect").prop('selectedIndex',0);
		// 	var rVal = $(this).val();
		// 	if(rVal == '1') {
		// 		$("#recuringJobSelect").prop('disabled', false);
		// 		$('#recurrentJob').modal('show');
		// 	} else {
		// 		$("#recuringJobSelect").prop('disabled', 'disabled');
		// 		$('#recurrentJob').modal('hide');
		// 	}
		// });
    //

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

  jQueryShowErrorStep(step) {
    $(step + " :input[required='required']").each(function() {
      if (!$(this).val()) {
        $(this).addClass('hasError');
      } else {
        if ($(this).hasClass('hasError')) {
          $(this).removeClass('hasError');
        }
      }
    });

  }

  postEvent($scope) {
    var eventPayload = {
      title: $scope.eventData.title,
      venue: $scope.eventData.nameOfVenue,
      address: $scope.eventData.location ? $scope.eventData.location.formatted_address : $scope.eventData.location,
      phone_number: $scope.eventData.phoneNumber,
      point_of_contact: $scope.eventData.poContact,
      email: $scope.eventData.email,
      JobTypeId: $scope.eventData.jobType,
      job_type_specs: $scope.eventData.jobSpecs.join(","),
      prefered_officer_name: $scope.eventData.officerName.join(","),
      is_recuring: $scope.eventData.is_recuring,
      recuring_data: $scope.eventData.recuringInterval,
      date: $scope.eventData.creationEventDate,


      description: $scope.eventData.description,
      crowd_size: $scope.eventData.crowd_size,
      officer_arrival_time: $scope.eventData.officer_arrival_time,
      hours_expected: $scope.eventData.hours_expected,
      officer_attire: $scope.eventData.officer_attire,


      alchohol: $scope.eventData.alchohol,
      barricades: $scope.eventData.barricades,
      police_vehicle: $scope.eventData.police_vehicle,
      amplified_sound: $scope.eventData.amplified_sound,
      operational_details: $scope.eventData.operational_details.join(",")
    };

    console.log(eventPayload);

    let d = this.$q.defer();

    this.$http.post('/api/events', eventPayload)
      .then(function(res) {
        console.log(res.data)
        if (res.status === 201) {
          d.resolve(res.data);
          //$state.go('checkout', { event_id: res.data._id });
        } else {
          d.reject(res);
          console.log('Error' + res.statusText);
        }
      });

    return d.promise;
  }

  loadRecuringModal() {
    console.log(this.$scope);
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
