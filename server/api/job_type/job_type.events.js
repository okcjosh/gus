/**
 * JobType model events
 */

'use strict';

import {EventEmitter} from 'events';
let JobType = require('../../sqldb').JobType;
let JobTypeEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
JobTypeEvents.setMaxListeners(0);

// Model events
let events = {
  afterCreate: 'save',
  afterUpdate: 'save',
  afterDestroy: 'remove'
};

// Register the event emitter to the model events
for(let e in events) {
  let event = events[e];
  JobType.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    JobTypeEvents.emit(`${event}:${doc._id}`, doc);
    JobTypeEvents.emit(event, doc);
    done(null);
  };
}

export default JobTypeEvents;
