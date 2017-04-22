import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './main.routes';
const Flickity = require('flickity');
// const jquery = require('jquery');
let $ = require( 'jquery' );
require('moment');
require( 'fullcalendar' );
require( 'datatables.net' );
require( 'datatables.net-buttons');
require( 'datatables.net-buttons-bs');
require( 'datatables.net-bs');
require( 'datatables.net-buttons-bs');
require( 'datatables.net-fixedheader');
//require( 'datatables.net-fixedheader-bs');
require( 'datatables.net-keytable');
require( 'datatables.net-responsive');
require( 'datatables.net-responsive-bs');
require( 'datatables.net-select');
require( 'datatables.net-scroller');
//require( 'datatables.net-scroller-bs');

export class MainController {
  /*@ngInject*/
  constructor($http, $scope, socket, $state, $interpolate, Auth) {
    this.$http = $http;
    this.socket = socket;
    this.isLoggedIn = Auth.isLoggedInSync;
    this.$scope = $scope;
    this.$state = $state;
    this.$scope.$state = $state;
    this.$interpolate = $interpolate;

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('thing');
    });
  }

  $onInit() {
    this.$http.get('/api/events')
      .then(response => {
        this.dataSet = response.data;
        // alert(this.dataSet[0].name);
        let table = $('#example').DataTable({
          data: this.dataSet,
          columns: [
            {data: "event_id", title: "ID", visible: false},
            {data: "venue", title: "Venue Data", visible: false},
            {data: "address", title: "Location"},
            {data: "phone_number", title: "Phone Number"},
            {data: "point_of_contact", title: "POC"},
            {data: "status_id", title: "Status"},
            {data: "job_type", title: "Job Type", visible: false},
            {data: "job_type_specs", title: "Job Specs", visible: false},
            {data: "prefered_officer_name", title: "Prefered Officer", visible: false},
            {data: "is_recuring", title: "Is Recuring", visible: false},
            {data: "recuring_data", title: "Recuring", visible: false},
            {data: "date", title: "Date", visible: false},
            // { data: "status", title: "Status" },
            // { data: "event_type", title: "Event Type" }
          ]
        });
      })

      var flkty = new Flickity( '.carousel', {
        // options
        autoPlay: true,
        wrapAround: true
      });

      this.$http.get('/api/events')
        .then(res => res.data)
        .then(events => events.map(event => ({ id: event._id, title: event.title || event.venue, start: event.date})))
        .then(calendarEvents => $('#calendar').fullCalendar({
          events: calendarEvents,
          eventClick: event => {
            if (event) {
              this.$state.go('event-details', { event_id: event.id})
            }
          }
        }));
  }

  addThing() {
    if (this.newThing) {
      this.$http.post('/api/things', {
        name: this.newThing
      });
      this.newThing = '';
    }
  }

  deleteThing(thing) {
    this.$http.delete(`/api/things/${thing._id}`);
  }
}

export default angular.module('myofficersApp.main', [uiRouter])
  .config(routing)
  .component('main', {
    template: require('./main.html'),
    controller: MainController
  })
  .name;
