/* eslint-disable no-undef,no-unused-vars */
import {it} from 'moment';
'use strict';

describe('Component: InvitationComponent', function() {
  // load the controller's module
  beforeEach(module('gusApp.invitation'));

  let InvitationComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    InvitationComponent = $componentController('invitation', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
