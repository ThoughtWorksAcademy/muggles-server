var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  username: String,
  password: String,
  courses: [{
    course: {type: Schema.ObjectId, ref : 'User'},
    coach: {},
    trainer: {}
  }]
});

UserSchema.statics = {
  //load: function (options, cb) {
  //  options.select =
  //}
};

mongoose.model('User', UserSchema);
