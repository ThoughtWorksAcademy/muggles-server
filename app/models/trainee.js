var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TraineeSchema = new Schema({
  username: String,
  password: String,
  courses: [{
    course: {type: Schema.ObjectId, ref: 'Course'},
    trainer: {type: Schema.ObjectId, ref: 'Trainer'},
    sponsor: {type: Schema.ObjectId, ref: 'Trainer'},
    result: [{checkpointId: String, traineeChecked: Boolean, trainerChecked: Boolean}]
  }],
  station: {type: String, default: '某一讲课地点：欧亚'}
});

mongoose.model('Trainee', TraineeSchema);
