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

  router.post('/courses', function () {
    var course = new Course();
    course.name = '面向对象checkpoints';
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

    course.checkpoints.push(checkpoint);
    course.checkpoints.push(checkpoint2);
    course.checkpoints.push(checkpoint3);


    course.save(function (err) {
      if (err) {
        throw err;
      }
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

  router.post('/stations', function(req, res) {
    var station = new Station();
    station.name = '欧亚学院';
    station.courses.push('54f71933202e9233d4b1ec23');
    station.trainees.push('54ff9e16effd71330c5500da');
    station.trainees.push('54ff9e1feffd71330c5500db');
    station.save(function() {
      res.send('保存成功');
    });

  });

  router.post('/', function (req, res) {
    var user = new User();
    user.username = 'taylor';
    user.password = 'taylor';
    user.courses.push('54f71933202e9233d4b1ec23');
    user.save(function () {
      res.send('保存成功');
    });
  });
  return router;
};
