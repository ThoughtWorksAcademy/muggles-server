'use strict';

var _ = require('lodash');
var mongoose = require('mongoose');

var InvitationCode = mongoose.model('InvitationCode');
var CORRECT_CODE = '邀请码正确';
var ERROR_CODE = '邀请码错误';

var get_invitation_by_content = function (req, res, next) {

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
  get_invitation_by_content: get_invitation_by_content
};
