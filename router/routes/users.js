var express = require('express');
var router = express.Router();
var User = require('../../public/model/user');
var Checkpoint = require('../../public/model/checkpoint');

module.exports = function(passport){

  router.post('/login', passport.authenticate('login', {
    successRedirect: '/views/course',
    failureRedirect: '/views/courses.html',
    failureFlash: true
  }));

  //router.post('/signup',
  //  passport.authenticate('signup'),
  //
  //  function(req, res) {
  //
  //      var result = {
  //        massage: 'signup success',
  //        redirect: 'views/courses.html',
  //        data: ''
  //      };
  //      res.send(result);
  //
  //    console.log('注册成功');
  //  });


  router.post('/signup', function(req, res) {
    var username = req.body.username;
    var password = req.body.password;

    var massage = '';
    var redirect = '';
    User.findOne({ 'username' :  username }, function(err, user) {
      if (err){
        massage = '注册错误' + err;
        console.log('Error in SignUp: '+err);
        res.send(massage);
      }

      if (user) {
        massage = '用户已存在' + username;
        console.log('User already exists with username: '+username);
        res.send(massage);
      } else {
        var newUser = new User();

        newUser.username = username;
        newUser.password = password;

        newUser.save(function(err) {
          if (err){
            massage = '保存用户错误' + err;
            console.log('Error in Saving user: '+err);
            throw err;
          }
          massage = '用户注册成功';
          redirect = 'views/courses.html';
          result = {massage: massage, redirect: redirect};
          console.log('User Registration succesful');
          res.send(result);
        });
      }
    });
  });



  router.get('/user/course/checkpoints', function(req, res) {

  });

  return router;
};
