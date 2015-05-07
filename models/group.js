'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GroupSchema = new Schema({
  name: String,
  github: String
});

mongoose.model('Group', GroupSchema);
