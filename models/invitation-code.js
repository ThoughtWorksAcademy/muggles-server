'use strict';

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var InvitationCodeSchema = new Schema({
  name: String,
  content: String
});

mongoose.model('InvitationCode', InvitationCodeSchema);

