/* eslint-disable no-alert,handle-callback-err,no-unused-vars,no-return-assign */
'use strict';
require('angular');
require('moment');
const $ = require('jquery');
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
require('./../../assets/lib/date-time-sort');

export default class AdminController {
  /*@ngInject*/
  constructor(User, $scope, $http, socket) {
    // Use the User $resource to fetch all users
    this.users = User.query();
    this.$scope = $scope;
    this.$http = $http;
    this.socket = socket;
    this.newLeo = { dislikes: [] };
  }

  static transformLeoForTable(leo) {
    let statusLabels = {
      Pending: 'warning',
      Declined: 'danger',
      Approved: 'success'
    };

    leo.btStatus = leo.btStatus || 'Pending';

    let colorClass = `label label-${statusLabels[leo.btStatus]}`;
    leo.btStatus = `<span class="${colorClass}">${leo.btStatus}</span>`;
    return leo;
  }

  $onInit() {
    this.$http.get('/api/leos')
      .then(response => {
        $.fn.dataTable.ext.errMode = 'none';
        // Map through leos to display labels  properly
        this.awesomeLeos = response.data.map(AdminController.transformLeoForTable);

        setTimeout(function() {
          $.fn.dataTable.moment('MMM D, YYYY');
          $('#leo-table').DataTable();
        }, 1000);
      });

    this.$http.get('/api/job_types')
      .then(res => this.jobTypes = res.data);
  }

  addLeo() {
    if(this.newLeo.name) {
      if(this.newLeo.address && this.newLeo.address.formatted_address) {
        this.newLeo.address = this.newLeo.address.formatted_address;
      }

      this.$http.post('/api/leos', this.newLeo)
        .then(res => {
          this.awesomeLeos.push(AdminController.transformLeoForTable(res.data));
          this.newLeo = { dislikes: [] };
        }, err => {
          alert('Could not create LEO, due to incorrect info');
        });
    } else {
      alert('Fill all fields');
    }
  }

  toggleJobType(id) {
    let idx = this.newLeo.dislikes.indexOf(id);

    // Is currently selected
    if(idx > -1) {
      this.newLeo.dislikes.splice(idx, 1);
    } else {
      // Is newly selected
      this.newLeo.dislikes.push(id);
    }
  }

  deleteLeo(leo) {
    this.$http.delete(`/api/leos/${leo._id}`)
      .then(() => this.awesomeLeos.splice(this.awesomeLeos.indexOf(leo), 1));
  }

  delete(user) {
    user.$remove();
    // console.log(this.users.indexOf(user), this.users.length);
    this.users.splice(this.users.indexOf(user), 1);
    // console.log(this.users, user);
    // let table = $('#leo-table').DataTable();
    // let usersTable = $('#users-table').DataTable();
  }

  $remove() {
  }
}
