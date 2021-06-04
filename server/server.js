const express = require("express");
const session = require("express-session");
const path = require("path");
const mongoose = require("mongoose");

// auth
const passport = require("passport");
const userModel = require("./models/userSchema.js");
const isLoggedIn = require("./routes/AuthRoute.js").isLoggedIn;
require("./config/passportStrategy").passportLocal(passport); // passport config

// route files
const CoursesRoute = require("./routes/CoursesRoute.js");
const AuthRoute = require("./routes/AuthRoute.js").router;

// config dot env
require("dotenv").config();

// initialise express app
const app = express();

// mongoose DB Config
const uri = process.env.MONGO_KEY;

// connect to mongo using mongoose
mongoose
  .connect(uri, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => console.log("MongoDB is connected via mongoose..."))
  .catch((err) => console.log(err));

// middleware
app.use(express.json({ limit: "50mb" }));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialised: true,
  })
);
app.use(express.urlencoded({ extended: false })); // replaces body-parser

// Passport.js
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(function (user, done) {
  done(null, user.id);
});
passport.deserializeUser(function (id, done) {
  // setup user model
  userModel.findById(id, function (err, user) {
    done(err, user);
  });
});

// routes
app.get("/", isLoggedIn, (req, res) => {
  res.sendFile(path.resolve(__dirname, "../", "client", "index.html"));
});
app.use("/auth", AuthRoute);
app.use("/courses", CoursesRoute);

// set static folder
app.use(express.static(path.join(__dirname, "../", "client", "public")));

// the 404 Route (ALWAYS Keep this as the last route)
app.get("*", function (req, res) {
  res.sendFile(path.resolve(__dirname, "../", "client", "Error404.html"));
});

const PORT = process.env.PORT || 3003;

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
