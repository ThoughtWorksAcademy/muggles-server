'use strict';

var express = require('express');
var router = express.Router();

var session_controller = require('../controllers/sessions');

router.get('/', session_controller.get_current_trainer_name);

router.post('/create', session_controller.create);

router.delete('/destroy', session_controller.destroy);

module.exports = router;
