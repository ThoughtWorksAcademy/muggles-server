'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AppraiseSchema = new Schema({
  level: String,
  appraiser: {type: Schema.ObjectId, ref: 'Trainer'},
  group: {type: Schema.ObjectId, ref: 'Group'},
  comment: String,
  create_date: String,
  type: String
});

mongoose.model('Appraise', AppraiseSchema);
