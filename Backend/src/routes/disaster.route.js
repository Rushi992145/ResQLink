import express from "express";
import {
    createDisaster,
    getDisasterDetails,
    updateDisasterStatus,
    assignVolunteersAndNGOs,
    deleteDisaster
} from "../controllers/disaster.controller.js";
import { verifyJWT, authorizeRoles } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Create a new disaster (Admin only)
router.post("/", verifyJWT, authorizeRoles("admin"), createDisaster);

// Get details of a specific disaster
router.get("/:disasterId", verifyJWT, getDisasterDetails);

// Update disaster status (Admin only)
router.put("/:disasterId/status", verifyJWT, authorizeRoles("admin"), updateDisasterStatus);

// Assign volunteers & NGOs to a disaster (Admin only)
router.put("/:disasterId/assign", verifyJWT, authorizeRoles("admin"), assignVolunteersAndNGOs);

// Delete a disaster (Admin only)
router.delete("/:disasterId", verifyJWT, authorizeRoles("admin"), deleteDisaster);

export default router;
