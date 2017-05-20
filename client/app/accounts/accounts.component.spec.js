/* eslint-disable no-undef,no-unused-vars */
import {it} from 'moment';
'use strict';

describe('Component: AccountsComponent', function() {
  // load the controller's module
  beforeEach(module('gusApp.accounts'));

  let AccountsComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    AccountsComponent = $componentController('accounts', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
