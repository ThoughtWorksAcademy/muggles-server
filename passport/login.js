var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User');


module.exports = function (passport) {
  //passport.use(new LocalStrategy(
  //  function(username, password, done) {
  //    process.nextTick(function () {
  //
  //      User.findOne({'username': username}, function(err, user) {
  //        if (err) { return done(err); }
  //        if (!user) { return done(null, false, { message: 'Unknown user ' + username }); }
  //        if (user.password != password) { return done(null, false, { message: 'Invalid password' }); }
  //        return done(null, user);
  //      })
  //    });
  //  }
  //));
  passport.use('login', new LocalStrategy(
    function (res, username, password, done) {
      //console.log('enter passport login');
      //var user = new User();
      //user.password = 'sigh';
      //user.username = 'sigh';
      //user.save();

      process.nextTick(function () {

        User.findOne({'username': username}, function (err, user) {
          if (err) {
            return done(err);
          }
          if (!user) {
            return done(null, false, {message: 'Unknown user ' + username});
          }
          if (user.password != password) {
            return done(null, false, {message: 'Invalid password'});
          }
          return done(null, user);
        })
      });
    }));

  var isValidPassword = function (user, password) {
    return password == user.password;
  }
};
