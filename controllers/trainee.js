'use strict';

var mongoose = require('mongoose');
var Trainee = mongoose.model('Trainee');
var Appraise = mongoose.model('Appraise');
var Group = mongoose.model('Group');
var Trainer = mongoose.model('Trainer');

var TRAINEE_EXISTED = '学生存在';

var get_trainee_by_id = function(req, res, next) {

  Trainee.findById(req.params.id)
    .populate('appraises')
    .populate('groups')
    .exec()
    .then(function(trainee) {

      return Group.populate(trainee, 'appraises.group');
    })
    .then(function(trainee) {

      return Trainer.populate(trainee, 'appraises.appraiser')
    })
    .then(function(trainee) {

      res.send({state: 200, data: trainee, message: TRAINEE_EXISTED})
    })
    .onReject(function(err) {

      next(err);
    })
};

module.exports = {
  get_trainee_by_id: get_trainee_by_id
};
