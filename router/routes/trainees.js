var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
var User = mongoose.model('User');
var LocalStrategy = require('passport-local').Strategy;

module.exports = function (passport) {

  passport.use(new LocalStrategy(
    function(username, password, done) {
      process.nextTick(function () {

        User.findOne({'username': username}, function(err, user) {
          if (err) { return done(err); }
          if (!user) { return done(null, false, { message: 'Unknown user ' + username }); }
          if (user.password != password) { return done(null, false, { message: 'Invalid password' }); }
          return done(null, user);
        })
      });
    }
  ));

  router.post('/login', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
      if (err) { return next(err) }

      if (!user) {
        return res.status(401).send(info.message);
      }

      req.logIn(user, function(err) {
        if (err) { return next(err); }
        return res.send(user);
      });

    })(req, res, next);
  });

  router.get('/courses', function (req, res) {

  });

  return router;
};
