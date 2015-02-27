var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User');


module.exports = function (passport) {
  passport.use('login', new LocalStrategy(
    function (username, password, done) {
      console.log('enter passport login');
      var user = new User();
      user.password = 'sigh';
      user.username = 'sigh';
      user.save();

      User.findOne({'username': username},
        function (err, user) {
          if (err) {
            console.log('err');
            return done(err);
          }

          if (!user) {
            return done(null, false);
          }

          if (!isValidPassword(user, password)) {
            return done(null, false);
          }

          return done(null, user);
        })
    }));

  var isValidPassword = function (user, password) {
    return password == user.password;
  }
};
