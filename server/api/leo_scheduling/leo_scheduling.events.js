/**
 * LeoScheduling model events
 */

'use strict';

import {EventEmitter} from 'events';
var LeoScheduling = require('../../sqldb').LeoScheduling;
var LeoSchedulingEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
LeoSchedulingEvents.setMaxListeners(0);

// Model events
var events = {
  afterCreate: 'save',
  afterUpdate: 'save',
  afterDestroy: 'remove'
};

// Register the event emitter to the model events
for(var e in events) {
  let event = events[e];
  LeoScheduling.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    LeoSchedulingEvents.emit(event + ':' + doc._id, doc);
    LeoSchedulingEvents.emit(event, doc);
    done(null);
  };
}

export default LeoSchedulingEvents;
