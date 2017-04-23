'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');
const $ = require('jquery');
// const jquery = require('jquery');
import routes from './dashboard.routes';

require('datatables.net');
require('datatables.net-buttons');
require('datatables.net-buttons-bs');
require('datatables.net-bs');
require('datatables.net-buttons-bs');
require('datatables.net-fixedheader');
//require('datatables.net-fixedheader-bs');
require('datatables.net-keytable');
require('datatables.net-responsive');
require('datatables.net-responsive-bs');
require('datatables.net-select');
require('datatables.net-scroller');
//require( 'datatables.net-scroller-bs');

export class DashboardComponent {
  /*@ngInject*/

  constructor($http, $scope, socket, $state, $interpolate) {
    this.$http = $http;
    this.$scope = $scope;
    this.$scope.$state = $state;
    this.$interpolate = $interpolate;
    this.init($scope);
    // $scope.saveDrags = this.saveDrags.bind(this, $scope, $http);
    // $scope.approve = this.approve.bind(this, $scope, $http);
  }

  init($scope) {
    this.$http.get('/api/leos')
      .then(response => {
        $scope.leos = response.data;
      });
  }

  $onInit() {
    const _self = this;

    this.$http.get('/api/events')
      .then(response => {
        const statusLabels = {
          Created: 'warning',
          Approved: 'success',
          Scheduled: 'info',
          Rejected: 'danger',
          Completed: 'primary'
        };

        this.dataSet = response.data.map(function(event) {
          let link = `
            <a
              href="{{ $state.href('event-details', { event_id: ${event._id} }) }}"
              data-toggle="tooltip"
              data-placement="right"
              title=""
              data-original-title="View Entry">
                ${event.venue}
            </a>`;
          event.venueLink = _self.$interpolate(link)(_self.$scope);

          if (event.Status) {
            let colorClass = `label label-${statusLabels[event.Status.name]}`;
            event.statusLabel = `<span class="${colorClass}">${event.Status.name}</span>`;
          } else {
            event.statusLabel = 'Unassigned';
          }

          event.leo_count = Math.ceil(event.crowd_size / 20);
          event.invite_count = Math.ceil(event.leo_count * .5);
          return event;
        });

        const table = $('#events').DataTable({
          select: true,
          initComplete: function() {
            this.api().columns()
            .every(function() {
              //alert('col: ' + this.header().innerHTML );
              var column = this;
              if(this.header().innerHTML == 'Status') {

                var select = $('<select><option value=""></option></select>')
                  .appendTo($(column.header()).empty())
                  .on('change', function () {
                    var val = $.fn.dataTable.util.escapeRegex(
                      $(this).val()
                    );

                    column
                      .search(val ? '^' + val + '$' : '', true, false)
                      .draw();
                  });

                column.data().unique().sort().each(function (d, j) {
                  // select.append('<option value="' + d + '">' + d + '</option>')
                  var val = $('<div/>').html(d).text();
                  select.append('<option value="' + val + '">' + val + '</option>');});
              }
            });
          },

          data: this.dataSet,
          columns: [
            {data: "_id", title: "ID", visible: false},
            {data: "venue", title: "Venue Data", visible: false},
            {data: "venueLink", title: "Venue"},
            {data: "address", title: "Location"},
            {data: "phone_number", title: "Phone Number"},
            {data: "leo_count", title: "Officers Needed"},
            {data: "invite_count", title: "Invites Accepted"},
            {data: "point_of_contact", title: "POC"},
            {data: "statusLabel", title: "Status", className: 'text-center'},
            {data: "JobType", title: "Job Type", visible: false},
            {data: "job_type_specs", title: "Job Specs", visible: false},
            {data: "prefered_officer_name", title: "Prefered Officer", visible: false},
            {data: "is_recuring", title: "Is Recuring", visible: false},
            {data: "recuring_data", title: "Recuring", visible: false},
            {data: "date", title: "Date", visible: false},
            // { data: "status", title: "Status" },
            // { data: "event_type", title: "Event Type" }
          ]
        });


        // table.on('select', function (e, dt, type, indexes) {
        //   if (type === 'row') {
        //     // table.rows(indexes).data() ==> This returns an array of selected rows
        //     //  because you can select multiple items at the same time, so I just get
        //     //  the first item on the next line
        //     let data = table.rows(indexes).data()[0];
        //     $scope.selectedRow = data;
        //
        //     $http.get('/api/invitations', {
        //       params: {
        //         party_id: $scope.selectedRow._id
        //       }
        //     }).then(res => {
        //       _self.initializeDragDrop($scope, res.data);
        //     });
        //
        //     if (!$scope.$$phase) {
        //       // Update the angular $scope so changes are reflected
        //       $scope.$digest();
        //     }
        //   }
        // });

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
