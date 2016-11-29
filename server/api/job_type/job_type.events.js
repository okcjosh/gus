/**
 * JobType model events
 */

'use strict';

import {EventEmitter} from 'events';
var JobType = require('../../sqldb').JobType;
var JobTypeEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
JobTypeEvents.setMaxListeners(0);

// Model events
var events = {
  afterCreate: 'save',
  afterUpdate: 'save',
  afterDestroy: 'remove'
};

// Register the event emitter to the model events
for(var e in events) {
  let event = events[e];
  JobType.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    JobTypeEvents.emit(event + ':' + doc._id, doc);
    JobTypeEvents.emit(event, doc);
    done(null);
  };
}

export default JobTypeEvents;
