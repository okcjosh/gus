/**
 * LeoScheduling model events
 */

'use strict';

import {EventEmitter} from 'events';
let LeoScheduling = require('../../sqldb').LeoScheduling;
let LeoSchedulingEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
LeoSchedulingEvents.setMaxListeners(0);

// Model events
let events = {
  afterCreate: 'save',
  afterUpdate: 'save',
  afterDestroy: 'remove'
};

// Register the event emitter to the model events
for(let e in events) {
  let event = events[e];
  LeoScheduling.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    LeoSchedulingEvents.emit(`${event}:${doc._id}`, doc);
    LeoSchedulingEvents.emit(event, doc);
    done(null);
  };
}

export default LeoSchedulingEvents;
