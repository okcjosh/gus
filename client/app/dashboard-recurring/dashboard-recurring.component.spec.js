/* eslint-disable no-undef,no-unused-vars */
import {it} from 'moment';
'use strict';

describe('Component: DashboardComponent', function() {
  // load the controller's module
  beforeEach(module('gusApp.dashboard'));

  let DashboardComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    DashboardComponent = $componentController('dashboard', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
