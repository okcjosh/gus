'use strict';

import angular from 'angular';
import TransactionComponent from './transaction.component';

export default angular.module('es4App.transaction', [])
  .controller('TransactionComponent', TransactionComponent)
  .name;
