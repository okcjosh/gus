'use strict';

describe('Component: ColumndemoComponent', function() {
  // load the controller's module
  beforeEach(module('gusApp.columndemo'));

  var ColumndemoComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    ColumndemoComponent = $componentController('columndemo', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
