var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Station = mongoose.model('Station');

router.get('/stations', function (req, res) {

  Station.find({}, function(err, stations) {
    res.send(stations);
  });
});

router.post('/stations', function (req, res) {
  Station.create({
    name: '欧亚学院',
    courses: '需要填充的课程',
    students: '需要填充的学生列表'
  });
  res.send('success');
});

router.get('/stations/courses', function (req, res) {
  res.send('success');
});

router.get('/stations/students', function (req, res) {
  res.send('success');
});

module.exports = router;
