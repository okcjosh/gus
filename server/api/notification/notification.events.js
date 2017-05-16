/**
 * Notification model events
 */

'use strict';

import {EventEmitter} from 'events';
let Notification = require('../../sqldb').Notification;
let NotificationEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
NotificationEvents.setMaxListeners(0);

// Model events
let events = {
  afterCreate: 'save',
  afterUpdate: 'save',
  afterDestroy: 'remove'
};

// Register the event emitter to the model events
for(let e in events) {
  let event = events[e];
  Notification.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    NotificationEvents.emit(event + ':' + doc._id, doc);
    NotificationEvents.emit(event, doc);
    done(null);
  };
}

export default NotificationEvents;
