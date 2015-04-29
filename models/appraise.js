var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AppraiseSchema = new Schema({
  level: String,
  appraiser: {type: Schema.ObjectId, ref: "Trainer"},
  comment: String,
  data: String,
  type: String
});

mongoose.model('Appraise', AppraiseSchema);
