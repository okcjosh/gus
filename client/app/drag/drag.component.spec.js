'use strict';

describe('Component: DragComponent', function() {
  // load the controller's module
  beforeEach(module('gusApp.drag'));

  let DragComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    DragComponent = $componentController('drag', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
