// config/passport.js
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User');

passport.use(new LocalStrategy(
    function(username, password, done) {
        console.log(username);
        // Remember that usernames are stored lower case
        User.findOne({ username: username.toLowerCase() }, function(err, user) {
            if(err) { return done(err); }

            if(!user) {
                return done(null, false, { message: 'Incorrect Username.' });
            }

            if(!user.validPassword(password)) {
                return(done, null, false, { message: 'Incorrect password.' });
            }

            return done(null, user);
        });
    }
))