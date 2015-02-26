var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CheckpointTypeSchema = new Schema({
  name: String
});

mongoose.model('CheckpointType', CheckpointTypeSchema);
