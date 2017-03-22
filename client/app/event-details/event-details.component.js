'use strict';
const angular = require('angular');
const uiRouter = require('angular-ui-router');
import routing from './event-details.routes';
export class EventDetailsComponent {
  awesomeEvents = [];

  /*@ngInject*/
  constructor($http, $scope, socket, $state) {
    this.$http = $http;
    this.socket = socket;
    this.$state = $state;
    this.$scope = $scope;
    this.init($scope);
    $scope.approve = this.approve.bind(this, $scope, $http);
    $scope.saveDrags = this.saveDrags.bind(this, $scope, $http);
    $scope.expressInterest = this.expressInterest.bind(this);

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('event');
    });
  }

  init($scope) {
    let _self = this;
    $scope.isAdminUser = false;
    $scope.isLeo = false;
    this.event_id = this.$state.params.event_id;
    $scope.event_id = this.event_id;
    this.$http.get('/api/leos')
      .then(leos => {
        $scope.leos = leos.data;

        // Call to invitations
        _self.$http.get('/api/invitations', {
          params: {
            party_id: _self.event_id
          }
        }).then(invitations => {
          _self.initializeDragDrop(_self.$scope, invitations.data);
        });
      });
  }

  $onInit() {
    let $scope = this.$scope,
      event_id = this.$state.params.event_id;

    $scope.leoSort = 'lastGig';

    this.event_id = event_id;

    this.$http.get('/api/events/' + event_id)
      .then(function(res) {
        if (res.status === 200) {
          $scope.event = res.data;
        }
      });

    this.$http.get('/api/users/me')
      .then(function(res) {
        if (res.status === 200) {
          $scope.user = res.data;
          if (res.data.role === 'admin') {
            $scope.isAdminUser = true;
          }
        }
      }).catch(err => $scope.isLeo = true);

    this.$http.get('/api/job_types')
      .then(function(res) {
        $scope.jobTypes = res.data;
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
    $scope.leosList = [{
      listName: 'Available Leos',
      items: $scope.leos.slice(0),
      dragging: false
    }];

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
      listName: 'Round 3',
      items: [],
      dragging: false
    }];
    let leos = $scope.leos.slice(0);
    let remainingLeos = $scope.leos.slice(0);

    let leoAppendedInvites = [];

    invitations.map(invite => {
      let leoIndex = leos.findIndex(leo => leo._id == invite.leo_id);
      if (leoIndex >= 0) {
        let leo = leos[leoIndex];
        invite.name = leo.name;
        remainingLeos.splice(leoIndex, 1);

        leoAppendedInvites.push(invite);
      }
    });

    $scope.leosList[0].items = remainingLeos;

    leoAppendedInvites.forEach(invite => {
      $scope.invitesList[parseInt(invite.pick) - 1]
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

  approve($scope, $http){
    $http.get('/api/events/approve/' + $scope.event_id);
  }
  saveDrags($scope, $http) {
    let invites = [],
      _self = this;

    $scope.invitesList.forEach(function(invite) {

      let draggedLeos = invite.items;
      draggedLeos.forEach(function(leo) {

        let inviteData = {
          party_id: _self.event_id,
          pick: invite.round,
          leo_id: leo._id,
          expires: 0
        };

        invites.push(inviteData);
      });
    });


    $http.post('/api/invitations', invites)
      .then(function(res) {
        if (res.status === 201) {
          // Invitation successfully created!!!
          // Decide what you want to do after creating invitation.
        }
      });
  }

  expressInterest() {
    let event_id = this.$state.params.event_id;
    let leo_id = window.localStorage.getItem('temp_leo_id');

    this.$http.put('/api/events/' + event_id + '/interest/' + leo_id)
      .then(res => this.$scope.event = res.data);
  }

}


export default angular.module('es42App.event-details', [uiRouter])
  .config(routing)
  .component('eventDetails', {
    template: require('./event-details.html'),
    controller: EventDetailsComponent,
  })
  .name;
