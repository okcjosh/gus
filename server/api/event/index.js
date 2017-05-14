'use strict';

var express = require('express');
var controller = require('./event.controller');
import * as auth from '../../auth/auth.service';

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.get('/:id/leos_invite', controller.leosForEvent);
router.post('/:id/complete', controller.completeEventPayment);
router.get('/:id/cost', controller.getEventCost);
router.get('/:id/status/:status_id', controller.showByStatus);
// router.get('/:id/status_id', controller.getStatus);
router.post('/', auth.isAuthenticated(), controller.create);
router.get('/approve/:_id', controller.approve);
router.put('/:id', controller.upsert);
router.patch('/:id', controller.patch);
router.put('/:event_id/interest/:leo_id', controller.expressInterest);
router.delete('/:id', controller.destroy);

module.exports = router;
