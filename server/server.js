const express = require("express");
const path = require("path");
const mongoose = require("mongoose");

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

// Body Parser Middleware
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: false }));

// routes
app.use("/courses", CoursesRoute);

//set static folder
app.use(express.static(path.join(__dirname, "../", "client", "public")));

const PORT = process.env.PORT || 3003;

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
