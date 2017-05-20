/* eslint-disable no-undef,no-unused-vars,no-duplicate-imports */
'use strict';

//noinspection JSFileReferences
import main from './main.component';
//noinspection JSFileReferences
import {
  MainController
} from './main.component';


describe('Component: MainComponent', function() {
  /** @namespace angular.mock */
  beforeEach(angular.mock.module(main));
  beforeEach(angular.mock.module('stateMock'));
  beforeEach(angular.mock.module('socketMock'));

  let scope;
  let mainComponent;
  let state;
  let $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function(_$httpBackend_, $http, $componentController, $rootScope, $state,
    socket) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('/api/things')
      .respond(['HTML5 Boilerplate', 'AngularJS', 'Karma', 'Express']);

    scope = $rootScope.$new();
    state = $state;
    mainComponent = $componentController('main', {
      $http,
      $scope: scope,
      socket
    });
  }));

  it('should attach a list of things to the controller', function() {
    mainComponent.$onInit();
    $httpBackend.flush();
    /** @namespace mainComponent.awesomeThings */
    expect(mainComponent.awesomeThings.length)
      .to.equal(4);
  });
});
