'use strict';

describe('Component: TransactionComponent', function() {
  // load the controller's module
  beforeEach(module('gusApp.transaction'));

  var TransactionComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    TransactionComponent = $componentController('transaction', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
