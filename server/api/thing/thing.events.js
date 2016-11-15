/**
 * Thing model events
 */

'use strict';

import {EventEmitter} from 'events';
let Thing = require('../../sqldb').Thing;
let ThingEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
ThingEvents.setMaxListeners(0);

// Model events
let events = {
  afterCreate: 'save',
  afterUpdate: 'save',
  afterDestroy: 'remove'
};

// Register the event emitter to the model events
for(let e in events) {
  let event = events[e];
  Thing.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    ThingEvents.emit(`${event}:${doc._id}`, doc);
    ThingEvents.emit(event, doc);
    done(null);
  };
}

export default ThingEvents;
