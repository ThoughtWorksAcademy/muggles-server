var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TrainerSchema = new Schema({
  username: String,
  password: String,
  //stations: [{
  //  station: {type: Schema.ObjectId, ref: 'Station'},
  //  courses: [{type: Schema.ObjectId, ref: 'Course'}],
  //  trainees: [{type: Schema.ObjectId, ref: 'Trainee'}]
  //}]
  stations : [{type: Schema.ObjectId, ref: 'Station'}]

});

mongoose.model('Trainer', TrainerSchema);
