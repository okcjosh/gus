/* eslint-disable camelcase,no-return-assign,no-undef,no-alert,no-unused-vars,no-shadow,brace-style */
'use strict';
const angular = require('angular');
const uiRouter = require('angular-ui-router');
const moment = require('moment');

import routing from './event-details.routes';
export class EventDetailsComponent {
  leoInvites = [];
  adjustedAmount = 0;
  eventCost = {};
  receivingLeos = [];
  eventStatusId = [];

  /*@ngInject*/
  constructor($http, $scope, socket, $state, orderByFilter) {
    this.$http = $http;
    this.socket = socket;
    this.$state = $state;
    this.$scope = $scope;
    this.orderBy = orderByFilter;
    this.init($scope);
    $scope.approve = EventDetailsComponent.approve.bind(this, $scope, $http);
    $scope.saveDrags = this.saveDrags.bind(this, $scope, $http);
    $scope.expressInterest = this.expressInterest.bind(this);
    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('event');
    });
  }

  init($scope) {
    $scope.isAdminUser = false;
    $scope.isLeo = false;
    this.event_id = this.$state.params.event_id;
    $scope.event_id = this.event_id;
    this.$http.get('/api/leos')
      .then(res => {
        $scope.leos = res.data;

        // Call to invitations
        this.$http.get('/api/invitations', {
          params: {
            event_id: this.event_id
          }
        }).then(invitationsRes => {
          this.initializeDragDrop(this.$scope, invitationsRes.data);
        });
      });
  }

  $onInit() {
    let $scope = this.$scope;
    let event_id = this.$state.params.event_id;

    $scope.leoSort = 'lastGig';

    this.event_id = event_id;

    this.$http.get(`/api/events/${event_id}`)
      .then(res => {
        if(res.status === 200) {
          let event = res.data;
          event.startDate = moment(event.date).format('llll');

          event.endDate = moment(event.date).add(event.hours_expected, 'h')
                                            .format('llll');
          $scope.event = res.data;
          this.initMap(event.address);
        }
      });

    this.$http.get('/api/users/me')
      .then(function(res) {
        if(res.status === 200) {
          $scope.user = res.data;
          if(res.data.role === 'admin') {
            $scope.isAdminUser = true;
          }
        }
      })
      .catch(function() {
        return $scope.isLeo = true;
      });

    this.$http.get('/api/job_types')
      .then(function(res) {
        $scope.jobTypes = res.data;
      });
    this.$http.get(`/api/events/${event_id}/cost`)
      .then(res => {
        this.eventCost = res.data;
        this.adjustedAmount = res.data.grand_total;
      });
    // this.$http.get(`/api/events/${event_id}/status`)
    //   .then(res => {
    //     this.eventStatusId = res.data;
    //   });
    this.$http.get(`/api/events/${event_id}/leos_invite`)
      .then(res => {
        this.leoInvites = res.data;
        this.receivingLeos = this.leoInvites
          .filter(inv => inv.status === 'Accepted')
          .map(inv => inv.Leo);
      });
  }


  initMap(address) {
    let geocoder;
    geocoder = new google.maps.Geocoder();
    // Create a map object and specify the DOM element for display.
    const map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: 0, lng: 0 },
      scrollwheel: false,
      zoom: 13
    });

    geocoder.geocode({ address }, function(results, status) {
      if(status === 'OK') {
        map.setCenter(results[0].geometry.location);
        const marker = new google.maps.Marker({
          map,
          position: results[0].geometry.location
        });
      } else {
        alert(`Geocode was not successful for the following reason: ${status}`);
      }
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
      return list.items.filter(function(parameters) {
        let item = parameters.item;
        return item.selected;
      });
    };

    /**
     * We set the list into dragging state, meaning the items that are being
     * dragged are hidden. We also use the HTML5 API directly to set a custom
     * image, since otherwise only the one item that the user actually dragged
     * would be shown as drag image.
     */
    $scope.onDragstart = function(list, event) {
      list.dragging = true;
      if(event.dataTransfer.setDragImage) {
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
      items.forEach(item => { item.selected = false; });
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

    let remainingLeos = this.addInvitesToLists(invitations);

    $scope.leosList[0].items = remainingLeos.map(leo => ({
      event_id: this.event_id,
      leo_id: leo._id,
      name: leo.name,
      lastGig: leo.lastGig,
      year_started: leo.year_started
    }));
  }

  addInvitesToLists(invitations) {
    // let invitations = [];
    let leoAppendedInvites = [];

    let remainingLeos = this.$scope.leos.slice(0);

    invitations.forEach(invite => {
      let leoIndex = remainingLeos.findIndex(leo => leo._id === invite.leo_id);

      if(leoIndex > -1) {
        let leo = remainingLeos[leoIndex];
        invite.name = leo.name;
        remainingLeos.splice(leoIndex, 1);

        leoAppendedInvites.push(invite);
      }
    });

    leoAppendedInvites.forEach(invite => {
      const roundIndex = parseInt(invite.pick, 10) - 1;

      this.$scope.invitesList[roundIndex].items.push(invite);
    });

    return remainingLeos;
  }

  orderByChange(newValue) {
    const leos = this.$scope.leosList[0].items.slice(0);

    this.$scope.leosList[0].items = this.orderBy(leos, newValue, false);
  }

  autoSelect() {
    const roundInputOne = $('#auto-round-one-input');
    const roundInputTwo = $('#auto-round-two-input');
    const roundInputThree = $('#auto-round-three-input');

    const r1 = parseInt(roundInputOne.val(), 10) || 0;
    const r2 = parseInt(roundInputTwo.val(), 10) || 0;
    const r3 = parseInt(roundInputThree.val(), 10) || 0;

    const sc = this.$scope;
    let roundPicks = [r1, r2, r3];

    roundPicks.forEach((picks, index) => {
      if(picks > 0) {
        const selectedLeoInvites = sc.leosList[0].items.splice(0, picks);

        const invites = selectedLeoInvites.map(inv => {
          inv.pick = index + 1;
          return inv;
        });
        this.addInvitesToLists(invites);
      }
    });

    roundInputOne.val(0);
    roundInputTwo.val(0);
    roundInputThree.val(0);
  }

  static approve($scope, $http) {
    $http.get(`/api/events/approve/${$scope.event_id}`);
  }

  saveDrags($scope, $http) {
    let invites = [];
    let event_id = this.$state.params.event_id;
    console.log(this.$scope.leos);

    $scope.invitesList.forEach(invite => {
      let draggedLeos = invite.items;
      console.info(draggedLeos, invite);

      draggedLeos.forEach(invitedLeo => {
        const inviteData = {
          event_id,
          pick: invite.round,
          leo_id: invitedLeo.leo_id,
          expires: 0
        };

        invites.push(inviteData);
      });
    });

    $http.post(`/api/invitations/${event_id}`, invites)
      .then(function(res) {
        if(res.status === 201) {
          // Invitation successfully created!!!
          // Decide what you want to do after creating invitation.
        }
      });
  }

  complete() {
    let event_id = this.$state.params.event_id;

    this.$http.post(`/api/events/${event_id}/complete`, {
      amount: this.adjustedAmount
    }).then(res => console.log(res));
  }

  expressInterest() {
    let event_id = this.$state.params.event_id;
    let leo_id = window.localStorage.getItem('temp_leo_id');

    this.$http.put(`/api/events/${event_id}/interest/${leo_id}`)
      .then(res => this.$scope.event = res.data);
  }
}


export default angular.module('myofficers2App.event-details', [uiRouter])
  .config(routing)
  .component('eventDetails', {
    template: require('./event-details.html'),
    controller: EventDetailsComponent,
    bindings: {
      eventCost: '=?',
      adjustedAmount: '=?',
      receivingLeos: '=?',
      leoInvites: '=?'
    }
  })
  .name;
