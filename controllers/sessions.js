'use strict';

var _ = require('lodash');
var mongoose = require('mongoose');
var Trainer = mongoose.model('Trainer');

var LOGIN_FAILURE = '邮箱或密码错误';
var LOGIN_SUCCESS = '登录成功';
var LOGOUT_SUCCESS = '退出成功';

var get_current_trainer_name = function (req, res) {
  var currentTrainerName = req.session.currentTrainerName;

  res.send({state: 200, data: currentTrainerName, message: ''});
};

var login = function(req, res, next) {
  var email = req.body.user.email;
  var password = req.body.user.password;
  var session = req.session;

  Trainer.findOne({email: email})
    .exec()
    .then(function (user) {
      if (!user || user.password !== password) {
        return res.send({state: 401, data: true, message: LOGIN_FAILURE});
      }

      session.currentTrainerId = user._id;
      session.currentTrainerName = user.username;

      res.send({state: 200, data: false, message: LOGIN_SUCCESS});
    })
    .onReject(function (err) {

      next(err);
    })
};

var logout = function(req, res) {
  req.session.currentTrainerId = null;
  req.session.currentTrainerName = null;

  res.send({state: 200, data: {}, message: LOGOUT_SUCCESS});
};

module.exports = {
  get_current_trainer_name: get_current_trainer_name,
  login: login,
  logout: logout
};
