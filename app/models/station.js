var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var StationSchema = new Schema({
  name: String,
  courses: String,
  students: String
});

mongoose.model('Station', StationSchema);
