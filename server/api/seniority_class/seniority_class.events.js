/**
 * SeniorityClass model events
 */

'use strict';

import {EventEmitter} from 'events';
let SeniorityClass = require('../../sqldb').SeniorityClass;
let SeniorityClassEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
SeniorityClassEvents.setMaxListeners(0);

// Model events
let events = {
  afterCreate: 'save',
  afterUpdate: 'save',
  afterDestroy: 'remove'
};

// Register the event emitter to the model events
for(let e in events) {
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
