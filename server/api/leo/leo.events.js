/**
 * Leo model events
 */

'use strict';

import {EventEmitter} from 'events';
var Leo = require('../../sqldb').Leo;
var LeoEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
LeoEvents.setMaxListeners(0);

// Model events
var events = {
  afterCreate: 'save',
  afterUpdate: 'save',
  afterDestroy: 'remove'
};

// Register the event emitter to the model events
for(var e in events) {
  let event = events[e];
  Leo.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    LeoEvents.emit(event + ':' + doc._id, doc);
    LeoEvents.emit(event, doc);
    done(null);
  };
}

export default LeoEvents;
