var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Station = mongoose.model('Station');

router.post('/', function (req, res) {
  Station.create({
    name: '欧亚学院',
    courses: ['5501c04880d1550e545e14fc', '5501c08a048fe75454dd6d26', '5501c0ae0084557e54cebac5'],
    trainees: ['5501beeec2b53a7a526008ab', '5501bf0d41c18ca5521fc573']
  }, function (err, station) {
    res.send(station);
  });
});

module.exports = router;
