'use strict';

var express = require('express');
var controller = require('./event.controller');
import * as auth from '../../auth/auth.service';

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.get('/:id/cost', controller.getEventCost);
router.get('/status/:status_id', controller.showByStatus);
router.post('/', auth.isAuthenticated(), controller.create);
router.put('/:id', controller.upsert);
router.patch('/:id', controller.patch);
router.delete('/:id', controller.destroy);

module.exports = router;
