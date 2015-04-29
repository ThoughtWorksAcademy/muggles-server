var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GroupSchema = new Schema({
  name: String,
  github: String,
  trainer: []
});

mongoose.model('User', GroupSchema);
