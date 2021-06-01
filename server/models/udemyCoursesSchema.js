const mongoose = require("mongoose");
mongoose.set("debug", true);

const udemyCoursesSchema = new mongoose.Schema(
  {
    course_id: {
      type: String,
      required: true,
    },

    course_title: {
      type: String,
      required: true,
    },

    url: {
      type: String,
      required: true,
    },

    is_paid: {
      type: String,
      required: true,
    },

    price: {
      type: String,
      required: true,
    },

    num_subscribers: {
      type: String,
      required: true,
    },
    num_reviews: {
      type: String,
      required: true,
    },
    num_lectures: {
      type: String,
      required: true,
    },
    level: {
      type: String,
      required: true,
    },
    content_duration: {
      type: String,
      required: true,
    },
    published_timestamp: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
  },
  { collection: "Udemy" }
);

const udemyCourses = mongoose.model("udemyCourses", udemyCoursesSchema);

module.exports = udemyCourses;
