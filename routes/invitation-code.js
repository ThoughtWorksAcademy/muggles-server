'use strict';

var ERROR_CODE = '请填写正确的邀请码';
var CORRECT_CODE = '邀请码输入正确';

var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var InvitationCode = mongoose.model('InvitationCode');

router.get('/:content', function(req, res, next) {

  let content = req.params.content;
  InvitationCode.findOne({content: content})
    .exec()
    .then(function(invitation) {

      if(!invitation){

        res.send({state: 404, data: {}, message: ERROR_CODE});
      } else {

        res.send({state: 200, data: invitation, message: CORRECT_CODE})
      }
    })
   .onReject(function(err) {

      next(err);
   })
});

module.exports = router;
