var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TrainerSchema = new Schema({
  username: String,
  password: String,
  email: String,
  sex: String,
  create_date: String,
  image: String,
  phone_number: String,
  groups: [],
  stations: [{type: Schema.ObjectId, ref: 'Station'}]
});

mongoose.model('Trainer', TrainerSchema);
