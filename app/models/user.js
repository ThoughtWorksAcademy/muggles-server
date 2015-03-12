var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  username: String,
  password: String,
  courses: [{type: Schema.ObjectId, ref: 'Course'}]
});

mongoose.model('User', UserSchema);
