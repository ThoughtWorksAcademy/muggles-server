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

router.get('/stations/:id/courses', function (req, res) {
  var id = req.params.id;
  Station.findById(id)
    .populate('courses')
    .exec(function (err, station) {
      res.send(station.courses);
    });
});

router.get('/stations/:id/trainees', function (req, res) {
  var id = req.params.id;
  Station.findById(id)
    .populate('trainees')
    .exec(function (err, station) {
      console.log(station.trainees);
      res.send(station.trainees);
    });
});

module.exports = router;
