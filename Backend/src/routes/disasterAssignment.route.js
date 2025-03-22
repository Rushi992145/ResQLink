import express from "express";
import {
    assignToDisaster,
    getAssignmentsForDisaster,
    updateAssignmentStatus,
    removeAssignment
} from "../controllers/disasterAssignment.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Protected Routes (Require Authentication)
router.post("/", verifyJWT, assignToDisaster); // Assign a volunteer or NGO to a disaster
router.get("/:disasterId", verifyJWT, getAssignmentsForDisaster); // Get all assignments for a disaster
router.put("/:assignmentId/status", verifyJWT, updateAssignmentStatus); // Update assignment status (Accept/Reject)
router.delete("/:assignmentId", verifyJWT, removeAssignment); // Remove an assignment

export default router;