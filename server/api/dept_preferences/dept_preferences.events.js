/**
 * DeptPreferences model events
 */

'use strict';

import {EventEmitter} from 'events';
var DeptPreferences = require('../../sqldb').DeptPreferences;
var DeptPreferencesEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
DeptPreferencesEvents.setMaxListeners(0);

// Model events
var events = {
  afterCreate: 'save',
  afterUpdate: 'save',
  afterDestroy: 'remove'
};

// Register the event emitter to the model events
for(var e in events) {
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
