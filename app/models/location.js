/**
 * Created by jiekang on 3/11/15.
 */
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var LocationSchema = new Schema({

  name: String,
  courses: [{
    type: Schema.ObjectId,
    ref: 'Course'
  }]

});

mongoose.model('Location', LocationSchema);
