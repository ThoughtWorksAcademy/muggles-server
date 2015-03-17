var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
var User = mongoose.model('User');
var Trainee = mongoose.model('Trainee');
var Course = mongoose.model('Course');
var LocalStrategy = require('passport-local').Strategy;

module.exports = function (passport) {

  passport.use('trainee', new LocalStrategy(
    function (username, password, done) {
      process.nextTick(function () {

        Trainee.findOne({'username': username}, function (err, user) {
          console.log(user);

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

  router.get('/courses', function (req, res) {

  });


  router.post('/A', function (req, res) {
    var trainee = new Trainee();
    trainee.username = 'traineeA';
    trainee.password = 'TraineeA';
    trainee.save(function (err) {
      res.send('trainee 保存成功');
    });
  });

  router.post('/', function (req, res) {
    var trainee = new Trainee();
    trainee.username = 'trainee';
    trainee.password = 'trainee';
    Course.find({}, function (err, courses) {

      for (var i = 0; i < courses.length; i++) {
        trainee.courses.push({
          course: courses[i]._id,
          trainer: '550240fe573a3bf20a81ac66',
          sponsor: '5507c34d163d7e1da77dddd9',
          result: []
        });
      }

      trainee.save(function (err, trainee) {
        res.send('trainee 保存|成功');
      });
    });
  });

  router.get('/:id/courses/', function (req, res) {
    //var id = req.params.id;
    //Trainee.findById(id)
    //  .populate('courses')
    //  .exec(
    //  function (err, trainee) {
    //    console.log(trainee);
    //    res.send(trainee.courses)
    //  }
    //);

    Course.find({}, function (err, courses) {
      res.send(courses);
    })
  });
  return router;
};
