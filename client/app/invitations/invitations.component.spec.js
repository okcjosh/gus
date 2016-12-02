'use strict';

describe('Component: InvitationsComponent', function() {
  // load the controller's module
  beforeEach(module('gusApp.invitations'));

  var InvitationsComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    InvitationsComponent = $componentController('invitations', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
