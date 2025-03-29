import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import Volunteer from "../models/volunteer.model.js"

// Generate JWT Token
const generateToken = (userId) => {
  return jwt.sign({ _id: userId }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};

// Register a new user
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;
  console.log(name, email, password, role);
  
  if (!name || !email || !password || !role) {
    return res.status(409).json({
      success: false,
      message: "User already registered",
    });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(409, "User with this email already exists");
  }

    const user = await User.create({ name, email, password, role });

  if (!user) {
    throw new ApiError(500, "Error creating user");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, { user }, "User registered successfully"));
});

// Login user
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  console.log(password);
  if (!email || !password) {
    throw new ApiError(400, "Email and password are required");
  }

  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password))) {
    throw new ApiError(401, "Invalid credentials");
  }

  const token = generateToken(user._id);

  return res
    .status(200)
    .json(new ApiResponse(200, { user, token }, "User logged in successfully"));
});

// Logout user
const logoutUser = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, {}, "User logged out successfully"));
});

// Get current user
const getCurrentUser = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, req.user, "User data fetched successfully"));
});

// Change Password
const changePassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  console.log(oldPassword, newPassword);
  if (!oldPassword || !newPassword) {
    throw new ApiError(400, "Old and new passwords are required");
  }

  const user = await User.findById(req.user._id);
  if (!user || !(await user.comparePassword(oldPassword))) {
    throw new ApiError(400, "Old password is incorrect");
  }

  user.password = await bcrypt.hash(newPassword, 10);
  console.log(user.password);
  await user.save();

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password changed successfully"));
});

// Update user profile
const updateProfile = asyncHandler(async (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    throw new ApiError(400, "Name and email are required");
  }

  const updatedUser = await User.findByIdAndUpdate(
    req.user._id,
    { $set: { name, email } },
    { new: true }
  ).select("-password");

  return res
    .status(200)
    .json(new ApiResponse(200, updatedUser, "Profile updated successfully"));
});

export {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  changePassword,
  updateProfile,
};
