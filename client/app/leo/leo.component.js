'use strict';
const angular = require('angular');
const uiRouter = require('angular-ui-router');
import routing from './leo.routes';

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
    }

    // inviteLeo() {
    //   if(tjis)
    // }

    addLeo() {
      if(this.name) {
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

    deleteLeo(leo) {
      this.$http.delete(`/api/leos/${leo._id}`);
    }
  }

export default angular.module('es4App.leo', [uiRouter])
  .config(routing)
  .component('leo', {
    template: require('./leo.html'),
    controller: LeoController,
  })
  .name;
