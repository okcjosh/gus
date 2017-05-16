/**
 * DeptPreferences model events
 */

'use strict';

import {EventEmitter} from 'events';
let DeptPreferences = require('../../sqldb').DeptPreferences;
let DeptPreferencesEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
DeptPreferencesEvents.setMaxListeners(0);

// Model events
let events = {
  afterCreate: 'save',
  afterUpdate: 'save',
  afterDestroy: 'remove'
};

// Register the event emitter to the model events
for(let e in events) {
  let event = events[e];
  DeptPreferences.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    DeptPreferencesEvents.emit(event + ':' + doc._id, doc);
    DeptPreferencesEvents.emit(event, doc);
    done(null);
  };
}

export default DeptPreferencesEvents;
