'use strict';

describe('Component: CheckoutComponent', function() {
  // load the controller's module
  beforeEach(module('gusApp.checkout'));

  let CheckoutComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    CheckoutComponent = $componentController('checkout', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
