var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CourseSchema = new Schema({
  name: String,
  checkpoints: [{
    course: {type: Schema.ObjectId, ref: 'Checkpoint'},
    disable: false
  }],
  trainer: {type: String, default:'待定义trainer'},
  sponsor: {type: String, default:'待定义Sponsor'}
});

mongoose.model('Course', CourseSchema);
