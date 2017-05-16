/**
 * Status model events
 */

'use strict';

import {EventEmitter} from 'events';
let Status = require('../../sqldb').Status;
let StatusEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
StatusEvents.setMaxListeners(0);

// Model events
let events = {
  afterCreate: 'save',
  afterUpdate: 'save',
  afterDestroy: 'remove'
};

// Register the event emitter to the model events
for(let e in events) {
  let event = events[e];
  Status.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    StatusEvents.emit(event + ':' + doc._id, doc);
    StatusEvents.emit(event, doc);
    done(null);
  };
}

export default StatusEvents;
