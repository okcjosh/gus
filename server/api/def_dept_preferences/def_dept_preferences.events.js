/**
 * DefDeptPreferences model events
 */

'use strict';

import {EventEmitter} from 'events';
var DefDeptPreferences = require('../../sqldb').DefDeptPreferences;
var DefDeptPreferencesEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
DefDeptPreferencesEvents.setMaxListeners(0);

// Model events
var events = {
  afterCreate: 'save',
  afterUpdate: 'save',
  afterDestroy: 'remove'
};

// Register the event emitter to the model events
for(var e in events) {
  let event = events[e];
  DefDeptPreferences.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    DefDeptPreferencesEvents.emit(event + ':' + doc._id, doc);
    DefDeptPreferencesEvents.emit(event, doc);
    done(null);
  };
}

export default DefDeptPreferencesEvents;
