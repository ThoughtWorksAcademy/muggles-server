var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TraineeSchema = new Schema({
  name: String,
  email: String,
  password: String,
  gender: String,
  create_date: Date,
  image: String,
  github: String,
  phone_number: String,
  current_group: {type: Schema.ObjectId, ref: "Group"},
  groups: [{type: Schema.ObjectId, ref: "Group"}],
  appraise: [{type: Schema.ObjectId, ref: "Appraise"}],
  courses: [{
    course: {type: Schema.ObjectId, ref: 'Course'},
    trainer: {type: Schema.ObjectId, ref: 'Trainer'},
    sponsor: {type: Schema.ObjectId, ref: 'Trainee'},
    result: [{checkpointId: String, traineeChecked: Boolean, trainerChecked: Boolean, display: Boolean}]
  }],
  station: {type: String, default: '某一讲课地点：欧亚'}
});

mongoose.model('Trainee', TraineeSchema);
