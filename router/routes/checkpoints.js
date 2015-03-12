var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var CheckpointType = mongoose.model('CheckpointType');
var Checkpoint = mongoose.model('Checkpoint');

router.post('/', function (req, res) {

  var checkpointType = new CheckpointType();
  checkpointType.name = '牛顿三大定律';

  checkpointType.save();

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

  res.send('checkpoints 保存成功');

});

module.exports = router;
