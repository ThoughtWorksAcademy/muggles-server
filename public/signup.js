var User = require('../public/model/user');

module.exports = function(){

        findOrCreateUser = function(){
          User.findOne({ 'username' :  username }, function(err, user) {
            if (err){
              console.log('Error in SignUp: '+err);
              return done(err);
            }

            if (user) {
              console.log('User already exists with username: '+username);
              return done(null, false, req.flash('message','User Already Exists'));
            } else {
              var newUser = new User();

              newUser.username = username;
              newUser.password = password;

              newUser.save(function(err) {
                if (err){
                  console.log('Error in Saving user: '+err);
                  throw err;
                }
                console.log('User Registration succesful');
                return done(null, newUser);
              });
            }
          });
        };
};
