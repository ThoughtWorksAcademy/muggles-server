var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
var Checkpoint = mongoose.model('Checkpoint');
var Course = mongoose.model('Course');
var User = mongoose.model('User');
var Station = mongoose.model('Station');
var _ = require('lodash');

module.exports = function (passport) {

  router.post('/course/checkpoints', function () {
    var CheckpointType = mongoose.model('CheckpointType');
    var checkpointType = new CheckpointType();
    checkpointType.name = '默认类型';
    var checkpoint = new Checkpoint();
    checkpoint.name = '牛顿第一定律';
    checkpoint.type = checkpointType._id;
    checkpoint.save(function (err) {
      if (err) {
        console.log('save checkpoint err' + err);
        throw err;
      }
    });

    var checkpoint2 = new Checkpoint();
    checkpoint2.type = checkpointType._id;

    checkpoint2.name = '牛顿第二定律';
    checkpoint2.save(function (err) {
      if (err) {
        console.log('save checkpoint err' + err);
        throw err;
      }
    });

    var checkpoint3 = new Checkpoint();
    checkpoint3.name = '牛顿第三定律';
    checkpoint3.type = checkpointType._id;

    checkpoint3.save(function (err) {
      if (err) {
        console.log('save checkpoint err' + err);
        throw err;
      }
    });
  });

  router.get('/course/checkpoints', function (req, res) {
    Checkpoint.find({}, function (err, checkpoints) {
      res.send(checkpoints);
    });
  });



  router.get('/courses', function (req, res) {
    Course.find({}, function (err, courses) {
      res.send(courses);
    })
  });

  router.get('/courses/:id', function (req, res) {
    Course.findById(req.params.id)
      .populate('checkpoints')
      .exec(
      function (err, course) {

        res.send(course);
      }
    );
  });

  router.patch('/course/checkpoints/:id', function (req, res) {
    console.log('/course/checkpoints/:id');
    var checked = req.body.checked;
    var id = req.params.id;
    Checkpoint.findById(id, function (err, checkpoint) {
      if (err) throw err;

      checkpoint.checked = checked;
      console.log(checkpoint);
      checkpoint.save(function (err) {
        if (err) {
          throw err;
        }
      });
    });
  });

  router.post('/', function (req, res) {
    var user = new User();
    user.username = 'trainee';
    user.password = 'trainee';
    user.courses.push('5501c0ae0084557e54cebac5');
    user.courses.push('5501c0c6fd7cfaa2544efb05');
    user.type = 'trainer';
    user.save(function () {
      res.send('保存成功');
    });
  });
  return router;
};
