import express from "express";
import allocationController from "../controllers/allocation.controller.js";

const router = express.Router();

// POST /api/aid/allocate
router.post("/", allocationController.allocateResources);

export default router;
