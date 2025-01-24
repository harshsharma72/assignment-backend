const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
    },
    rollNo:{
      type:Number,
      required:[true,"Roll no is required"]
    },
    school: {
      type: String,
      required: [true, "School name is required"],
    },
    class: {
      type: Number,
      required: [true, "Class is required"],
    },
  },
  { timestamps: true }
);

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
