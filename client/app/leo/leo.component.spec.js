/* eslint-disable no-undef,no-unused-vars */
import {it} from 'moment';
'use strict';

describe('Component: LeoComponent', function() {
  // load the controller's module
  beforeEach(module('myofficersApp.leo'));

  let LeoComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    LeoComponent = $componentController('leo', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
