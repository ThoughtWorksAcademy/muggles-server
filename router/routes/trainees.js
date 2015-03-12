var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
var User = mongoose.model('User');
var Trainee = mongoose.model('Trainee');
var Course = mongoose.model('Course');

var LocalStrategy = require('passport-local').Strategy;

module.exports = function (passport) {

  passport.use(new LocalStrategy(
    function (username, password, done) {
      process.nextTick(function () {

        User.findOne({'username': username}, function (err, user) {
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
    passport.authenticate('local', function (err, user, info) {
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


  router.post('/', function (req, res) {
    var trainee = new Trainee();
    trainee.username = 'main';
    trainee.password = 'main';
    trainee.courses.push('54f71933202e9233d4b1ec23');
    trainee.save();
  });


  router.get('/:id/courses/', function (req, res) {
    var id = req.params.id;
    User.findById(id)
      .populate('courses')
      .exec(
      function (err, user){
        console.log(user);
        res.send(user.courses)
      }
    ) ;
   });
  //username: String,
  //  password: String,
  //  courses: [{
  //  course: {type: Schema.ObjectId, ref: 'Course'},
  //  trainer: {type: String, default: '待定义trainer'},
  //  sponsor: {type: String, default: '待定义sponsor'}
  //}]
  return router;
};
