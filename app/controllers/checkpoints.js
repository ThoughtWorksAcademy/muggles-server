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
  res.send(checkpoint);
};
