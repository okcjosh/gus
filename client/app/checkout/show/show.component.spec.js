'use strict';

describe('Component: ShowComponent', function() {
  // load the controller's module
  beforeEach(module('gusApp.show'));

  var ShowComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    ShowComponent = $componentController('show', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
