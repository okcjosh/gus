/**
 * NewAppt model events
 */

'use strict';

import {EventEmitter} from 'events';
var NewAppt = require('../../sqldb').NewAppt;
var NewApptEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
NewApptEvents.setMaxListeners(0);

// Model events
var events = {
  afterCreate: 'save',
  afterUpdate: 'save',
  afterDestroy: 'remove'
};

// Register the event emitter to the model events
for(var e in events) {
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
