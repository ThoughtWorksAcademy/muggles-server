var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CheckpointUsed = new Schema({
  checkpoint: {type: Schema.ObjectId, ref: 'Checkpoint'},
  disable: {type: Boolean, default: false},
  trainer: {type: String, default:'待定义trainer'},
  sponsors: {type: String, default:'待定义Sponsors'}
});
mongoose.model('CheckpointUsed', CheckpointUsed);
