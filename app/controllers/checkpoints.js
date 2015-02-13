var mongoose = require('mongoose');
var Checkpoint = mongoose.model('Checkpoint');

exports.create = function(req, res) {
  var checkpoint = new Checkpoint();
  checkpoint.save(function (err) {
    if(err) {
      console.log('checkpoint 创建失败');
    }
    console.log('checkpoint 创建成功')
  })
};

exports.show = function(req, res) {
  var checkpoint = new Checkpoint();
  checkpoint.name = '牛顿第一定律';
  checkpoint.type = '牛顿三大定律';
  checkpoint.save(function(err) {
    if(err) {
      console.log('save checkpoint err' + err);
      throw err;
    }
  });

  Checkpoint.find({}, function(err, checkpoints) {
    res.send(checkpoints);
  });
};
