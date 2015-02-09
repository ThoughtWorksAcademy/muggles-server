var express = require('express');
var router = express.Router();
var User = require('../../public/model/user');

module.exports = function(passport){

  router.post('/login', passport.authenticate('login', {
    successRedirect: '/views/course',
    failureRedirect: '/views/courses.html',
    failureFlash: true
  }));

  router.post('/signup', passport.authenticate('signup', {
    successRedirect: '/views/courses.html',
    failureRedirect: '/views/courses.html',
    failureFlash : true
  }));
  return router;
};
