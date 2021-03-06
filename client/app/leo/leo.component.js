/* eslint-disable camelcase,no-unused-vars */
'use strict';
const angular = require('angular');
const uiRouter = require('angular-ui-router');
import routing from './leo.routes';

let $ = require('jquery');
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


export class LeoController {
  awesomeLeos = [];
  name = '';
  phone = '';
  email = '';
  department_id = '';
  date_hired = '';
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
          $.fn.dataTable.ext.errMode = 'none';
          let leos = response.data;
          let table = $('#leoTable').DataTable();
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
    if(this.name) {
      this.$http.post('/api/leos', {
        name: this.name,
        phone: this.phone,
        email: this.email,
        department_id: this.department_id,
        date_hired: this.date_hired,
        lastGig: this.lastGig
      });
      this.name = '';
      this.phone = '';
      this.email = '';
      this.department_id = '';
      this.date_hired = '';
      this.lastGig = '';
    }
  }

  deleteLeo(leoId) {
    this.$http.delete(`/api/leos/${leoId}`);
  }
}

export default angular.module('myofficersApp.leo', [uiRouter])
  .config(routing)
  .component('leo', {
    template: require('./leo.html'),
    controller: LeoController,
  })
  .name;
