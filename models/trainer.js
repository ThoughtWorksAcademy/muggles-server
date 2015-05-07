var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TrainerSchema = new Schema({
  username: String,
  password: String,
  email: String,
  gender: String,
  create_date: Date,
  image: String,
  phone_number: String,
  groups: [{type: Schema.ObjectId, ref: 'Group'}],
  stations: [{type: Schema.ObjectId, ref: 'Station'}]//之前的
});

mongoose.model('Trainer', TrainerSchema);
