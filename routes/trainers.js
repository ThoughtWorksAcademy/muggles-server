'use strict';

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Station = mongoose.model('Station');
var Trainer = mongoose.model('Trainer');
var Trainee = mongoose.model('Trainee');
var LocalStrategy = require('passport-local').Strategy;
var _ = require('lodash');

var LOGIN_FAILURE = '邮箱或密码错误';
var LOGIN_SUCCESS = '登录成功';
var LOGOUT_SUCCESS = '退出成功';

module.exports = function (passport) {

  passport.use('trainer', new LocalStrategy(
    function (username, password, done) {
      process.nextTick(function () {

        Trainer.findOne({'username': username}, function (err, user) {
          if (err) {
            return done(err);
          }
          if (!user) {
            return done(null, false, {message: '无法找到用户: ' + username});
          }
          if (user.password != password) {
            return done(null, false, {message: '密码错误'});
          }
          return done(null, user);
        })
      });
    }
  ));

  router.post('/login', function (req, res, next) {
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
  });



  router.post('/login', function (req, res, next) {
    passport.authenticate('trainer', function (err, user, info) {
      if (err) {
        return next(err)
      }

      if (!user) {
        return res.status(401).send(info.message);
      }

      req.logIn(user, function (err) {
        if (err) {
          return next(err);
        }
        return res.send(user);
      });

    })(req, res, next);
  });

  router.get('/:userId/stations', function (req, res) {
    var userId = req.params.userId;
    Trainer.findById(userId)
      .populate('stations')
      .exec(function (err, trainer) {
        res.send(trainer.stations);
      });
  });

  router.get('/stations/:id/courses', function (req, res) {
    var id = req.params.id;
    Station.findById(id)
      .populate('courses')
      .exec(function (err, station) {
        res.send(station.courses);
      });
  });

  router.get('/stations/:id/trainees', function (req, res) {
    var id = req.params.id;
    Station.findById(id)
      .populate('trainees')
      .exec(function (err, station) {
        res.send(station.trainees);
      });
  });

  router.patch('/users/:userId/course/:courseId/checkpoints/:id', function (req, res) {
    var userId = req.params.userId;
    var checked = req.body.checked;
    var id = req.params.id;
    var courseId = req.params.courseId;

    Trainee.findById(userId)
      .populate('courses.course')
      .populate('courses.trainer', 'username')
      .populate('courses.sponsor', 'username')
      .exec(function (err, trainee) {
        _.forEach(trainee.courses, function (course, index) {
          if (course.course._id == courseId) {
            handleCheckpoints(trainee, index, id, checked);
          }
        })
      });

    function handleCheckpoints(trainee, courseIndex, checkpointId, trainerChecked) {
      var course = trainee.courses[courseIndex];
      var checkpointIndex = _.findIndex(course.result, {checkpointId: checkpointId});

      if (checkpointIndex !== -1) {
        course.result[checkpointIndex].trainerChecked = trainerChecked;
        var result = course.result[checkpointIndex];
        course.result[checkpointIndex].display = result.trainerChecked && result.traineeChecked;
      }

      else {
        course.result.push({
          checkpointId: checkpointId,
          traineeChecked: false,
          trainerChecked: trainerChecked,
          display: false
        })
      }

      trainee.courses[courseIndex] = course;
      trainee.save(function (err, trainee) {
        return trainee;
      });
    }
  });

  return router;
};
