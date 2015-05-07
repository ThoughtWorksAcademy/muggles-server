'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AppraiseSchema = new Schema({
  level: String,
  appraiser: {type: Schema.ObjectId, ref: 'Trainer'},
  group: {type: Schema.ObjectId, ref: 'Group'},
  comment: String,
  appraised_date: Date,
  create_date: Date,
  type: String
});

mongoose.model('Appraise', AppraiseSchema);
