var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CourseSchema = new Schema({
  name: String,
  checkpoints: [{type: Schema.Types.ObjectId, ref: 'Checkpoint'}],
  trainer: {type: String, default:'待定义trainer'},
  sponsor: {type: String, default:'待定义Sponsor'}
});

mongoose.model('Course', CourseSchema);
