var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TraineeSchema = new Schema({
  username: String,
  email: String,
  password: String,
  gender: String,
  create_date: {type: Date, default: Date.now},
  image: String,
  github: String,
  phone_number: String,
  current_group: {type: Schema.ObjectId, ref: 'Group'},
  groups: [{type: Schema.ObjectId, ref: 'Group'}],
  appraises: [{type: Schema.ObjectId, ref: 'Appraise'}],
  courses: [{//之前的
    course: {type: Schema.ObjectId, ref: 'Course'},
    trainer: {type: Schema.ObjectId, ref: 'Trainer'},
    sponsor: {type: Schema.ObjectId, ref: 'Trainee'},
    result: [{checkpointId: String, traineeChecked: Boolean, trainerChecked: Boolean, display: Boolean}]
  }],
  station: {type: String, default: '某一讲课地点：欧亚'}//之前的
});

mongoose.model('Trainee', TraineeSchema);
