const express = require("express");
const session = require("express-session");
const path = require("path");
const mongoose = require("mongoose");

// auth
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const userModel = require("./models/userSchema.js");

// usage for courses fetching
const CoursesRoute = require("./routes/CoursesRoute.js");

//config dot env
require("dotenv").config();

// Initialise express app
const app = express();

//MONGOOSE DB CONFIG
const uri = process.env.MONGO_KEY;

// connect to mongo using mongoose
mongoose
  .connect(uri, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => console.log("MongoDB is connected via mongoose..."))
  .catch((err) => console.log(err));

// Middleware
app.use(express.json({ limit: "50mb" }));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialised: true,
  })
);
// replaces body-parser
app.use(express.urlencoded({ extended: false }));

// Passport.js
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  // Setup user model
  userModel.findById(id, function (err, user) {
    done(err, user);
  });
});

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

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/login");
}
function isLoggedOut(req, res, next) {
  if (!req.isAuthenticated()) return next();
  res.redirect("/");
}

// routes
app.get("/", isLoggedIn, (req, res) => {
  res.sendFile(path.resolve(__dirname, "../", "client", "index.html"));
});
app.get("/login", isLoggedOut, (req, res) => {
  res.sendFile(path.resolve(__dirname, "../", "client", "login.html"));
});
app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login?error=true",
  })
);
app.get("/logout", function (req, res) {
  req.logout();
  res.redirect("/");
});
app.use("/courses", CoursesRoute);

// to be changed to register. temporary solution. NEED TO ALTER
app.get("/setup", async (req, res) => {
  const exists = await userModel.exists({ username: "admin" });

  if (exists) {
    res.redirect("/login");
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

      res.redirect("/login");
    });
  });
});

//set static folder
app.use(express.static(path.join(__dirname, "../", "client", "public")));

//The 404 Route (ALWAYS Keep this as the last route)
app.get("*", function (req, res) {
  res.sendFile(path.resolve(__dirname, "../", "client", "Error404.html"));
});

const PORT = process.env.PORT || 3003;

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
