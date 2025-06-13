import express from "express";
import {
    updateVolunteer,
    getAllVolunteers,
    getVolunteersByStatus,
    updateVolunteerStatus,
    assignVolunteerToDisaster,
    removeVolunteerAssignment,
    getVolunteerDetails,
    acceptRequest,
    checkVolunteerStatus
} from "../controllers/volunteer.controller.js";
import { verifyJWT, authorizeRoles } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Register a new volunteer (User must be authenticated)
router.post("/", verifyJWT, updateVolunteer);

router.post("/getvoldetails", getVolunteerDetails);

// Get all volunteers (Admin only)
router.get("/", verifyJWT, authorizeRoles("admin"), getAllVolunteers);

router.post("/acceptrequest",acceptRequest);

// Get volunteers by status (Admin only)
router.get("/status/:status", verifyJWT, authorizeRoles("admin"), getVolunteersByStatus);

// Update volunteer status (Admin only)
router.put("/:volunteerId", verifyJWT, authorizeRoles("admin"), updateVolunteerStatus);

// Assign a volunteer to a disaster (Admin only)
router.post("/assign", verifyJWT, authorizeRoles("admin"), assignVolunteerToDisaster);

// Remove a volunteer assignment (Admin only)
router.put("/remove/:volunteerId", verifyJWT, authorizeRoles("admin"), removeVolunteerAssignment);

// Add this route
router.post("/check-status", checkVolunteerStatus);

export default router;
