var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Checkpoint = new Schema({
  name: String,
  type: {type : Schema.ObjectId, ref : 'CheckpointType'},
  checked: {type: Boolean, default: false},
  disable: {type : Boolean, default: false}
});
console.log('to models/checkpoints');
mongoose.model('Checkpoint', Checkpoint);
