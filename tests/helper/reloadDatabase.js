'use strict';

var _ = require('lodash');
var mongoose = require('mongoose');

var Trainee = mongoose.model('Trainee');
var InvitationCode = mongoose.model('InvitationCode');
var Trainer = mongoose.model('Trainer');
var Group = mongoose.model('Group');
var Appraise = mongoose.model('Appraise');

var invitationCodes =  require('../../seeds/test/invitation-codes');
var trainees = require('../../seeds/test/trainees');
var trainers = require('../../seeds/test/trainers');
var groups = require('../../seeds/test/groups');
var appraises = require('../../seeds/test/appraises');

var tasks = [
  {operate: InvitationCode, seed: {}},
  {operate: Trainee, seed: {}},
  {operate: Trainer, seed: {}},
  {operate: Group, seed: {}},
  {operate: Appraise, seed: {}}
];

var createTasks = [
  {operate: InvitationCode, seed: invitationCodes},
  {operate: Trainee, seed: trainees},
  {operate: Trainer, seed: trainers},
  {operate: Group, seed: groups},
  {operate: Appraise, seed: appraises}
];

var reloadDatabase = function (done) {
  var taskLen = tasks.length;
  var createTaskLen = createTasks.length;

  tasks.forEach(function(task) {

    task.operate.remove(task.seed, function() {

      if(0 === --taskLen) {

        createTasks.forEach(function(task) {

          task.operate.create(task.seed, function() {

            if(0 === --createTaskLen) {
              done();
            }
          });
        });
      }
    });
  });
};

module.exports = reloadDatabase;
