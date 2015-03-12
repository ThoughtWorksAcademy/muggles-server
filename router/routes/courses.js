var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Course = mongoose.model('Course');
var CheckpointType = mongoose.model('CheckpointType');
var Checkpoint = mongoose.model('Checkpoint');


router.post('/', function (req, res) {
  var course = new Course();
  course.name = '面向对象checkpoints';

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

  res.send(course);

});

module.exports = router;
