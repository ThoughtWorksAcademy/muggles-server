var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Checkpoint = new Schema({
  type: String,
  content: String,
  state: Boolean,
  isVisible: Boolean

});

mongoose.model('Checkpoint', Checkpoint);
