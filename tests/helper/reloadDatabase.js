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
  {operate: Trainer, seed: {}},
  {operate: Group, seed: {}},
  {operate: Appraise, seed: {}},
  {operate: Trainee, seed: {}}
];

var create_tasks = [
  {operate: InvitationCode, seed: invitationCodes},
  {operate: Trainer, seed: trainers},
  {operate: Group, seed: groups},
  {operate: Appraise, seed: appraises},
  {operate: Trainee, seed: trainees}
];

var reloadDatabase = function (done) {

  var task_length = tasks.length;
  var create_task_length = create_tasks.length;

  tasks.forEach(function(task) {

    task.operate.remove(task.seed, function() {

      if(0 === --task_length) {

        create_tasks.forEach(function(create_task) {

          create_task.operate.create(create_task.seed, function() {

            if(0 === --create_task_length) {
              done();
            }
          });
        });
      }
    });
  });
};

module.exports = reloadDatabase;
