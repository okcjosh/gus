/**
 * NewAppt model events
 */

'use strict';

import {EventEmitter} from 'events';
let NewAppt = require('../../sqldb').NewAppt;
let NewApptEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
NewApptEvents.setMaxListeners(0);

// Model events
let events = {
  afterCreate: 'save',
  afterUpdate: 'save',
  afterDestroy: 'remove'
};

// Register the event emitter to the model events
for(let e in events) {
  let event = events[e];
  NewAppt.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    NewApptEvents.emit(event + ':' + doc._id, doc);
    NewApptEvents.emit(event, doc);
    done(null);
  };
}

export default NewApptEvents;
