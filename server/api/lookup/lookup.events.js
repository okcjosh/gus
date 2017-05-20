/**
 * Lookup model events
 */

'use strict';

import {EventEmitter} from 'events';
let Lookup = require('../../sqldb').Lookup;
let LookupEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
LookupEvents.setMaxListeners(0);

// Model events
let events = {
  afterCreate: 'save',
  afterUpdate: 'save',
  afterDestroy: 'remove'
};

// Register the event emitter to the model events
for(let e in events) {
  let event = events[e];
  Lookup.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    LookupEvents.emit(`${event}:${doc._id}`, doc);
    LookupEvents.emit(event, doc);
    done(null);
  };
}

export default LookupEvents;
