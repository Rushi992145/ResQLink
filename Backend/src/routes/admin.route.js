import express from "express";
import {
    registerAdmin,
    getAllAdmins,
    updateAdminRole,
    assignAdminToDisaster,
    removeAdminFromDisaster,
    updateAdminStatus,
    deleteUser
} from "../controllers/admin.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", verifyJWT, registerAdmin);
router.get("/", verifyJWT, getAllAdmins);
router.put("/:adminId/role", verifyJWT, updateAdminRole);
router.post("/assign-disaster", verifyJWT, assignAdminToDisaster);
router.post("/remove-disaster", verifyJWT, removeAdminFromDisaster);
router.put("/:adminId/status", verifyJWT, updateAdminStatus);
router.delete('/deleteuser',deleteUser);

export default router;