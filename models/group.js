var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GroupSchema = new Schema({
  name: String,
  github: String,
  trainer: [{type: Schema.ObjectId, ref: "Trainer"}]
});

mongoose.model('Group', GroupSchema);
