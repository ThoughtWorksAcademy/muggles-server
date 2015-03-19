var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Station = mongoose.model('Station');
var Course = mongoose.model('Course');
var Trainee = mongoose.model('Trainee');

router.post('/', function (req, res) {
  var station = new Station();
  station.name = '西安理工大学';

  Course.find({}, function (err, courses) {
    for (var i = 0; i < courses.length; i++) {
      station.courses.push(courses[i]._id);
    }

    Trainee.find({}, function (err, trainees) {
      for (var i = 0; i < trainees.length; i++) {
        station.trainees.push(trainees[i]._id);
      }
      station.save(function (err, station) {
        res.send('station 保存成功');
      });
    })
  });
});

router.post('/id', function (req, res) {
  var id = req.params.id;
  Station.findById(id, function (err, station) {
    station.courses = [];
  })
});

module.exports = router;
