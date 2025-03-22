import express from "express";
import {
    registerVolunteer,
    getAllVolunteers,
    getVolunteersByStatus,
    updateVolunteerStatus,
    assignVolunteerToDisaster,
    removeVolunteerAssignment
} from "../controllers/volunteer.controller.js";
import { verifyJWT, verifyAdmin } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Register a new volunteer (User must be authenticated)
router.post("/", verifyJWT, registerVolunteer);

// Get all volunteers (Admin only)
router.get("/", verifyJWT, verifyAdmin, getAllVolunteers);

// Get volunteers by status (Admin only)
router.get("/status/:status", verifyJWT, verifyAdmin, getVolunteersByStatus);

// Update volunteer status (Admin only)
router.put("/:volunteerId", verifyJWT, verifyAdmin, updateVolunteerStatus);

// Assign a volunteer to a disaster (Admin only)
router.post("/assign", verifyJWT, verifyAdmin, assignVolunteerToDisaster);

// Remove a volunteer assignment (Admin only)
router.put("/remove/:volunteerId", verifyJWT, verifyAdmin, removeVolunteerAssignment);

export default router;
