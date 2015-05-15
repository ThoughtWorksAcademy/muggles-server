'use strict';

var express = require('express');
var router = express.Router();

var session_controller = require('../controllers/session');

router.get('/', session_controller.get_current_name);

router.post('/create', session_controller.create);

router.delete('/destory', session_controller.destroy);

module.exports = router;
