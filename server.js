const express = require("express");
const session = require("express-session");
const path = require("path");
const mongoose = require("mongoose");

// auth
const passport = require("passport");
const userModel = require("./server/models/userSchema.js");
const linkedinModel = require("./server/models/linkedinUserSchema.js");

// passport config
require("./server/config/passportStrategy").passportLocal(passport);
require("./server/config/passportStrategy").passportLinkedIn(passport);

// route files
const CoursesRoute = require("./server/routes/CoursesRoute.js");
const AuthRoute = require("./server/routes/AuthRoute.js").router;

// isomorphicRouter
import { isomorphicRouter } from "./client/src/js/universalRouter";

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
app.use("/auth", AuthRoute);
app.use("/courses", CoursesRoute);

app.get("/", (req, res) => {
  isomorphicRouter.resolve("/").then((page) => {
    if (page.redirect) {
      res.redirect(page.redirect);
    } else {
      res.send(`<!doctype html>${page.content}`);
    }
  });
});
app.get("/login", (req, res) => {
  isomorphicRouter.resolve("/login").then((page) => {
    if (page.redirect) {
      res.redirect(page.redirect);
    } else {
      res.send(`<!doctype html>${page.content}`);
    }
  });
});
app.get("/register", (req, res) => {
  isomorphicRouter.resolve("/register").then((page) => {
    res.send(`<!doctype html>${page.content}`);
  });
});

// Error 404 *Shld be kept as the last route
app.get("*", (req, res) => {
  isomorphicRouter.resolve("(.*)").then((page) => {
    res.send(`<!doctype html>${page.content}`);
  });
});

// All code below only to be used in production
if (process.env.NODE_ENV === "production") {
  // set static folder
  app.use(express.static(path.join(__dirname, "./", "client", "dist")));
}

const PORT = process.env.PORT || 3003;

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
