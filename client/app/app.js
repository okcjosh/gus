'use strict';

import angular from 'angular';
import 'ng-sortable';
import ngCookies from 'angular-cookies';
import ngResource from 'angular-resource';
import ngSanitize from 'angular-sanitize';
import 'angular-socket-io';
import 'angular-drag-and-drop-lists';
import uiRouter from 'angular-ui-router';
import uiBootstrap from 'angular-ui-bootstrap';
import {routeConfig} from './app.config';
import _Auth from '../components/auth/auth.module';
import account from './account';
import admin from './admin';
import navbar from '../components/navbar/navbar.component';
import footer from '../components/footer/footer.component';
import main from './main/main.component';
import CheckoutComponent from './checkout/checkout.component';
import TransactionComponent from './checkout/transaction/transaction.component';
import InvitationComponent from './invitation/invitation.component';
import DashboardComponent from './dashboard/dashboard.component';
import event from './event/event.component';
import drag from './drag/drag.component';
import leo from './leo/leo.component';
import constants from './app.constants';
import util from '../components/util/util.module';
import socket from '../components/socket/socket.service';
import './app.scss';
import ngAnimate from 'angular-animate';
import ngMessages from 'angular-messages';


// import ngValidationMatch from 'angular-validation-match';


angular.module('es4App', [ngCookies, ngResource, ngSanitize,'dndLists', 'btford.socket-io', 'as.sortable', uiRouter,
  uiBootstrap, _Auth, ngAnimate, account, admin, ngMessages, drag, navbar, footer, main, CheckoutComponent, DashboardComponent, TransactionComponent, InvitationComponent, event, leo, constants, socket, util
])
  .config(routeConfig)
  .run(function($rootScope, $location, Auth) {
    'ngInject';
    // Redirect to new if route requires auth and you're not logged in

    $rootScope.$on('$stateChangeStart', function(next) {
      Auth.isLoggedIn(function(loggedIn) {
        if(next.authenticate && !loggedIn) {
          $location.path('/new');
        }
      });
    });
  });

angular.element(document)
  .ready(() => {
    angular.bootstrap(document,
      ['es4App'], {

        strictDi: false

      });
  });
