'use strict';

describe('Component: NewDragComponent', function() {
  // load the controller's module
  beforeEach(module('gusApp.newDrag'));

  var NewDragComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    NewDragComponent = $componentController('newDrag', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
