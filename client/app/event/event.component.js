'use strict';
const angular = require('angular');
//const $ = window.$;
//const jquery = $;
//require('bootstrap-select');
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
    this.$http.get('/api/events')
      .then(response => {
        this.awesomeEvents = response.data;
        this.socket.syncUpdates('event', this.awesomeEvents);
      });

    this.$scope.progress = 1;
    this.$scope.nextStep = function() {
      $scope.progress++;
    }
    this.$scope.prevStep = function() {
      $scope.progress--;
    }

    this.initializeJQueryPlugins();

    // $(document).ready(function () {
    //   /** ******************************
    //    * Alert Message Boxes
    //    ****************************** **/
    //   $('.msgClose').click(function (e) {
    //     e.preventDefault();
    //     $(this).closest('.alertMsg').fadeOut("slow", function () {
    //       $(this).addClass('hidden');
    //     });
    //   });
    //
    //   /** ******************************
    //    * Activate Tool-tips
    //    ****************************** **/
    //   // $("[data-toggle='tooltip']").tooltip();
    //
    //   /** ******************************
    //    * Activate Popovers
    //    ****************************** **/
    //   // $("[data-toggle='popover']").popover();
    //
    //   /** ******************************
    //    * Form Placeholders
    //    ****************************** **/
    //   let placehold = {
    //     init: function () {
    //       $('input[type="text"], input[type="email"], input[type="password"], textarea').each(placehold.replace);
    //     },
    //     replace: function () {
    //       let txt = $(this).data('placeholder');
    //       if (txt) {
    //         if ($(this).val() == '') {
    //           $(this).val(txt);
    //         }
    //         $(this).focus(function () {
    //           if ($(this).val() == txt) {
    //             $(this).val('');
    //           }
    //         }).blur(function () {
    //           if ($(this).val() == '') {
    //             $(this).val(txt);
    //           }
    //         });
    //       }
    //     }
    //   }
    //   placehold.init();
    //
    //   /** ******************************
    //    * Required Fields
    //    ****************************** **/
    //   $("form :input[required='required']").blur(function () {
    //     if (!$(this).val()) {
    //       $(this).addClass('hasError');
    //     } else {
    //       if ($(this).hasClass('hasError')) {
    //         $(this).removeClass('hasError');
    //       }
    //     }
    //   });
    //   $("form :input[required='required']").change(function () {
    //     if ($(this).hasClass('hasError')) {
    //       $(this).removeClass('hasError');
    //     }
    //   });
    //
    // });

  }

  initializeJQueryPlugins() {
    $('.selectpicker').selectpicker({
      style: 'btn-default',
      size: 9
    });

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
