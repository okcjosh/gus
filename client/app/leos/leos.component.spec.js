'use strict';

describe('Component: LeosComponent', function() {
  // load the controller's module
  beforeEach(module('gusApp.leos'));

  var LeosComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    LeosComponent = $componentController('leos', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
