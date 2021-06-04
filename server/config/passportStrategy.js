const localStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

// Load Models
const userModel = require("../models/userSchema");

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

module.exports = {
  passportLocal: passportLocal,
};
