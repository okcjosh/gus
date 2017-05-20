/**
 * Department model events
 */

'use strict';

import {EventEmitter} from 'events';
let Department = require('../../sqldb').Department;
let DepartmentEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
DepartmentEvents.setMaxListeners(0);

// Model events
let events = {
  afterCreate: 'save',
  afterUpdate: 'save',
  afterDestroy: 'remove'
};

// Register the event emitter to the model events
for(let e in events) {
  let event = events[e];
  Department.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    DepartmentEvents.emit(`${event}:${doc._id}`, doc);
    DepartmentEvents.emit(event, doc);
    done(null);
  };
}

export default DepartmentEvents;
