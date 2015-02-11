var mongoose = require('mongoose');

module.exports = mongoose.model('Checkpoint',{
  checkpointName: String
  //type: String
});
