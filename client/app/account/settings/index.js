'use strict';

import angular from "angular";
import SettingsController from "./settings.controller";

export default angular.module('es4App.settings', [])
  .controller('SettingsController', SettingsController)
  .name;
