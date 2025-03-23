import express from "express";
import {
    updateNGO,
    getNGODetails,
    updateNGOProfile,
    deleteNGO,
    getAllNgos
} from "../controllers/ngo.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Protected Routes (Require Authentication)
router.post("/update", verifyJWT, updateNGO); // Register a new NGO
router.get("/getallngo", getAllNgos); // Get all NGOs
router.post("/getngo", verifyJWT, getNGODetails); // Get details of an NGO
router.put("/:ngoId", verifyJWT, updateNGOProfile); // Update NGO details
router.delete("/:ngoId", verifyJWT, deleteNGO); // Delete an NGO

export default router;