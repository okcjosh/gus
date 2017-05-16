/**
 * JobInvitation model events
 */

'use strict';

import {EventEmitter} from 'events';
let JobInvitation = require('../../sqldb').JobInvitation;
let JobInvitationEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
JobInvitationEvents.setMaxListeners(0);

// Model events
let events = {
  afterCreate: 'save',
  afterUpdate: 'save',
  afterDestroy: 'remove'
};

// Register the event emitter to the model events
for(let e in events) {
  let event = events[e];
  JobInvitation.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    JobInvitationEvents.emit(event + ':' + doc._id, doc);
    JobInvitationEvents.emit(event, doc);
    done(null);
  };
}

export default JobInvitationEvents;
