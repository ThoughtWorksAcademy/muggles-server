'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AdminSchema = new Schema({
  username: String,
  password: String,
  email: String
});

mongoose.model('Admin', AdminSchema);
