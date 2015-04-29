var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AppraiseSchema = new Schema({
  level: String,
  appraiser: String,
  comment: String,
  data: String,
  type: String
});

mongoose.model('User', AppraiseSchema);
