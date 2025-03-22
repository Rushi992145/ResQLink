import express from "express";
import {
    createDisasterRequest,
    getAllDisasterRequests,
    getDisasterRequestsByStatus,
    updateDisasterRequestStatus,
    deleteDisasterRequest
} from "../controllers/disaster.controller.js";
import { verifyJWT, verifyAdmin } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Create a new disaster request (User must be authenticated)
router.post("/", verifyJWT, createDisasterRequest);

// Get all disaster requests (Admin only)
router.get("/", verifyJWT, verifyAdmin, getAllDisasterRequests);

// Get disaster requests by status (Admin only)
router.get("/status/:status", verifyJWT, verifyAdmin, getDisasterRequestsByStatus);

// Update disaster request status (Admin only)
router.put("/:requestId", verifyJWT, verifyAdmin, updateDisasterRequestStatus);

// Delete a disaster request (Admin only)
router.delete("/:requestId", verifyJWT, verifyAdmin, deleteDisasterRequest);

export default router;
