var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
var Checkpoint = mongoose.model('Checkpoint');
var User = require('../../public/model/user');

var _ = require('lodash');

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



  router.get('/course/checkpoints', function(req, res) {
    console.log('/user/course/checkpoints');
    //var CheckpointType = mongoose.model('CheckpointType');
    //var checkpointType = new CheckpointType();
    //checkpointType.name = '默认类型';
    //var checkpoint = new Checkpoint();
    //checkpoint.name = '牛顿第一定律';
    //checkpoint.type = checkpointType._id;
    //checkpoint.save(function(err) {
    //  if(err) {
    //    console.log('save checkpoint err' + err);
    //    throw err;
    //  }
    //});
    //
    //var checkpoint2 = new Checkpoint();
    //checkpoint2.type = checkpointType._id;
    //
    //checkpoint2.name = '牛顿第二定律';
    //checkpoint2.save(function(err) {
    //  if(err) {
    //    console.log('save checkpoint err' + err);
    //    throw err;
    //  }
    //});
    //
    //var checkpoint3 = new Checkpoint();
    //checkpoint3.name = '牛顿第三定律';
    //checkpoint3.type = checkpointType._id;
    //
    //checkpoint3.save(function(err) {
    //  if(err) {
    //    console.log('save checkpoint err' + err);
    //    throw err;
    //  }
    //});

    Checkpoint.find({}, function(err, checkpoints) {
      res.send(checkpoints);
    });
  });

  router.patch('/course/checkpoints', function(req, res) {
      _.forEach(req.body, function(checkpointId) {
        Checkpoint.findById(checkpointId, function(err, checkpoint) {
          if(err) console.log('修改失败');
          console.log(checkpoint);
          checkpoint.checked = true;

          checkpoint.save(function (err) {
            console.log('修改成功');
          });

        });
      });
  });

  return router;
};
