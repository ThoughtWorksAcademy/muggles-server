var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  username: String,
  password: String,
  courses: [{type: Schema.ObjectId, ref: 'Course'}]
});

UserSchema.statics = {
  //load: function (options, cb) {
  //  options.select =
  //}
};

mongoose.model('User', UserSchema);
