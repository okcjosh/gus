/**
 * JobTypePreference model events
 */

'use strict';

import {EventEmitter} from 'events';
var JobTypePreference = require('../../sqldb').JobTypePreference;
var JobTypePreferenceEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
JobTypePreferenceEvents.setMaxListeners(0);

// Model events
var events = {
  afterCreate: 'save',
  afterUpdate: 'save',
  afterDestroy: 'remove'
};

// Register the event emitter to the model events
for(var e in events) {
  let event = events[e];
  JobTypePreference.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    JobTypePreferenceEvents.emit(event + ':' + doc._id, doc);
    JobTypePreferenceEvents.emit(event, doc);
    done(null);
  };
}

export default JobTypePreferenceEvents;
