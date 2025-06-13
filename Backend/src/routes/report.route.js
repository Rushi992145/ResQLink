import express from "express";
import {
    createDisasterRequest,
    getAllDisasterRequests,
    getDisasterRequestsByStatus,
    updateDisasterRequestStatus,
    deleteDisasterRequest,
    getReportById,
    resolveDisaster
} from "../controllers/report.controller.js";
import { verifyJWT, authorizeRoles } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Create a new disaster request 
router.post("/",createDisasterRequest);

// Get all disaster requests (Admin only)
router.get("/getreport", getAllDisasterRequests);

router.get("/getdisaster/:id",getReportById)

// Get disaster requests by status (Admin only)
router.get("/status/:status", verifyJWT, authorizeRoles("admin"), getDisasterRequestsByStatus);

// Update disaster request status (Admin only)
router.put("/:requestId",updateDisasterRequestStatus);

// Delete a disaster request (Admin only)
router.delete("/:requestId", verifyJWT, authorizeRoles("admin"), deleteDisasterRequest);

// Add these routes
router.post("/resolve/:requestId", resolveDisaster);

export default router;
