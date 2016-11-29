/**
 * Cocknball model events
 */

'use strict';

import {EventEmitter} from 'events';
var Cocknball = require('../../sqldb').Cocknball;
var CocknballEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
CocknballEvents.setMaxListeners(0);

// Model events
var events = {
  afterCreate: 'save',
  afterUpdate: 'save',
  afterDestroy: 'remove'
};

// Register the event emitter to the model events
for(var e in events) {
  let event = events[e];
  Cocknball.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    CocknballEvents.emit(event + ':' + doc._id, doc);
    CocknballEvents.emit(event, doc);
    done(null);
  };
}

export default CocknballEvents;
