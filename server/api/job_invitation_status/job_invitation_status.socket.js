/**
 * Broadcast updates to client when the model changes
 */

'use strict';

import JobInvitationStatusEvents from './job_invitation_status.events';

// Model events to emit
let events = ['save', 'remove'];

export function register(socket) {
  // Bind model events to socket events
  for(let i = 0, eventsLength = events.length; i < eventsLength; i++) {
    let event = events[i];
    let listener = createListener(`jobInvitationStatus:${event}`, socket);

    JobInvitationStatusEvents.on(event, listener);
    socket.on('disconnect', removeListener(event, listener));
  }
}


function createListener(event, socket) {
  return function(doc) {
    socket.emit(event, doc);
  };
}

function removeListener(event, listener) {
  return function() {
    JobInvitationStatusEvents.removeListener(event, listener);
  };
}
