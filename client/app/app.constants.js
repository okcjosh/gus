'use strict';

import angular from 'angular';

export default angular.module('es4App.constants', [])
  .constant('appConfig', require('../../server/config/environment/shared'))
  .name;
