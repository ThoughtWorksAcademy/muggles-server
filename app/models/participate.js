/**
 * Created by jiekang on 3/10/15.
 */
var mongoose = require('mongoose');
var Course = mongoose.model('Course');

var Schema = mongoose.Schema;


var ParticipateSchema = new Schema({

    username: String,
    password: String,
    role: String,
    location: [{
      type: Schema.ObjectId,
      ref: 'Location'}],

    courses: [{
      course: [{
        type: Schema.ObjectId,
        ref: 'course'
      }],
      result: [{
        checkpoints: [{
          type: Schema.ObjectId,
          ref: 'Checkpoint'
        }],
        ans: String
      }]
    }]

  })
  ;

mongoose.model('Participate', ParticipateSchema);
