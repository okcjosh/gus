/**
 * SeniorityClass model events
 */

'use strict';

import {EventEmitter} from 'events';
var SeniorityClass = require('../../sqldb').SeniorityClass;
var SeniorityClassEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
SeniorityClassEvents.setMaxListeners(0);

// Model events
var events = {
  afterCreate: 'save',
  afterUpdate: 'save',
  afterDestroy: 'remove'
};

// Register the event emitter to the model events
for(var e in events) {
  let event = events[e];
  SeniorityClass.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    SeniorityClassEvents.emit(event + ':' + doc._id, doc);
    SeniorityClassEvents.emit(event, doc);
    done(null);
  };
}

export default SeniorityClassEvents;
