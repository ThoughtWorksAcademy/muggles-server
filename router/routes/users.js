var express = require('express');
var router = express.Router();


router.post('/', function(req, res) {
  //TODO: Need to implement.
  console.log(req.params);
  res.send('Success,add user!');
});

module.exports = router;
