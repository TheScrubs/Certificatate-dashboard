const express = require("express");

const UdemyCoursesModel = require("../models/udemyCoursesSchema.js");
const CourseraCoursesModel = require("../models/courseraCoursesSchema.js");

const router = express.Router();

//get all udemy courses from db collection
router.get("/getUdemyCourses", (req, res) => {
  var UdemyObj = {};

  console.log('I am inside get Udemy courses')

  UdemyCoursesModel.find({}).then((courses) => {
    courses.map((course) => {
      UdemyObj[course._id] = course;
    });

    // On success
    return res.status(200).json(UdemyObj);
  }).catch(err => { console.log('Err getting Udemy Courses', err) })
});

//get all udemy courses from db collection
router.post("/getCourseraCourses", (req, res, next) => {
  var CourseraObj = {};

  CourseraCoursesModel.find({}).then((courses) => {
    courses.map((course) => {
      CourseraObj[course._id] = course;
    });
    return res.json(CourseraObj);
  });
});

module.exports = router;
