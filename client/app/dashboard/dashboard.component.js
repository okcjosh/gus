/* eslint-disable consistent-this,camelcase,no-unused-vars,array-callback-return,no-invalid-this,prefer-template */
'use strict';
const angular = require('angular');
const uiRouter = require('angular-ui-router');
const $ = require('jquery');
import routes from './dashboard.routes';

require('datatables.net');
require('datatables.net-buttons');
require('datatables.net-buttons-bs');
require('datatables.net-bs');
require('datatables.net-buttons-bs');
require('datatables.net-fixedheader');
require('datatables.net-keytable');
require('datatables.net-responsive');
require('datatables.net-responsive-bs');
require('datatables.net-select');
require('datatables.net-scroller');


export class DashboardComponent {
  /*@ngInject*/

  constructor($http, $scope, $state, $interpolate) {
    this.$http = $http;
    this.$scope = $scope;
    this.$scope.$state = $state;
    this.$interpolate = $interpolate;
    this.init($scope);
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

          if(event.Status) {
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
          initComplete() {
            this.api().columns()
            .every(function() {
              let column = this;
              if(this.header().innerHTML === 'Status') {
                let select = $('<select><option value=""></option></select>')
                  .appendTo($(column.header()).empty())
                  .on('change', function() {
                    let val = $.fn.dataTable.util.escapeRegex(
                      $(this).val()
                    );

                    column
                      .search(val ? '^' + val + '$' : '', true, false)
                      .draw();
                  });

                column.data().unique()
                  .sort()
                  .each(function(parameters) {
                    let d;
                    let j;
                    ({d, j} = parameters);
                    let val = $('<div/>').html(d)
                      .text();
                    select.append('<option value="' + val + '">' + val + '</option>');
                  });
              }
            });
          },

          data: this.dataSet,
          columns: [
            {data: '_id', title: 'ID', visible: false},
            {data: 'venue', title: 'Venue Data', visible: false},
            {data: 'venueLink', title: 'Venue'},
            {data: 'address', title: 'Location'},
            {data: 'phone_number', title: 'Phone Number'},
            {data: 'leo_count', title: 'Officers Needed'},
            {data: 'invite_count', title: 'Invites Accepted'},
            {data: 'point_of_contact', title: 'POC'},
            {data: 'statusLabel', title: 'Status', className: 'text-center'},
            {data: 'JobType', title: 'Job Type', visible: false},
            {data: 'job_type_specs', title: 'Job Specs', visible: false},
            {data: 'preferred_officer_name', title: 'Preferred Officer', visible: false},
            {data: 'is_recuring', title: 'Is Recuring', visible: false},
            {data: 'date', title: 'Date', visible: false},
          ]
        });
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
