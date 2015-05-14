'use strict';

var express = require('express');
var router = express.Router();

var invitation_code_controller = require('../controllers/invitation-code');

router.get('/:content', invitation_code_controller.get_invitations);

module.exports = router;
