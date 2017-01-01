import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './main.routes';
const flickity = require('flickity');
// const jquery = require('jquery');
let $ = require( 'jquery' );
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



console.log('So hey, HEY!');
console.log('      we brought our drum');
console.log('           and this is how we dance');
console.log('              No mistakin,');
console.log('                 we make our breaks');
console.log('                    if you dont like our 808s');
console.log('Then leave us alone, cause we dont need your policies');
console.log('We have no apologies for being');
console.log('Find me where the wild things are');
console.log('https://www.youtube.com/watch?v=W8MratH51eY')



export default angular.module('es4App.main', [uiRouter])
  .config(routing)
  .component('main', {
    template: require('./main.html'),
    controller: MainController
  })
  .name;










