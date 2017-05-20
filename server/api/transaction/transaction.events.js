/**
 * Transaction model events
 */

'use strict';

import {EventEmitter} from 'events';
let Transaction = require('../../sqldb').Transaction;
let TransactionEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
TransactionEvents.setMaxListeners(0);

// Model events
let events = {
  afterCreate: 'save',
  afterUpdate: 'save',
  afterDestroy: 'remove'
};

// Register the event emitter to the model events
for(let e in events) {
  let event = events[e];
  Transaction.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    TransactionEvents.emit(`${event}:${doc._id}`, doc);
    TransactionEvents.emit(event, doc);
    done(null);
  };
}

export default TransactionEvents;
