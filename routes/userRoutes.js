const express = require("express");
const {
  loginController,
  registerController,
  authController,
  getUserProfileController,
  updateUserProfileController,
  logoutController,
} = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware.js");

const router = express.Router();

// Register route
router.post("/register", registerController);

// Login route
router.post("/login", loginController);

// Logout route
router.post("/logout", authMiddleware, logoutController);

// Get user data
router.get("/get-user-data", authMiddleware, authController);

// Get user profile
router.get("/profile", authMiddleware, getUserProfileController);

// Update user profile
router.put("/profile", authMiddleware, updateUserProfileController);

module.exports = router;
