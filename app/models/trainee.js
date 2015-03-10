var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TraineeSchema = new Schema({
  username: String,
  password: String,
  courses: [{
    course: {type: Schema.ObjectId, ref: 'Course'},
    trainer: {type: String, default: '待定义trainer'},
    sponsor: {type: String, default: '待定义sponsor'}
  }]
});

mongoose.model('Trainee', TraineeSchema);
