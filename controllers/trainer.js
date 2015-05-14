'use strict';

var _ = require('lodash');

var mongoose = require('mongoose');
var Trainee = mongoose.model('Trainee');
var Appraise = mongoose.model('Appraise');
var Group = mongoose.model('Group');
var Trainer = mongoose.model('Trainer');

var login = function (req, res) {
  var currentTrainerName = req.session.currentTrainerName;

  res.send(currentTrainerName);
};

var logout = function(req, res) {
    req.session.currentTrainerId = null;
    req.session.currentTrainerName = null;

    res.send({state: 200, data: {}});
};


module.exports = {
  login: login,
  logout: logout
};
