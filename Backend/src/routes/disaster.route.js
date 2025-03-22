import express from "express";
import {
    createDisaster,
    getAllDisasters,
    getDisasterById,
    updateDisasterStatus,
    assignVolunteer,
    assignNGO
} from "../controllers/disaster.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Protected Routes (Require Authentication)
router.post("/", verifyJWT, createDisaster); // Create a new disaster entry
router.get("/", verifyJWT, getAllDisasters); // Get all disasters
router.get("/:id", verifyJWT, getDisasterById); // Get disaster by ID
router.put("/:id/status", verifyJWT, updateDisasterStatus); // Update disaster status
router.post("/:id/assign-volunteer", verifyJWT, assignVolunteer); // Assign volunteer
router.post("/:id/assign-ngo", verifyJWT, assignNGO); // Assign NGO

export default router;