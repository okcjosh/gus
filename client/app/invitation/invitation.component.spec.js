'use strict';

describe('Component: InvitationComponent', function() {
  // load the controller's module
  beforeEach(module('gusApp.invitation'));

  var InvitationComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    InvitationComponent = $componentController('invitation', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
