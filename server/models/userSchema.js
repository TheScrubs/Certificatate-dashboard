const mongoose = require("mongoose");
mongoose.set("debug", true);

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { collection: "Users" }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
