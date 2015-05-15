'use strict';

var LOGIN_FAILURE = '邮箱或密码错误';
var LOGIN_SUCCESS = '登录成功';
var LOGOUT_SUCCESS = '退出成功';

var mongoose = require('mongoose');
var Trainer = mongoose.model('Trainer');

var get_current_name = function(req, res) {
  var currentTrainerName = req.session.currentTrainerName;

  res.send(currentTrainerName);
};

var create = function(req, res, next) {
  var email = req.body.user.email;
  var password = req.body.user.password;
  var session = req.session;

  Trainer.findOne({email: email})
    .exec()
    .then(function(user) {
      if(! user || user.password !== password) {
        return res.send({state: 401, data: true, message: LOGIN_FAILURE});
      }

      session.currentTrainerId = user._id;
      session.currentTrainerName = user.username;

      res.send({state: 200, data: false, message: LOGIN_SUCCESS});
    })
    .onReject(function(err) {

      next(err);
    })
};

var destroy = function(req, res) {
  req.session.currentTrainerId = null;
  req.session.currentTrainerName = null;

  res.send({state: 200, data: {}, message: LOGOUT_SUCCESS});
};

module.exports = {
  get_current_name: get_current_name,
  create: create,
  destroy: destroy
};

