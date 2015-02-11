var mongoose = require('mongoose');

module.exports = mongoose.model('Checkpoint',{
  name: String,
  type: String
});
