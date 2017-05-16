'use strict';

let express = require('express');
let controller = require('./job_type.controller');

let router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/general_costs', controller.setGeneralCosts);
router.put('/:id', controller.update);
router.patch('/:id', controller.patch);
router.delete('/:id', controller.destroy);

module.exports = router;
