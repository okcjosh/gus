/**
 * JobInvitationStatus model events
 */

'use strict';

import {EventEmitter} from 'events';
let JobInvitationStatus = require('../../sqldb').JobInvitationStatus;
let JobInvitationStatusEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
JobInvitationStatusEvents.setMaxListeners(0);

// Model events
let events = {
  afterCreate: 'save',
  afterUpdate: 'save',
  afterDestroy: 'remove'
};

// Register the event emitter to the model events
for(let e in events) {
  let event = events[e];
  JobInvitationStatus.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    JobInvitationStatusEvents.emit(`${event}:${doc._id}`, doc);
    JobInvitationStatusEvents.emit(event, doc);
    done(null);
  };
}

export default JobInvitationStatusEvents;
