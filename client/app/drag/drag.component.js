/* eslint-disable no-shadow,brace-style,camelcase,arrow-body-style */
'use strict';
const angular = require('angular');
const uiRouter = require('angular-ui-router');
import routing from './drag.routes';
export class DragComponent {
  /** @namespace event.dataTransfer */


  /*@ngInject*/
  constructor($http, $scope) {
    this.$http = $http;
    this.$scope = $scope;
    this.init($scope);
    $scope.saveDrags = this.saveDrags.bind(this, $scope, $http);
  }


  init($scope) {
    this.$http.get('/api/leos')
      .then(response => {
        $scope.leos = response.data;

        this.$http.get('/api/jobs')
          .then(res => {
            $scope.jobs = res.data;

            this.initializeDragDrop($scope);
          });
      });
  }

  initializeDragDrop($scope) {
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

    $scope.jobsList = $scope.jobs.map(job => {
      return { job_data: job, listName: job.location, items: [], dragging: false };
    });
  }

  saveDrags($scope, $http) {
    $scope.jobsList.forEach(function(job) {
      let draggedLeos = job.items;
      draggedLeos.forEach(function(leo) {
        let inviteData = {
          job_id: job.job_data.job_id, leo_id: leo.leo_id, job_invitation_status_id: 1, expires: 0};

        $http.post('/api/invitations', inviteData)
          .then(function(res) {
            if(res.status === 201) {
              // Invitation successfully created!!!
              // Decide what you want to do after creating invitation.
            }
          });
      });
    });
  }
}


export default angular.module('myofficers2App.drag', [uiRouter])
  .config(routing)
  .component('drag', {
    template: require('./drag.html'),
    controller: DragComponent
  })
  .name;
