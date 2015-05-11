'use strict';

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

var REGISTER_SUCCESS = '注册成功';

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

  router.get('/:id', function(req, res, next) {

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

        res.send({state: 200, data: trainee, message: ''})
      })
      .onReject(function(err) {

        next(err);
      })
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

  router.get('/verification/:email', function (req, res, next) {

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

  router.post('/:id/appraise', function(req, res, next) {

    var trainee_id = req.params.id;
    var appraised = req.body.appraise;

    Trainee.findById(trainee_id)
      .populate('appraises')
      .exec()
      .then(function(trainee) {

        return trainee.appraises.find(function(appraise) {
          return appraise.appraised_date === appraised_date
        })
      })
      .then(function(has_appraised) {

        if(has-appraised)
        res.send({state: 200, data: trainee, message: ''})
      })
      .onReject(function(err) {

        next(err);
      })
  });

  router.put('/:id/appraise', function (req, res, next) {

    var trainee_id = req.params.id;
    var appraise = req.body;

    appraise.appraiser = req.session.currentUserId;
    Appraise.create(appraise)
      .then(function (appraise) {

        return Trainee.findById(trainee_id)
          .populate('appraises')
          .exec(function (err, trainee) {

            trainee.appraises.push(appraise._id);
            trainee.save();
        });
      })
      .then(function(trainee) {

        return Group.populate(trainee, 'appraises.group');
      })
      .then(function(trainee) {

        return Trainer.populate(trainee, 'appraises.appraiser')
      })
      .then(function(trainee) {

        res.send({state: 200, data: trainee, message: ''})
      })
      .onReject(function (err) {
        next(err);
      });
  });
  return router;
};
