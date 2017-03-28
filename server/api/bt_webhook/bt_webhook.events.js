/**
 * BtWebhook model events
 */

'use strict';

import {EventEmitter} from 'events';
var BtWebhook = require('../../sqldb').BtWebhook;
var BtWebhookEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
BtWebhookEvents.setMaxListeners(0);

// Model events
var events = {
  afterCreate: 'save',
  afterUpdate: 'save',
  afterDestroy: 'remove'
};

// Register the event emitter to the model events
function registerEvents(BtWebhook) {
  for(var e in events) {
    let event = events[e];
    BtWebhook.hook(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function(doc, options, done) {
    BtWebhookEvents.emit(event + ':' + doc._id, doc);
    BtWebhookEvents.emit(event, doc);
    done(null);
  };
}

registerEvents(BtWebhook);
export default BtWebhookEvents;
