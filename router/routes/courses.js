var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Course = mongoose.model('Course');

router.get('/:id/trainees', function (req, res) {
  var id = req.params.id;
  Course.find({}, function (){

  });
});

module.exports = router;
