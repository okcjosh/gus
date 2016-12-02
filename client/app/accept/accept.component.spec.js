'use strict';

describe('Component: AcceptComponent', function() {
  // load the controller's module
  beforeEach(module('gusApp.accept'));

  var AcceptComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    AcceptComponent = $componentController('accept', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
