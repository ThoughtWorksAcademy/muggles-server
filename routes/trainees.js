var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
var User = mongoose.model('User');
var Trainee = mongoose.model('Trainee');

var REGISTER_SUCCESS = '注册成功';
var Course = mongoose.model('Course');
var LocalStrategy = require('passport-local').Strategy;

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

  router.get('/:email', function (req, res, next) {

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
  });

  router.post('/', function (req, res, next) {

    var trainee = req.body;

    Trainee.create(trainee)
      .then(function (trainee) {

        res.send({state: 200, data: trainee, message: REGISTER_SUCCESS})
      })
      .onReject(function (err) {

        next(err);
      })
  });

  router.put('/:id/appraise', function(req, res, next) {
    console.log('add appraise');
    var appraise = req.body;

    res.send(appraise);
  });

  return router;
};
