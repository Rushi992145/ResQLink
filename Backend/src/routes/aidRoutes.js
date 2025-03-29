import express from "express";
const router = express.Router();
import {
  createAid,
  getAllAid,
  getAidById,
  updateAid,
  deleteAid,
  updateRequirementStatus,
} from "../controllers/aidController.js";

// Public routes
router.get("/all", getAllAid);
router.get("/:id", getAidById);
router.post("/create", createAid);
router.put("/update/:id", updateAid);
router.delete("/delete/:id", deleteAid);
router.patch("/requirement/:id", updateRequirementStatus);

export default router;
