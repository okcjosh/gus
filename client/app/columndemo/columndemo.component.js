'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './columndemo.routes';

export class ColumndemoComponent {
  /*@ngInject*/
  constructor() {
    this.message = 'Hello';
    let app = angular.module("columndemo", []);

    app.controller('table_controller', function($scope) {
      $scope.ordered_columns = [];
      $scope.all_columns = [{
        "title": "name",
        "type": "string",
        "checked": true
      }, {
        "title": "age",
        "type": "number",
        "checked": true
      }, {
        "title": "city",
        "type": "string",
        "checked": true

      }, {
        "title": "state",
        "type": "string",
        "checked": false
      }, {
        "title": "job",
        "type": "string",
        "checked": false
      }];

      // i.e. the rows
      $scope.data = [{
        "name": "aleck",
        "age": 33,
        "city": "Portland",
        "state": "OR",
        "job": "developer"
      }, {
        "name": "john",
        "age": 40,
        "city": "Portland",
        "state": "OR",
        "job": "designer"
      }, {
        "name": "erik",
        "age": 34,
        "city": "Portland",
        "state": "OR",
        "job": "sales"
      }];

      $scope.$watch('all_columns', function() {
        update_columns();
      }, true);

      let update_columns = function() {
        $scope.ordered_columns = [];
        for (let i = 0; i < $scope.all_columns.length; i++) {
          let column = $scope.all_columns[i];
          if (column.checked) {
            $scope.ordered_columns.push(column);
          }
        }
      };
    });
  }
}

export default angular.module('gusApp.columndemo', [uiRouter])
  .config(routes)
  .component('columndemo', {
    template: require('./columndemo.html'),
    controller: ColumndemoComponent,
    controllerAs: 'columndemoCtrl'
  })
  .name;
