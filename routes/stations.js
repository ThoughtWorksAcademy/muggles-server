var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Station = mongoose.model('Station');
var Course = mongoose.model('Course');
var Trainee = mongoose.model('Trainee');

module.exports = router;
