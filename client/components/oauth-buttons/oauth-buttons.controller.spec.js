/* eslint-disable no-undef,no-unused-vars,no-duplicate-imports */
'use strict';

import {
  OauthButtonsController
} from './index';

describe('Controller: OauthButtonsController', function() {
  let controller;
  let $window;

  beforeEach(() => {
    angular.module('test', [])
      .controller('OauthButtonsController', OauthButtonsController);
  });
  // load the controller's module
  beforeEach(angular.mock.module('test'));

  // Initialize the controller and a mock $window
  beforeEach(inject(function($controller) {
    $window = {
      location: {}
    };

    controller = $controller('OauthButtonsController', {
      $window
    });
  }));

  it('should attach loginOauth', function() {
    expect(controller.loginOauth)
      .to.be.a('function');
  });
});
