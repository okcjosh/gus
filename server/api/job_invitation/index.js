'use strict';

let express = require('express');
let controller = require('./job_invitation.controller');

let router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/:event_id', controller.create);
router.put('/:id', controller.upsert);
router.patch('/:id', controller.patch);
router.delete('/:id', controller.destroy);

module.exports = router;
