var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CheckpointTypeSchema = new Schema({
  type : String
});

mongoose.model('CheckpointType', CheckpointTypeSchema);
