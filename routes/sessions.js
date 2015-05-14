'use strict';

var express = require('express');
var router = express.Router();
var trainer_controller = require('../controllers/trainer');

router.get('/', trainer_controller.login);
router.delete('/', trainer_controller.logout);

module.exports = router;
