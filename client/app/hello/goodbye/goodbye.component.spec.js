'use strict';

describe('Component: GoodbyeComponent', function() {
  // load the controller's module
  beforeEach(module('gusApp.goodbye'));

  var GoodbyeComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    GoodbyeComponent = $componentController('goodbye', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
