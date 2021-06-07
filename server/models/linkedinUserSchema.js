const mongoose = require("mongoose");
mongoose.set("debug", true);

const LinkedinUserSchema = new mongoose.Schema(
  {
    linkedinId: {
      type: String,
      required: true,
    },
    name: {
      type: Object,
      required: true,
    },
    emails: {
      type: Array,
      required: true,
    },
    photos: {
      type: Array,
      required: true,
    },
    accessToken: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
    },
    authType: {
      type: String,
      default: "linkedin",
    },
  },
  { collection: "LinkedinUsers" }
);

const LinkedinUser = mongoose.model("LinkedinUser", LinkedinUserSchema);

module.exports = LinkedinUser;
