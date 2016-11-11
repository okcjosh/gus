'use strict';

import angular from "angular";
import SignupController from "./signup.controller";

export default angular.module('es4App.signup', [])
  .controller('SignupController', SignupController)
  .name;
