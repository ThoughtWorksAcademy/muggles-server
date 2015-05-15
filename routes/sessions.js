'use strict';

var express = require('express');
var router = express.Router();

var session_controller = require('../controllers/session');

router.get('/', session_controller.get_trainee_name);
router.post('/login', session_controller.login);
router.delete('/', session_controller.logout);

module.exports = router;
