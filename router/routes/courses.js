var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Course = mongoose.model('Course');
var CheckpointType = mongoose.model('CheckpointType');
var Checkpoint = mongoose.model('Checkpoint');

module.exports = router;
