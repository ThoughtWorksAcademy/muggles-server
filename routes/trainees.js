'use strict';
var _ = require('lodash');
var moment = require('moment');
var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
var LocalStrategy = require('passport-local').Strategy;

var User = mongoose.model('User');
var Trainee = mongoose.model('Trainee');
var Appraise = mongoose.model('Appraise');
var Group = mongoose.model('Group');
var Trainer = mongoose.model('Trainer');
var Course = mongoose.model('Course');

var trainee_controller = require('../controllers/trainee');

var APPRAISE_ADD_SUCCESS = '添加评价成功';
var APPRAISED_ALREADY = '此学生该条评价已存在';


module.exports = function (passport) {

  passport.use('trainee', new LocalStrategy(
    function (username, password, done) {
      process.nextTick(function () {

        Trainee.findOne({'username': username}, function (err, user) {
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
    passport.authenticate('trainee', function (err, user, info) {
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

  router.get('/', function (req, res) {
    Trainee.find({}, function (err, trainees) {
      res.send(trainees);
    });
  });

  router.get('/:id/courses/', function (req, res) {

    Trainee.findById(req.params.id)
      .populate('courses.course')
      .populate('courses.trainer', 'username')
      .populate('courses.sponsor', 'username')
      .exec(function (err, trainee) {
        res.send(trainee.courses);
      });
  });

  router.get('/:id', trainee_controller.get_trainee_by_id);
  router.get('/verification/:email', trainee_controller.verify_trainee_by_email);
  router.post('/', trainee_controller.create_trainee);
  router.post('/:id/appraise', trainee_controller.has_appraised);
  router.put('/:id/appraise', trainee_controller.update_appraises_by_id);

  router.put('/appraises', function (req, res, next) {
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
  });

  return router;
};
