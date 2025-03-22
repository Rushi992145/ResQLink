import express from "express";
import {
    registerUser,
    loginUser,
    logoutUser,
    getCurrentUser,
    changePassword,
    updateProfile,
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Public Routes
router.post("/register", registerUser); // Register a new user
router.post("/login", loginUser);       // Login user
router.post("/logout", logoutUser);     // Logout user

// Protected Routes (Require Authentication)
router.get("/me", verifyJWT, getCurrentUser);  // Get logged-in user data
router.put("/update-profile", verifyJWT, updateProfile);   // Update profile

export default router;
