const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;

//to generate random passwords while signing up a user and creating a new user in our application
const crypto = require('crypto');
const User = require('../models/user');



// tell passport to use a new strategy for github login
passport.use(new GitHubStrategy({
        clientID: '6ca8a7e31d96a328b89b', 
        clientSecret: '319ea7cf71aba059ccf8bbdc13e46881f8592d0b', 
        callbackURL: "http://localhost:8000/users/auth/github/callback",
    },

    function(accessToken, refreshToken, profile, done){
        // find a user
        User.findOne({email: profile.emails[0].value}).exec(function(err, user){
            if (err){console.log('error in github strategy-passport', err); return;}
            console.log(accessToken, refreshToken);
            console.log(profile);

            if (user){
                // if found, set this user as req.user
                return done(null, user);
            }else{
                // if not found, create the user and set it as req.user
                User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex')
                }, function(err, user){
                    if (err){console.log('error in creating user github strategy-passport', err); return;}

                    return done(null, user);
                });
            }

        }); 
    }


));


module.exports = passport;
