'use strict';

describe('Component: Es4adminComponent', function() {
  // load the controller's module
  beforeEach(module('gusApp.es4admin'));

  var Es4adminComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    Es4adminComponent = $componentController('es4admin', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
