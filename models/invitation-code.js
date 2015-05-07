'use strict';

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var InvitationCodeSchema = new Schema({
  content: String
});

mongoose.model('InvitationCode', InvitationCodeSchema);
