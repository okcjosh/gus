/**
 * Department model events
 */

'use strict';

import {EventEmitter} from 'events';
var Department = require('../../sqldb').Department;
var DepartmentEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
DepartmentEvents.setMaxListeners(0);

// Model events
var events = {
  afterCreate: 'save',
  afterUpdate: 'save',
  afterDestroy: 'remove'
};

// Register the event emitter to the model events
for(var e in events) {
  let event = events[e];
  Department.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    DepartmentEvents.emit(event + ':' + doc._id, doc);
    DepartmentEvents.emit(event, doc);
    done(null);
  };
}

export default DepartmentEvents;
