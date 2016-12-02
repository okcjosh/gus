'use strict';

describe('Component: RejectComponent', function() {
  // load the controller's module
  beforeEach(module('gusApp.reject'));

  var RejectComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    RejectComponent = $componentController('reject', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
