'use strict';
const angular = require('angular');
const moment = require('moment');
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
require( './../../assets/lib/date-time-sort');

export default class AdminController {
  /*@ngInject*/
  constructor(User, $scope, $http, socket) {
    // Use the User $resource to fetch all users
    this.users = User.query();
    this.$scope = $scope;
    this.$http = $http;
    this.socket = socket;
  }



  $onInit() {
    this.$http.get('/api/leos')
      .then(response => {
        this.awesomeLeos = response.data;
        this.socket.syncUpdates('leo', this.awesomeLeos);

        $.fn.dataTable.ext.errMode = 'none';
        let leos = response.data;

        setTimeout(function() {
          $.fn.dataTable.moment( 'MMM D, YYYY' );

          let table = $('#leo-table').DataTable();
          // let usersTable = $('#users-table').DataTable();
        }, 1000);

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
        date_hired: this.date_hired,
        lastGig: this.lastGig,
        firstName: this.firstName,
        lastName: this.lastName,
        address: this.address,
        city: this.city,
        state: this.state,
        zip: this.zip,
        accountNumber: this.accountNumber,
        routingNumber: this.routingNumber
      });
      this.name = '';
      this.phone = '';
      this.email = '';
      this.department_id = '';
      this.date_hired = '';
      this.lastGig = '';
      this.firstName = '';
      this.lastName = '';
      this.address = '';
      this.city = '';
      this.state = '';
      this.zip = '';
      this.accountNumber = '';
      this.routingNumber = '';
    }

    // let braintree = require('braintree');
    // let environment, gateway;
    //
    // gateway = braintree.connect({
    //   environment: braintree.Environment.Sandbox,
    //   merchantId: 'swvg9scjkhfhq9rs',
    //   publicKey: '78ghksfzt5z5hfcx',
    //   privateKey: '1f210164c4fff82b6da4c29131f30379'
    // });
    //
    // module.exports = gateway;
    //
    // var merchantAccountParams;
    // merchantAccountParams = {
    //   individual: {
    //     firstName: "Jane",
    //     lastName: "Doe",
    //     email: "jane@14ladders.com",
    //     phone: "5553334444",
    //     dateOfBirth: "1981-11-19",
    //     ssn: "456-45-4567",
    //     address: {
    //       streetAddress: "111 Main St",
    //       locality: "Chicago",
    //       region: "IL",
    //       postalCode: "60622"
    //     }
    //   },
    //   business: {
    //     legalName: "Jane's Ladders",
    //     dbaName: "Jane's Ladders",
    //     taxId: "98-7654321",
    //     address: {
    //       streetAddress: "111 Main St",
    //       locality: "Chicago",
    //       region: "IL",
    //       postalCode: "60622"
    //     }
    //   },
    //   funding: {
    //     descriptor: "Blue Ladders",
    //     destination: braintree.MerchantAccount.FundingDestination.Bank,
    //     email: "funding@blueladders.com",
    //     mobilePhone: "5555555555",
    //     accountNumber: "1123581321",
    //     routingNumber: "071101307"
    //   },
    //   tosAccepted: true,
    //   masterMerchantAccountId: "americanhustlersyndicate",
    //   id: "blue_ladders_store",
    // };
    //
    // gateway.merchantAccount.create(merchantAccountParams, function (err, result) {
    //   console.log(result)
    // });
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
