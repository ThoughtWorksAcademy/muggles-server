var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TrainerSchema = new Schema({
  username: String,
  password: String,
  station: {type: String, default: '某一讲课地点：欧亚'},
  courses: [{
    course: {type: Schema.ObjectId, ref: 'Course'},
    trainer: {type: String, default: '待定义trainer'},
    sponsor: {type: String, default: '待定义sponsor'}
  }]
});

mongoose.model('trainer', TrainerSchema);
