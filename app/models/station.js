var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var StationSchema = new Schema({
  name: String,
  courses: [{type: Schema.ObjectId, ref: 'Course'}],
  trainees: [{type: Schema.ObjectId, ref: 'User'}]
});

mongoose.model('Station', StationSchema);
