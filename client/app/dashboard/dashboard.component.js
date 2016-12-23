'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');
const jquery = require('jquery');
import routes from './dashboard.routes';

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

export class DashboardComponent {
  /*@ngInject*/

  constructor($http, $scope, socket, $state) {
    this.$http = $http;
    this.$scope = $scope;
    this.init($scope);
    $scope.saveDrags = this.saveDrags.bind(this, $scope, $http);
  }

  init($scope) {
    this.$http.get('/api/leos')
      .then(response => {
        $scope.leos = response.data;
      });
  }

  initializeDragDrop($scope, invitations) {
    /**
     * dnd-dragging determines what data gets serialized and send to the receiver
     * of the drop. While we usually just send a single object, we send the array
     * of all selected items here.
     */
    $scope.getSelectedItemsIncluding = function(list, item) {
      item.selected = true;
      return list.items.filter(function(item) { return item.selected; });
    };

    /**
     * We set the list into dragging state, meaning the items that are being
     * dragged are hidden. We also use the HTML5 API directly to set a custom
     * image, since otherwise only the one item that the user actually dragged
     * would be shown as drag image.
     */
    $scope.onDragstart = function(list, event) {
      list.dragging = true;
      if (event.dataTransfer.setDragImage) {
        let img = new Image();
        img.src = 'framework/vendor/ic_content_copy_black_24dp_2x.png';
        event.dataTransfer.setDragImage(img, 0, 0);
      }
    };

    /**
     * In the dnd-drop callback, we now have to handle the data array that we
     * sent above. We handle the insertion into the list ourselves. By returning
     * true, the dnd-list directive won't do the insertion itself.
     */
    $scope.onDrop = function(list, items, index) {
      angular.forEach(items, function(item) { item.selected = false; });
      list.items = list.items.slice(0, index)
        .concat(items)
        .concat(list.items.slice(index));
      return true;
    };

    /**
     * Last but not least, we have to remove the previously dragged items in the
     * dnd-moved callback.
     */
    $scope.onMoved = function(list) {
      list.items = list.items.filter(function(item) { return !item.selected; });
    };

    // Generate the initial model
    $scope.leosList = [{ listName: 'Available Leos', items: $scope.leos, dragging: false }];

    $scope.invitesList = [{
      round: 1,
      listName: 'Round 1',
      items: [],
      dragging: false
    }, {
      round: 2,
      listName: 'Round 2',
      items: [],
      dragging: false
    }, {
      round: 3,
      listName: 'Round 2',
      items: [],
      dragging: false
    }];

    invitations.forEach(invite => {
      $scope.invitesList[parseInt(invite.event_id)]
        .items.push(invite);
    });

    // $scope.jobsList = invitations.map((invitations, index) => {
    //   return {
    //     round: index + 1,
    //     listName: 'Round ' + index +1,
    //     items: [],
    //     dragging: false
    //   };
    // });
  }

  saveDrags($scope, $http) {
    var invites = [];
    $scope.invitesList.forEach(function(invite) {

      let draggedLeos = job.items;
      draggedLeos.forEach(function(leo) {

        let inviteData = {
          event_id: $scope.selectedRow.id,
          round: invite.round,
          leo_id: leo.leo_id,
          expires: 0
        };

        invites.push(inviteData);

        // $http.post('/api/invitations', inviteData)
        //   .then(function(res) {
        //     if (res.status === 201) {
        //       // Invitation successfully created!!!
        //       // Decide what you want to do after creating invitation.
        //     }
        //   });
      });
    });
  }

  $onInit() {
    let $scope = this.$scope,
      $http = this.$http,
      _self = this;
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

        let table = $('#events').DataTable({
          select: true,
          data: this.dataSet,
          columns: [
            {data: "event_id", title: "ID", visible: false},
            {data: "venue", title: "Venue"},
            {data: "address", title: "Location"},
            {data: "phone_number", title: "Phone Number"},
            {data: "point_of_contact", title: "POC"},
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


        table.on('select', function (e, dt, type, indexes) {
          if (type === 'row') {
            // table.rows(indexes).data() ==> This returns an array of selected rows
            //  because you can select multiple items at the same time, so I just get
            //  the first item on the next line
            let data = table.rows(indexes).data()[0];
            $scope.selectedRow = data;
            console.log(data);

            $http.get('/api/invitations', {
              params: {
                event_id: $scope.selectedRow.event_id
              }
            })
              .then(res => {
                _self.initializeDragDrop($scope, res.data);
              });
            if (!$scope.$$phase) {
              // Update the angular $scope so changes are reflected
              $scope.$apply();
            }
          }
        });

        // table.on('select', function (e, dt, type, indexes) {
        //   if (type === 'row') {
        //     let data = table.rows(indexes).data().pluck('_id');
        //     console.log(data);
        //   }
        // });
        //table.buttons().container().appendTo( $('#buttons') );
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
