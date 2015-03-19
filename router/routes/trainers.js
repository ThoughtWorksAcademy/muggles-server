var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Station = mongoose.model('Station');
var Trainer = mongoose.model('Trainer');
var Trainee = mongoose.model('Trainee');
var LocalStrategy = require('passport-local').Strategy;

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

  router.post('/stations', function (req, res) {
    Station.create({
      name: '欧亚学院',
      courses: '需要填充的课程',
      students: '需要填充的学生列表'
    });
    res.send('success');
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

  router.post('/A', function (req, res) {
    var trainer = new Trainer();
    trainer.username = 'trainerA';
    trainer.password = 'trainerA';
    trainer.save(function (err) {
      res.send('Trainer 保存成功');
    });
  });


  router.post('/', function (req, res) {
    var trainer = new Trainer();
    trainer.username = 'test';
    trainer.password = 'test';
    Station.find({}, function (err, stations) {
      for (var i = 0; i < stations.length; i++) {
        trainer.stations.push(stations[i]._id);
      }

      trainer.save(function (err) {
        res.send('Trainer 保存成功');
      });
    });

  });
  return router;
};
