import express from "express";
import {
    registerNGO,
    getNGODetails,
    updateNGOProfile,
    deleteNGO
} from "../controllers/ngo.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Protected Routes (Require Authentication)
router.post("/", verifyJWT, registerNGO); // Register a new NGO
router.get("/:ngoId", verifyJWT, getNGODetails); // Get details of an NGO
router.put("/:ngoId", verifyJWT, updateNGOProfile); // Update NGO details
router.delete("/:ngoId", verifyJWT, deleteNGO); // Delete an NGO

export default router;