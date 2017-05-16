/**
 * Session model events
 */

'use strict';

import {EventEmitter} from 'events';
let Session = require('../../sqldb').Session;
let SessionEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
SessionEvents.setMaxListeners(0);

// Model events
let events = {
  afterCreate: 'save',
  afterUpdate: 'save',
  afterDestroy: 'remove'
};

// Register the event emitter to the model events
for(let e in events) {
  let event = events[e];
  Session.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    SessionEvents.emit(event + ':' + doc._id, doc);
    SessionEvents.emit(event, doc);
    done(null);
  };
}

export default SessionEvents;
