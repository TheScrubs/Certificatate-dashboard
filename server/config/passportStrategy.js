const localStrategy = require("passport-local").Strategy;
const LinkedInStrategy = require("passport-linkedin-oauth2").Strategy;

const bcrypt = require("bcrypt");

// Load Models
const userModel = require("../models/userSchema");
const linkedinModel = require("../models/linkedinUserSchema");

// config dot env
require("dotenv").config();

const LINKEDIN_KEY = process.env.LINKEDIN_KEY;
const LINKEDIN_SECRET = process.env.LINKEDIN_SECRET;

function passportLocal(passport) {
  passport.use(
    new localStrategy(function (username, password, done) {
      userModel.findOne({ username: username }, function (err, user) {
        if (err) return done(err);
        if (!user) return done(null, false, { message: "Incorrect username." });

        bcrypt.compare(password, user.password, function (err, res) {
          if (err) return done(err);
          if (res === false)
            return done(null, false, { message: "Incorrect password." });

          return done(null, user);
        });
      });
    })
  );
}

function passportLinkedIn(passport) {
  passport.use(
    new LinkedInStrategy(
      {
        clientID: LINKEDIN_KEY,
        clientSecret: LINKEDIN_SECRET,
        callbackURL: "http://localhost:3003/auth/linkedin/callback",
        scope: ["r_emailaddress", "r_liteprofile"],
      },
      (accessToken, refreshToken, profile, done) => {
        linkedinModel.findOne({ linkedinId: profile.id }).then((user) => {
          if (user) {
            process.nextTick(() => {
              return done(null, user);
            });
          }
          // if there is no user
          else {
            let newUser = new linkedinModel();
            // Set all of the linkedin info to our user model
            newUser.linkedinId = profile.id;
            newUser.name = profile.name;
            newUser.emails = profile.emails;
            newUser.photos = profile.photos;
            newUser.accessToken = accessToken;
            newUser.refreshToken = refreshToken;

            // save our user to the database
            newUser
              .save()
              .then((user) => {
                process.nextTick(() => {
                  return done(null, user);
                });
              })
              .catch((err) => {
                console.log(err);
              });
          }
        });
      }
    )
  );
}

module.exports = {
  passportLocal: passportLocal,
  passportLinkedIn: passportLinkedIn,
};
