'use strict';

import angular from 'angular';
import TransactionComponent from './transaction.component';

export default angular.module('myofficersApp.transaction', [])
  .controller('TransactionComponent', TransactionComponent)
  .name;
