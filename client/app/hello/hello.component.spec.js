'use strict';

describe('Component: HelloComponent', function() {
  // load the controller's module
  beforeEach(module('gusApp.hello'));

  var HelloComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    HelloComponent = $componentController('hello', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
