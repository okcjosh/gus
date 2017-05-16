'use strict';

describe('Component: DashboardComponent', function() {
  // load the controller's module
  beforeEach(module('gusApp.rates'));

  let DashboardComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    DashboardComponent = $componentController('rates', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
