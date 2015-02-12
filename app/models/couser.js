var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CourseSchema = new Schema({
  name: String,
  checkpoints:[{
    course: {type: Schema.ObjectId, ref: 'Checkpoint'},
    disable :false
  }]
});

mongoose.model('Course', CourseSchema);
