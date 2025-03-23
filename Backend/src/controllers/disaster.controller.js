import {asyncHandler} from "../utils/asyncHandler.js";
import Disaster from "../models/disaster.model.js";
import User from "../models/user.model.js";
import NGO from "../models/ngo.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
 
// Create a new disaster (Only Admin)
const createDisaster = asyncHandler(async (req, res) => {
    const { requestId, adminId, severity, affectedPeople } = req.body;

    if (!requestId || !adminId || !severity) {
        throw new ApiError(400, "Missing required fields");
    }

    const admin = await User.findById(adminId);
    if (!admin || admin.role !== "admin") {
        throw new ApiError(403, "Only admins can create disasters");
    }

    const disaster = await Disaster.create({
        requestId,
        adminId,
        severity,
        affectedPeople,
    });

    return res.status(201).json(new ApiResponse(201, { disaster }, "Disaster created successfully"));
});

// Get disaster details
const getDisasterDetails = asyncHandler(async (req, res) => {
    const { disasterId } = req.params;

    const disaster = await Disaster.findById(disasterId)
        .populate("adminId", "name email")
        .populate("assignedVolunteers", "name email")
        .populate("assignedNGOs", "organizationName contactPerson");

    if (!disaster) {
        throw new ApiError(404, "Disaster not found");
    }

    return res.status(200).json(new ApiResponse(200, disaster, "Disaster details fetched successfully"));
});

// Update disaster status
const updateDisasterStatus = asyncHandler(async (req, res) => {
    const { disasterId } = req.params;
    const { status } = req.body;

    if (!["ongoing", "resolved"].includes(status)) {
        throw new ApiError(400, "Invalid status value");
    }

    const disaster = await Disaster.findById(disasterId);
    if (!disaster) {
        throw new ApiError(404, "Disaster not found");
    }

    disaster.status = status;
    await disaster.save();

    return res.status(200).json(new ApiResponse(200, disaster, "Disaster status updated successfully"));
});

// Assign volunteers & NGOs to disaster
const assignVolunteersAndNGOs = asyncHandler(async (req, res) => {
    const { disasterId } = req.params;
    const { volunteers, ngos } = req.body;

    const disaster = await Disaster.findById(disasterId);
    if (!disaster) {
        throw new ApiError(404, "Disaster not found");
    }

    if (volunteers && volunteers.length) {
        const validVolunteers = await User.find({ _id: { $in: volunteers }, role: "volunteer" });
        disaster.assignedVolunteers = validVolunteers.map(v => v._id);
    }

    if (ngos && ngos.length) {
        const validNGOs = await NGO.find({ _id: { $in: ngos } });
        disaster.assignedNGOs = validNGOs.map(n => n._id);
    }

    await disaster.save();

    return res.status(200).json(new ApiResponse(200, disaster, "Volunteers and NGOs assigned successfully"));
});

// Delete disaster
const deleteDisaster = asyncHandler(async (req, res) => {
    const { disasterId } = req.params;

    const disaster = await Disaster.findById(disasterId);
    if (!disaster) {
        throw new ApiError(404, "Disaster not found");
    }

    await Disaster.findByIdAndDelete(disasterId);

    return res.status(200).json(new ApiResponse(200, {}, "Disaster deleted successfully"));
});

export { createDisaster, getDisasterDetails, updateDisasterStatus, assignVolunteersAndNGOs, deleteDisaster };
