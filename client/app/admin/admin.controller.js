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
//require('datatables.net-fixedheader-bs');
require('datatables.net-keytable');
require('datatables.net-responsive');
require('datatables.net-responsive-bs');
require('datatables.net-select');
require('datatables.net-scroller');
//require('datatables.net-scroller-bs');
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

  $onInit() {
    let statusLabels = {
      Pending: 'warning',
      Declined: 'danger',
      Approved: 'success'
    };

    this.$http.get('/api/leos')
      .then(response => {
        this.socket.syncUpdates('leo', this.awesomeLeos);

        $.fn.dataTable.ext.errMode = 'none';
        let leos = response.data; // map
        leos = leos.map(leo => {
          leo.btStatus = leo.btStatus || 'Pending';

          let colorClass = 'label label-' + statusLabels[leo.btStatus];
          leo.btStatus = `<span class="${colorClass}">${leo.btStatus}</span>`;
          return leo;
        });

        this.awesomeLeos = leos;

        setTimeout(function() {
          $.fn.dataTable.moment('MMM D, YYYY');
          $('#leo-table').DataTable();
        }, 1000);
      });

    this.$http.get('/api/job_types')
      .then(res => this.jobTypes = res.data);
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
    if(this.newLeo.name) {
      this.$http.post('/api/leos', this.newLeo)
        .then(this.newLeo = { dislikes: [] });
    }
  }

  toggleJobType(id) {
    var idx = this.newLeo.dislikes.indexOf(id);

    // Is currently selected
    if(idx > -1) {
      this.newLeo.dislikes.splice(idx, 1);
    } else {
      // Is newly selected
      this.newLeo.dislikes.push(id);
    }
  }

  deleteLeo(leo) {
    // console.log(leo)
    this.$http.delete(`/api/leos/${leo._id}`);
  }

  delete(user) {
    user.$remove();
    // console.log(this.users.indexOf(user), this.users.length);
    this.users.splice(this.users.indexOf(user), 1);
    // console.log(this.users, user);
    // let table = $('#leo-table').DataTable();
    // let usersTable = $('#users-table').DataTable();
  }
}
