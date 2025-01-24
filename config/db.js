const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log(`Database connected successfully ${mongoose.connection.host}`);
  } catch (error) {
    console.log(`DataBase connection issue ${error}`);
  }
};

module.exports = connectDB;
