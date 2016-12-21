'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');
const jquery = require('jquery');
import routes from './dashboard.routes';

let $ = require( 'jquery' );
// require( 'datatables.net' );
// require( 'datatables.net-buttons');
// require( 'datatables.net-buttons-bs')(window, $);
require( 'datatables.net-bs');
// require( 'datatables.net-buttons-bs');
// require( 'datatables.net-fixedheader');
// require( 'datatables.net-fixedheader-bs');
// require( 'datatables.net-keytable');
// require( 'datatables.net-responsive');
// require( 'datatables.net-responsive-bs');
// require( 'datatables.net-select');
// require( 'datatables.net-scroller');
// require( 'datatables.net-scroller-bs');

export class DashboardComponent {
  /*@ngInject*/

  constructor($http) {
    this.$http = $http;
  }

  $onInit() {
    // this.$http.get('/api/leos')
    //   .then(response => {
    //     this.dataSet = response.data;
    //     //alert(this.dataSet[0].name);
    //     let table =  $('#example').DataTable( {
    //       data: this.dataSet,
    //       //columnDefs: [{ orderable: false, className: 'select-checkbox', targets: 0 }],
    //       select: { style: 'multi'},
    //       buttons: [
    //         {
    //           extend:'selected',
    //           text: 'Send Invites',
    //           action: function ( e, dt, button, config ) {
    //             let count = dt.rows( {selected: true }).indexes().length;
    //             let idxs = dt.rows({selected:true}).indexes();
    //             let $http = angular.injector(["ng"]).get("$http");
    //             //alert(count );
    //             for(let i = 0; i < count; i++) {
    //               let guy = dt.row(idxs[i]).data();
    //               //alert(guy.leo_id);
    //               // $http.post('/api/invitations', {
    //               //   job_id: '2',
    //               //   leo_id: guy.leo_id,
    //               //   expires: '2016-12-31',
    //               //   job_invitation_status_id: '5'
    //               // }, function(req, res) {
    //               //   alert(res);
    //               // });
    //               $http({
    //                 method: 'POST',
    //                 url: '/api/invitations',
    //                 data: {
    //                   job_id: '2',
    //                   leo_id: guy.leo_id,
    //                   expires: '2016-12-31',
    //                   job_invitation_status_id: '1'
    //                 }
    //               }).then(function (response) {
    //                 //alert('sent to: ' + guy.name);
    //                 // when the response is available
    //               }, function (reason) {
    //                 alert(reason.statusText);
    //                 // or server returns response with an error status.
    //               });
    //             }
    //           }
    //         }
    //       ],
    //       columns: [
    //         //{ data: "leo_id", title: "ID"},
    //         { data: "name", title: "Name" },
    //         { data: "phone", title: "Phone" },
    //         { data: "email", title: "Email" },
    //         //{ data: "department_id", title: "Department"},
    //         { data: "year_started", title: "Start date" },
    //         { data: "lastGig", title: "Last Job Worked" }
    //        // { data: "phone_verified", title: "Phone Verified"}
    //       ]
    //     } );
    //     table.buttons().container().appendTo( $('#buttons') );
    //   });
    this.$http.get('/api/events')
      .then(response => {
        this.dataSet = response.data;
        //alert(this.dataSet[0].name);
        let table =  $('#events').DataTable( {
          data: this.dataSet,
          columnDefs: [{ orderable: false, className: 'select-checkbox', targets: 0 }],
          select: { style: 'multi'},
         columns: [
            { data: "venue", title: "Venue" },
            { data: "address", title: "Location" },
            { data: "phone_number", title: "Phone Number" },
            { data: "point_of_contact", title: "POC" },

            // { data: "status", title: "Status" },
            // { data: "event_type", title: "Event Type" }
          ]
        } );
        table.buttons().container().appendTo( $('#buttons') );
      });
  }
}

export default angular.module('gusApp.dashboard', [uiRouter])
  .config(routes)
  .component('dashboard', {
    template: require('./dashboard.html'),
    controller: DashboardComponent,
    controllerAs: 'dashboardCtrl'
  })
  .name;
