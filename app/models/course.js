var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CourseSchema = new Schema({

  name: String,
  checkpoints: [{type: Schema.ObjectId, ref: 'Checkpoint'}]
});

mongoose.model('Course', CourseSchema);
