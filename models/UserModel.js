const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
    },
    rollNo: {
      type: Number,
      required: [true, "Roll no is required"],
    },
    class: {
      type: String, // Change from Number to String
      required: [true, "Class is required"],
    },
    phone: {
      type: Number,
      required: [true, "Phone is required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
    },
    stream: {
      type: String,
      required: [true, "stream is required"],
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
  },
  { timestamps: true }
);

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
