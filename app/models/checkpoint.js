var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Checkpoint = new Schema({
  name: {type: Schema.ObjectId, ref: 'CheckpointStore' },
  type: {type: Schema.ObjectId, ref: 'CheckpointStore'},
  checked: {type: Boolean, default: false},
  disable: {type: Boolean, default: false}
});
mongoose.model('Checkpoint', Checkpoint);
