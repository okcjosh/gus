/**
 * Staffing model events
 */

'use strict';

import {EventEmitter} from 'events';
var Staffing = require('../../sqldb').Staffing;
var StaffingEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
StaffingEvents.setMaxListeners(0);

// Model events
var events = {
  afterCreate: 'save',
  afterUpdate: 'save',
  afterDestroy: 'remove'
};

// Register the event emitter to the model events
for(var e in events) {
  let event = events[e];
  Staffing.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    StaffingEvents.emit(event + ':' + doc._id, doc);
    StaffingEvents.emit(event, doc);
    done(null);
  };
}

export default StaffingEvents;
