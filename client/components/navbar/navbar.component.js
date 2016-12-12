'use strict';
/* eslint no-sync: 0 */

import angular from 'angular';

export class NavbarComponent {
  menu = [{
    title: 'Home',
    state: 'main'
  }, {
    title: 'Event',
    state: 'event'
  }, {
    title: 'Leo',
    state: 'leo'
  }, {
    title: 'Drag',
    state: 'drag'
  }, {
    title: 'Dashboard',
    state: 'dashboard'
  }, {
    title: 'columnDemo',
    state: 'columndemo'
  }];

  isCollapsed = false;

  constructor(Auth) {
    'ngInject';

    this.isLoggedIn = Auth.isLoggedInSync;
    this.isAdmin = Auth.isAdminSync;
    this.getCurrentUser = Auth.getCurrentUserSync;
  }

}

export default angular.module('directives.navbar', [])
  .component('navbar', {
    template: require('./navbar.html'),
    controller: NavbarComponent
  })
  .name;
