const express = require("express");
const session = require("express-session");
const path = require("path");
const mongoose = require("mongoose");

// // webpack
// const config = require("./server/webpack.config.js");
// const webpack = require("webpack");
// const middleware = require("webpack-dev-middleware"); //webpack hot reloading middleware
// const compiler = webpack(config);

// auth
const passport = require("passport");
const userModel = require("./server/models/userSchema.js");
const linkedinModel = require("./server/models/linkedinUserSchema.js");
const isLoggedIn = require("./server/routes/AuthRoute.js").isLoggedIn;

// passport config
require("./server/config/passportStrategy").passportLocal(passport);
require("./server/config/passportStrategy").passportLinkedIn(passport);

// route files
const CoursesRoute = require("./server/routes/CoursesRoute.js");
const AuthRoute = require("./server/routes/AuthRoute.js").router;

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
// app.use(
//   middleware(compiler, {
//     // webpack-dev-middleware options
//   })
// );
app.use(express.json({ limit: "10mb" }));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(express.urlencoded({ extended: false })); // replaces body-parser

// Passport.js
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(function (user, done) {
  var key = {
    id: user.id,
    type: user.authType,
  };
  done(null, key);
});
passport.deserializeUser(function (key, done) {
  let model;
  if (key.type === "local") {
    model = userModel;
  } else if (key.type === "linkedin") {
    model = linkedinModel;
  }

  model.findById(key.id, function (err, user) {
    done(err, user);
  });
});

// routes
app.get("/", isLoggedIn, (req, res) => {
  res.sendFile(path.resolve(__dirname, "./", "client", "dist", "index.html"));
});
app.use("/auth", AuthRoute);
app.use("/courses", CoursesRoute);

// set static folder
app.use(express.static(path.join(__dirname, "./", "client", "dist")));

// the 404 Route (ALWAYS Keep this as the last route)
app.get("*", function (req, res) {
  res.sendFile(path.resolve(__dirname, "./", "client", "dist", "Error404.html"));
});

const PORT = process.env.PORT || 3003;

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
