'use strict';

var express = require('express');
var router = express.Router();

router.get('/',function(req,res) {
  var currentTrainerName = req.session.currentTrainerName;

  res.send(currentTrainerName);
});

router.delete('/',function(req, res) {
  req.session.currentTrainerId = null;
  req.session.currentTrainerName = null;

  res.send({state: 200, data: {}});
});

module.exports = router;
