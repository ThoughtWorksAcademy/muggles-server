var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TrainerSchema = new Schema({
  username: String,
  password: String,
  stations: [{type: Schema.ObjectId, ref: 'Station'}]
});

mongoose.model('Trainer', TrainerSchema);
