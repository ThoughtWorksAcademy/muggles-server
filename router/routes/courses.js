var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Course = mongoose.model('Course');
var CheckpointType = mongoose.model('CheckpointType');
var Checkpoint = mongoose.model('Checkpoint');


router.post('/', function (req, res) {
  var course = new Course();
  course.name = '面向对象';

  Checkpoint.find({}, function (err, checkpoints) {
    for (var i = 0; i < checkpoints.length; i++) {
      console.log(checkpoints[i]);
      course.checkpoints.push(checkpoints[i]._id);
    }


    course.save(function (err) {
      if (err) {
        throw err;
      }
    });

    res.send('course 存储成功');
  });


});

module.exports = router;
