const mongoose = require("mongoose");
mongoose.set("debug", true);

const courseraCoursesSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      required: true,
    },

    Url: {
      type: String,
      required: true,
    },

    Rating: {
      type: String,
      required: true,
    },

    Difficulty: {
      type: String,
      required: true,
    },

    Tags: {
      type: String,
      required: true,
    },
  },
  { collection: "Coursera" }
);

const courseraCourses = mongoose.model(
  "courseraCourses",
  courseraCoursesSchema
);

module.exports = courseraCourses;
