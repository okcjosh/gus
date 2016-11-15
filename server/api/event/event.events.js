/**
 * Event model events
 */

'use strict';

import {EventEmitter} from 'events';
let Event = require('../../sqldb').Event;
let EventEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
EventEvents.setMaxListeners(0);

// Model events
let events = {
  afterCreate: 'save',
  afterUpdate: 'save',
  afterDestroy: 'remove'
};

// Register the event emitter to the model events
for(let e in events) {
  let event = events[e];
  Event.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    EventEvents.emit(event + ':' + doc._id, doc);
    EventEvents.emit(event, doc);
    done(null);
  };
}

export default EventEvents;
