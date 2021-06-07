const express = require("express");
const passport = require("passport");
const path = require("path");
const bcrypt = require("bcrypt");

const userModel = require("../models/userSchema.js");

const router = express.Router();

// if user is logged in, we allow access to '/', else we redirect to login page
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/auth/login");
}
// if user is logged out, we redirect to login in page, else we redirect to '/'
function isLoggedOut(req, res, next) {
  if (!req.isAuthenticated()) return next();
  res.redirect("/");
}

// serving the login page
router.get("/login", isLoggedOut, (req, res) => {
  res.sendFile(path.resolve(__dirname, "../", "../", "client", "login.html"));
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

// used to provide static assets to login page
router.use(
  //set static folder
  express.static(path.join(__dirname, "../", "../", "client", "public"))
);

// serving the register page
router.get("/register", isLoggedOut, (req, res) => {
  res.sendFile(
    path.resolve(__dirname, "../", "../", "client", "register.html")
  );
});

router.post("/register", (req, res) => {
  const { username, password } = req.body;

  userModel
    .findOne({ username })
    .then((user) => {
      if (user) return res.redirect("/auth/register?error=true&msg=userexist");

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
            res.redirect("/auth/login?msg=acccreated");
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
  router: router,
  isLoggedIn: isLoggedIn,
};
