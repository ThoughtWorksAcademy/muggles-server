var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TrainerSchema = new Schema({
  username: String,
  password: String,
  station: {type: String, default: '某一讲课地点：欧亚'}
});

mongoose.model('trainer', TrainerSchema);
