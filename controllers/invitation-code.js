'use strict';

var _ = require('lodash');
var date_util = require('../utils/date-util');

var mongoose = require('mongoose');

var Trainee = mongoose.model('Trainee');
var invitation_code = mongoose.model('InvitationCode');

var get_invitations = function (req, res, next) {

  var content = req.params.content;
  InvitationCode.findOne({content: content})
    .exec()
    .then(function (invitation) {

      if (!invitation) {

        res.send({state: 404, data: {}, message: ERROR_CODE});
      } else {

        res.send({state: 200, data: invitation, message: CORRECT_CODE})
      }
    })
    .onReject(function (err) {

      next(err);
    })};


module.exports = {
  get_invitations: get_invitations,
};
