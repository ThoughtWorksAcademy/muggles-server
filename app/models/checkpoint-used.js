var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CheckpointUsed = new Schema({
  checkpoint: {type: Schema.ObjectId, ref: 'Checkpoint'},
  disable: {type: Boolean, default: false}
});
mongoose.model('CheckpointUsed', CheckpointUsed);
