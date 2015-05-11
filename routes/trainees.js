var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
var LocalStrategy = require('passport-local').Strategy;

var User = mongoose.model('User');
var Trainee = mongoose.model('Trainee');
var Course = mongoose.model('Course');
var Appraise = mongoose.model('Appraise');

var REGISTER_SUCCESS = '注册成功';
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

  router.put('/:id/appraise', function (req, res, next) {
    var userId = req.params.id;
    var appraise = req.body;

    var have_appraised = false;
    Trainee.findById(userId)
      .populate('appraises')
      .exec()
      .then(function (trainee) {
        trainee.appraises.forEach(function (one) {
          if (one.type === appraise.type && one.date === appraise.date) {
            have_appraised = true;
          }
        });
      })
      .onReject(function (err) {
        next(err);
      });

    if (have_appraised) {
      res.send({state: 200, data: {}, message: APPRAISED_ALREADY});
      return;
    }

    Appraise.create(appraise)
      .then(function (appraise_entity) {
        return Trainee.findById(userId, function (err, trainee) {
          trainee.appraises.push(appraise_entity._id);
          trainee.save();
          res.send({state: 200, data: trainee, message: APPRAISE_ADD_SUCCESS});
        });
      })
      .onReject(function (err) {
        next(err);
      });
  });

  router.put('/appraises', function (req, res, next) {
    var trainees = req.body;
    trainees.forEach(function (trainee) {
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
