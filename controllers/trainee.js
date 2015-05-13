'use strict';

var _ = require('lodash');
var date_util = require('../utils/date-util');

var mongoose = require('mongoose');
var Trainee = mongoose.model('Trainee');
var Appraise = mongoose.model('Appraise');
var Group = mongoose.model('Group');
var Trainer = mongoose.model('Trainer');

var TRAINEE_EXISTED = '学生存在';
var REGISTER_SUCCESS = '注册成功';
var APPRAISE_ADD_SUCCESS = '添加评价成功';
var APPRAISED_ALREADY = '该学生评价已存在';

var get_trainee_by_id = function (req, res, next) {

  Trainee.findById(req.params.id)
    .populate('appraises')
    .populate('groups')
    .exec()
    .then(function (trainee) {
      return Group.populate(trainee, 'appraises.group');
    })
    .then(function (trainee) {
      return Trainer.populate(trainee, 'appraises.appraiser')
    })
    .then(function (trainee) {
      res.send({state: 200, data: trainee, message: TRAINEE_EXISTED})
    })
    .onReject(function (err) {

      next(err);
    })
};

var verify_trainee_by_email = function (req, res, next) {

  var email = req.params.email;
  Trainee.findOne({email: email})
    .exec()
    .then(function (trainee) {

      if (trainee) {
        res.send({state: 200, data: false, message: '邮箱可用'})
      } else {
        res.send({state: 200, data: true, message: '邮箱已被注册'})
      }
    })
    .onReject(function (err) {

      next(err);
    })
};

var create_trainee = function (req, res, next) {

  var trainee = req.body;

  Trainee.create(trainee)
    .then(function (trainee) {
      res.send({state: 200, data: trainee, message: REGISTER_SUCCESS})
    })
    .onReject(function (err) {

      next(err);
    })
};

var update_appraise = function(req, res, next) {

  var trainee_id = req.params.id;
  var current_appraise = req.body.appraise;

  Trainee.findById(trainee_id)
    .populate('appraises')
    .exec()
    .then(function(trainee) {

      return _.find(trainee.appraises, function(appraise) {

        var is_the_same_day = (date_util.format_date(appraise) === date_util.format_date(current_appraise));
        var is_the_same_group = (appraise.group.toString() === current_appraise.group);
        var is_the_same_type = (appraise.type === current_appraise.type);
        return is_the_same_day && is_the_same_group && is_the_same_type;
      });
    })
    .then(function(appraise) {

      return Appraise.findById(appraise.id).exec();
    })
    .then(function(appraise) {

      appraise.comment = current_appraise.comment;
      appraise.save();
      res.send({state: 200, data: appraise, message: '修改成功'})
    })
    .onReject(function(err) {
        next(err);
    });
};

var add_appraise = function(req, res, next) {

  var trainee_id = req.params.id;
  var current_appraise = req.body;

  current_appraise.appraiser = req.session.currentUserId;
  Trainee.findById(trainee_id)
    .populate('appraises')
    .exec()
    .then(function(trainee) {
      return _.find(trainee.appraises, function(appraise) {

        var is_the_same_day = (date_util.format_date(appraise) === date_util.format_date(current_appraise));
        var is_the_same_group = (appraise.group.toString() === current_appraise.group);
        var is_the_same_type = (appraise.type === current_appraise.type);
        return is_the_same_day && is_the_same_group && is_the_same_type;
      });
    })
    .then(function (result) {
      if (result) {

        res.send({state: 200, data: false, message: APPRAISED_ALREADY});
      } else {

        Appraise.create(current_appraise)
          .then(function (appraise) {
            Trainee.findById(trainee_id, function (err, trainee) {
              trainee.appraises.push(appraise._id);
              trainee.save();
              res.send({state: 200, data: trainee, message: APPRAISE_ADD_SUCCESS});
            })
          });
      }
    })
    .onReject(function (err) {
      next(err);
    });
};

var add_appraises = function (req, res, next) {
  var appraiser = req.session.currentUserId;
  var appraised_date = req.body.appraise.appraised_date;
  var type = req.body.appraise.type;
  var trainees = req.body.trainees;
  trainees.forEach(function (trainee) {
    trainee.appraise.appraised_date = appraised_date;
    trainee.appraise.type = type;
    trainee.appraise.appraiser = appraiser;

    Appraise.create(trainee.appraise)
      .then(function (appraise) {
        return Trainee.findById(trainee._id, function (err, trainee) {
          //TODO 根据type和date检查唯一性，即应该再次判断该学生是否已经添加了此种类型的当天评价
          trainee.appraises.push(appraise._id);
          trainee.save();
        })
      })
  });
  res.send({state: 200, data: trainees, message: APPRAISE_ADD_SUCCESS});
};

module.exports = {
  get_trainee_by_id: get_trainee_by_id,
  verify_trainee_by_email: verify_trainee_by_email,
  create_trainee: create_trainee,
  update_appraise: update_appraise,
  add_appraise: add_appraise,
  add_appraises: add_appraises
};
