/**
 * User model events
 */

'use strict';

import {EventEmitter} from 'events';
import {User} from '../../sqldb';
let UserEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
UserEvents.setMaxListeners(0);

// Model events
let events = {
  afterCreate: 'save',
  afterUpdate: 'save',
  afterDestroy: 'remove'
};

// Register the event emitter to the model events
for(let e in events) {
  let event = events[e];
  User.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    UserEvents.emit(`${event}:${doc._id}`, doc);
    UserEvents.emit(event, doc);
    done(null);
  };
}

export default UserEvents;
