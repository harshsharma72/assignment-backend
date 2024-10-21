const userModel = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//
const registerController = async (req, res) => {
  try {
    const existingUser = await userModel.findOne({ email: req.body.email });
    if (existingUser) {
      return res
        .status(200)
        .send({ success: false, message: "User already exists" });
    }
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;
    const newUser = new userModel(req.body);
    await newUser.save();
    res
      .status(200)
      .send({ success: true, message: "User created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `Register Controller ${error.message}`,
    });
  }
};

const loginController = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(200)
        .send({ success: false, message: "User not found" });
    }
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) {
      return res
        .status(200)
        .send({ success: false, message: "Invalid Email or Wrong Password" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res
      .status(200)
      .send({ success: true, message: "Login Successfull", user, token });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `Error in Login Controller ${error.message}`,
    });
  }
};

const editUserController = async (req, res) => {
  try {
    const userId = req.params.id;
    const updatedData = req.body;

    const updatedUser = await userModel.findByIdAndUpdate(userId, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return res
        .status(404)
        .send({ success: false, message: "User not found" });
    }

    res.status(200).send({
      success: true,
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `Error in Edit User Controller ${error.message}`,
    });
  }
};

//  delete controller

const deleteUserController = async (req, res) => {
  try {
    const userId = req.params.id;

    const deletedUser = await userModel.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res
        .status(404)
        .send({ success: false, message: "User not found" });
    }

    res
      .status(200)
      .send({ success: true, message: "User deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `Error in Delete User Controller ${error.message}`,
    });
  }
};

const authController = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.body.userId });
    if (!user) {
      return res.status(200).send({
        message: "User not found",
        success: false,
      });
    } else {
      res.status(200).send({
        success: true,
        data: {
          name: user.name,
          email: user.email,
        },
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Auth Error",
      success: false,
      error,
    });
  }
};

module.exports = {
  loginController,
  editUserController,
  deleteUserController,
  registerController,
  authController,
};
