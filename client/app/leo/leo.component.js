'use strict';
const angular = require('angular');
const uiRouter = require('angular-ui-router');
import routing from './leo.routes';

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

export class LeoController {
  awesomeLeos = [];
  name = '';
  phone = '';
  email = '';
  department_id = '';
  year_started = '';
  lastGig = '';

  /*@ngInject*/
  constructor($http, $scope, socket) {
    this.$http = $http;
    this.socket = socket;
    this.$scope = $scope;

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('leo');
    });
  }

  $onInit() {
    this.$http.get('/api/leos')
      .then(response => {
        this.awesomeLeos = response.data;
        this.socket.syncUpdates('leo', this.awesomeLeos);
      });


      this.$http.get('/api/leos')
        .then(response => {
          this.awesomeLeos = response.data;
          //this.socket.syncUpdates('leo', this.awesomeLeos);

          // this.dataSet = response.data.map(function(event) {
          //   let link = `
          //     <a
          //       href="{{ $state.href('event-details', { event_id: ${event._id} }) }}"
          //       data-toggle="tooltip"
          //       data-placement="right"
          //       title=""
          //       data-original-title="View Entry">
          //         ${event.venue}
          //     </a>`;
          //   event.venueLink = _self.$interpolate(link)(_self.$scope);
          //   let colorClass = 'label label-' + statusLabels[event.Status.name];
          //   event.statusLabel = `<span class="${colorClass}">${event.Status.name}</span>`;
          //   return event;
          // });
          $.fn.dataTable.ext.errMode = 'none';
          let leos = response.data;

          let table = $('#leoTable').DataTable({
            
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

  inviteLeo(leo) {
    this.$http.post('/api/invitations', {
      job_id: '2',
      leo_id: leo.leo_id,
      expires: '2016-12-31',
      job_invitation_status_id: '1'
    });
  }

  addLeo() {
    if (this.name) {
      this.$http.post('/api/leos', {
        name: this.name,
        phone: this.phone,
        email: this.email,
        department_id: this.department_id,
        year_started: this.year_started,
        lastGig: this.lastGig
      });
      this.name = '';
      this.phone = '';
      this.email = '';
      this.department_id = '';
      this.year_started = '';
      this.lastGig = '';
    }
  }

  deleteLeo(leoId) {
    console.log('hello')
    //this.$http.delete(`/api/leos/${leoId}`);
  }
}

export default angular.module('es4App.leo', [uiRouter])
  .config(routing)
  .component('leo', {
    template: require('./leo.html'),
    controller: LeoController,
  })
  .name;
