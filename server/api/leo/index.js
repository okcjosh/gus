'use strict';

let express = require('express');
let controller = require('./leo.controller');

let router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.get('/:id/events', controller.showCompatibleEvents);
router.post('/', controller.create);
router.put('/:id', controller.upsert);
router.patch('/:id', controller.patch);
router.delete('/:id', controller.destroy);

router.post('/login', controller.login);

module.exports = router;
