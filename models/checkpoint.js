//之前的
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Checkpoint = new Schema({
  name: String,
  type: {type: Schema.ObjectId, ref: 'CheckpointType'}
});

mongoose.model('Checkpoint', Checkpoint);
