const express = require("express");
const passport = require("passport");
const bcrypt = require("bcrypt");

const userModel = require("../models/userSchema.js");

const router = express.Router();

router.get("/check", (req, res) => {
  return res.send(req.isAuthenticated());
});

// authetication of login request from user
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/auth/login?error=true",
  })
);

// logging user out
router.get("/logout", function (req, res) {
  req.logout();
  res.redirect("/");
});

router.post("/register", (req, res) => {
  const { username, password } = req.body;

  userModel
    .findOne({ username })
    .then((user) => {
      if (user) return res.send("user already registered");

      let newUser = new userModel({
        username,
        password,
      });

      // Create salt & hash
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser.save().then((user) => {
            res.send("User registered");
          });
        });
      });
    })
    .catch((err) => {
      throw err;
    });
});

// Linkedin login
router.get(
  "/linkedin",
  passport.authenticate("linkedin", {
    successRedirect: "/",
    failureRedirect: "/auth/login?error=true",
  })
);

router.get(
  "/linkedin/callback",
  passport.authenticate("linkedin", {
    successRedirect: "/",
    failureRedirect: "/auth/login?error=true",
  })
);

module.exports = {
  router,
};
