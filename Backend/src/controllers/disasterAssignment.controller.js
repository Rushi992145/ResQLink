import {asyncHandler} from "../utils/asyncHandler.js";
import DisasterAssignment from "../models/disasterAssignment.model.js";
import Disaster from "../models/disaster.model.js";
import User from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// Assign a volunteer or NGO to a disaster
const assignToDisaster = asyncHandler(async (req, res) => {
    const { disasterId, assignedTo, role } = req.body;

    if (!disasterId || !assignedTo || !role) {
        throw new ApiError(400, "Missing required fields");
    }

    if (!["volunteer", "ngo"].includes(role)) {
        throw new ApiError(400, "Invalid role value");
    }

    const disaster = await Disaster.findById(disasterId);
    if (!disaster) {
        throw new ApiError(404, "Disaster not found");
    }

    const user = await User.findById(assignedTo);
    if (!user || user.role !== role) {
        throw new ApiError(400, `The assigned user must be a ${role}`);
    }

    const existingAssignment = await DisasterAssignment.findOne({ disasterId, assignedTo });
    if (existingAssignment) {
        throw new ApiError(400, "User already assigned to this disaster");
    }

    const assignment = await DisasterAssignment.create({ disasterId, assignedTo, role });

    return res.status(201).json(new ApiResponse(201, assignment, "Assignment created successfully"));
});

// Get all assignments for a specific disaster
const getAssignmentsForDisaster = asyncHandler(async (req, res) => {
    const { disasterId } = req.params;

    const assignments = await DisasterAssignment.find({ disasterId })
        .populate("assignedTo", "name email")
        .populate("disasterId", "location severity status");

    if (!assignments.length) {
        throw new ApiError(404, "No assignments found for this disaster");
    }

    return res.status(200).json(new ApiResponse(200, assignments, "Assignments fetched successfully"));
});

// Update assignment status (Accept/Reject)
const updateAssignmentStatus = asyncHandler(async (req, res) => {
    const { assignmentId } = req.params;
    const { status } = req.body;

    if (!["accepted", "rejected"].includes(status)) {
        throw new ApiError(400, "Invalid status value");
    }

    const assignment = await DisasterAssignment.findById(assignmentId);
    if (!assignment) {
        throw new ApiError(404, "Assignment not found");
    }

    assignment.status = status;
    await assignment.save();

    return res.status(200).json(new ApiResponse(200, assignment, `Assignment status updated to ${status}`));
});

// Remove an assignment
const removeAssignment = asyncHandler(async (req, res) => {
    const { assignmentId } = req.params;

    const assignment = await DisasterAssignment.findById(assignmentId);
    if (!assignment) {
        throw new ApiError(404, "Assignment not found");
    }

    await DisasterAssignment.findByIdAndDelete(assignmentId);

    return res.status(200).json(new ApiResponse(200, {}, "Assignment removed successfully"));
});

export { assignToDisaster, getAssignmentsForDisaster, updateAssignmentStatus, removeAssignment };
