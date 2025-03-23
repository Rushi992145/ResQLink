import {asyncHandler} from "../utils/asyncHandler.js";
import Admin from "../models/admin.model.js";
import User from "../models/user.model.js";
import Disaster from "../models/disaster.model.js";
import Volunteer from "../models/volunteer.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
 
// Register a new admin
const registerAdmin = asyncHandler(async (req, res) => {
    const { userId, contactNumber, role } = req.body;   

    if (!userId) {
        throw new ApiError(400, "User ID is required");
    }

    if (role && !["superadmin", "admin"].includes(role)) {
        throw new ApiError(400, "Invalid role type");
    }

    const user = await User.findById(userId);
    if (!user) { 
        throw new ApiError(404, "User not found");
    }

    const admin = await Admin.create({
        userId,
        contactNumber,
        role: role || "admin",
    });

    return res.status(201).json(new ApiResponse(201, admin, "Admin registered successfully"));
});

// Get all admins
const getAllAdmins = asyncHandler(async (req, res) => {
    const admins = await Admin.find()
        .populate("userId", "name email")
        .populate("assignedDisasters", "location severity status")
        .sort({ createdAt: -1 });

    return res.status(200).json(new ApiResponse(200, admins, "All admins fetched successfully"));
});

// Update admin role
const updateAdminRole = asyncHandler(async (req, res) => {
    const { adminId } = req.params;
    const { role } = req.body;

    if (!["superadmin", "admin"].includes(role)) {
        throw new ApiError(400, "Invalid role type");
    }

    const admin = await Admin.findById(adminId);
    if (!admin) {
        throw new ApiError(404, "Admin not found");
    }

    admin.role = role;
    await admin.save();

    return res.status(200).json(new ApiResponse(200, admin, `Admin role updated to ${role}`));
});

// Assign an admin to a disaster
const assignAdminToDisaster = asyncHandler(async (req, res) => {
    const { adminId, disasterId } = req.body;

    const admin = await Admin.findById(adminId);
    if (!admin) {
        throw new ApiError(404, "Admin not found");
    }

    const disaster = await Disaster.findById(disasterId);
    if (!disaster) {
        throw new ApiError(404, "Disaster not found");
    }

    if (!admin.assignedDisasters.includes(disasterId)) {
        admin.assignedDisasters.push(disasterId);
    }
    await admin.save();

    return res.status(200).json(new ApiResponse(200, admin, "Admin assigned to disaster successfully"));
});

// Remove an admin from a disaster
const removeAdminFromDisaster = asyncHandler(async (req, res) => {
    const { adminId, disasterId } = req.body;

    const admin = await Admin.findById(adminId);
    if (!admin) {
        throw new ApiError(404, "Admin not found");
    }

    admin.assignedDisasters = admin.assignedDisasters.filter(
        (id) => id.toString() !== disasterId
    );

    await admin.save();

    return res.status(200).json(new ApiResponse(200, admin, "Admin removed from disaster successfully"));
});

// Update admin status
const updateAdminStatus = asyncHandler(async (req, res) => {
    const { adminId } = req.params;
    const { status } = req.body;

    if (!["Active", "Inactive"].includes(status)) {
        throw new ApiError(400, "Invalid status");
    }

    const admin = await Admin.findById(adminId);
    if (!admin) {
        throw new ApiError(404, "Admin not found");
    }

    admin.status = status;
    await admin.save();

    return res.status(200).json(new ApiResponse(200, admin, `Admin status updated to ${status}`));
});

const deleteUser = async (req,res) => {
    try 
    {
        const {id} = req.id;

        const deleteUser = await Volunteer.findByIdAndDelete(id);

        console.log(deleteUser.userId);

        return res.status(200).json({
            success : true,
            message : "User deleted successfully"
        })
    }
    catch(error)
    {
        console.log(error.message);
        return res.status(500).json({
            success : false,
            message : "Internal server error"
        })
    }
}

export {
    registerAdmin,
    getAllAdmins,
    updateAdminRole,
    assignAdminToDisaster,
    removeAdminFromDisaster,
    updateAdminStatus,
    deleteUser
};
