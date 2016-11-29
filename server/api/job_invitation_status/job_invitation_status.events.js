/**
 * JobInvitationStatus model events
 */

'use strict';

import {EventEmitter} from 'events';
var JobInvitationStatus = require('../../sqldb').JobInvitationStatus;
var JobInvitationStatusEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
JobInvitationStatusEvents.setMaxListeners(0);

// Model events
var events = {
  afterCreate: 'save',
  afterUpdate: 'save',
  afterDestroy: 'remove'
};

// Register the event emitter to the model events
for(var e in events) {
  let event = events[e];
  JobInvitationStatus.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    JobInvitationStatusEvents.emit(event + ':' + doc._id, doc);
    JobInvitationStatusEvents.emit(event, doc);
    done(null);
  };
}

export default JobInvitationStatusEvents;
