var express = require('express');
var router = express.Router();




module.exports = function(passport){

  router.post('/', passport.authenticate('login', {
    successRedirect: '/home',
    failureRedirect: '/',
    failureFlash: true
  }));

  return router;
};
