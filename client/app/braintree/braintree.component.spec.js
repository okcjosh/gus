'use strict';

describe('Component: BraintreeComponent', function() {
  // load the controller's module
  beforeEach(module('gusApp.braintree'));

  var BraintreeComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    BraintreeComponent = $componentController('braintree', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
