'use strict';

var express = require('express');
var router = express.Router();

var invitation_code_controller = require('../controllers/invitation-codes');

router.get('/:content', invitation_code_controller.get_invitation_by_content);

module.exports = router;
