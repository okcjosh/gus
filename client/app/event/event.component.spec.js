/* eslint-disable no-undef,no-unused-vars */
import {it} from 'moment';
'use strict';

describe('Component: EventComponent', function() {
  // load the controller's module
  beforeEach(module('myofficers2App.event'));

  let EventComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    EventComponent = $componentController('event', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
