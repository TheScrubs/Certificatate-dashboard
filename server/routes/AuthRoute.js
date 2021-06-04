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

// to be changed to register. temporary solution. NEED TO ALTER
router.get("/register", async (req, res) => {
  const exists = await userModel.exists({ username: "admin" });

  if (exists) {
    res.redirect("/auth/login");
    return;
  }

  bcrypt.genSalt(10, function (err, salt) {
    if (err) return next(err);
    bcrypt.hash("pass", salt, function (err, hash) {
      if (err) return next(err);

      const newAdmin = new userModel({
        username: "admin",
        password: hash,
      });

      newAdmin.save();

      res.redirect("/auth/login");
    });
  });
});

module.exports = {
  router: router,
  isLoggedIn: isLoggedIn,
};
