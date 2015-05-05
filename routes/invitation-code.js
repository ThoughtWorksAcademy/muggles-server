'use strict';

var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var InvitationCode = mongoose.model('InvitationCode');

router.post('/', function(req, res) {

  InvitationCode.create({name: 'invitationCode', content: '2003967524987'})
    .then(function(data) {

      console.log(data);
      res.send(data);
    })
});

module.exports = router;
