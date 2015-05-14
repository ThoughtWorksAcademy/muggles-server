'use strict';

var _ = require('lodash');
var mongoose = require('mongoose');

var Trainee = mongoose.model('Trainee');
var InvitationCode = mongoose.model('InvitationCode');
var Trainer = mongoose.model('Trainer');
var Group = mongoose.model('Group');
var Appraise = mongoose.model('Appraise');

var invitation_codes =  require('../../seeds/test/invitation-codes');
var trainees = require('../../seeds/test/trainees');
var trainers = require('../../seeds/test/trainers');
var groups = require('../../seeds/test/groups');
var appraises = require('../../seeds/test/appraises');

var tasks = [
  {operate: InvitationCode, seed: {}},
  {operate: Group, seed: {}},
  {operate: Trainer, seed: {}},
  {operate: Appraise, seed: {}},
  {operate: Trainee, seed: {}}
];

var create_tasks = [
  {operate: InvitationCode, seed: invitation_codes},
  {operate: Group, seed: groups},
  {operate: Trainer, seed: trainers},
  {operate: Appraise, seed: appraises},
  {operate: Trainee, seed: trainees}
];

var reloadDatabase = function (done) {
  var task_length = tasks.length;
  var create_task_Length = create_tasks.length;

  tasks.forEach(function(task) {

    task.operate.remove(task.seed, function() {

      if(0 === --task_length) {

        create_tasks.forEach(function(create_task) {

          create_task.operate.create(create_task.seed, function(err) {

            if(err) {
              console.log(err);
            }
            if(0 === --create_task_Length) {
              done();
            }
          });
        });
      }
    });
  });
};

module.exports = reloadDatabase;
