const express = require("express");

const UdemyCoursesModel = require("../models/udemyCoursesSchema.js");

const router = express.Router();

//config dot env
require("dotenv").config();

//get all udemy courses from db collection
router.post("/getUdemyCourses", (req, res, next) => {
  var UdemyObj = {};

  UdemyCoursesModel.find({}).then((courses) => {
    courses.map((course) => {
      UdemyObj[course._id] = course;
    });
    return res.json(UdemyObj);
  });
});

module.exports = router;
