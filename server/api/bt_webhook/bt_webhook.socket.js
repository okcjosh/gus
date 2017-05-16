/**
 * Broadcast updates to client when the model changes
 */

'use strict';

import BtWebhookEvents from './bt_webhook.events';

// Model events to emit
let events = ['save', 'remove'];

export function register(socket) {
  // Bind model events to socket events
  for(let i = 0, eventsLength = events.length; i < eventsLength; i++) {
    let event = events[i];
    let listener = createListener(`btWebhook:${event}`, socket);

    BtWebhookEvents.on(event, listener);
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
    BtWebhookEvents.removeListener(event, listener);
  };
}
