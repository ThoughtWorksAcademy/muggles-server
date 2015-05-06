'use strict';

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Trainee = mongoose.model('Trainee');

router.get('/trainees', function (req, res, next) {
  Trainee.find({}, function (err, trainees) {
    if(err) {next(err)}

    res.send(trainees);
  });
});

module.exports = router;
