'use strict';

var express = require('express');
var router = express.Router();
var _ = require('lodash');

var mongoose = require('mongoose');
var Trainee = mongoose.model('Trainee');

router.get('/:id/trainees', function (req, res, next) {
  var groupId = req.params.id;
  Trainee.find({}, function (err, trainees) {
    var currentTrainerName = req.session.currentTrainerName;
    if(err) {next(err)}
    var result = [];
    trainees.forEach(function (trainee) {
      if(_.contains(trainee.group, groupId)) {
          result.push(trainee);
      }
    });

    res.send({trainees: trainees,currentTrainerName: currentTrainerName});
  });
});

module.exports = router;
