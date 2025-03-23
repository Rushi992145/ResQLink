import {asyncHandler} from "../utils/asyncHandler.js";
import Volunteer from "../models/volunteer.model.js";
import User from "../models/user.model.js";
import Disaster from "../models/disaster.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// Register a new volunteer
const registerVolunteer = asyncHandler(async (req, res) => {
    const { userId, skills, availability, location } = req.body;

    if (!userId || !availability || !location.city || !location.country) {
        throw new ApiError(400, "Missing required fields");
    }

    if (!["Full-time", "Part-time", "On-call"].includes(availability)) {
        throw new ApiError(400, "Invalid availability type");
    }

    const user = await User.findById(userId);
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    const volunteer = await Volunteer.create({
        userId,
        skills,
        availability,
        location,
    });

    return res.status(201).json(new ApiResponse(201, volunteer, "Volunteer registered successfully"));
});

// Get all volunteers
const getAllVolunteers = asyncHandler(async (req, res) => {
    const volunteers = await Volunteer.find()
        .populate("userId", "name email")
        .populate("assignedDisaster", "location severity status")
        .sort({ createdAt: -1 });

    return res.status(200).json(new ApiResponse(200, volunteers, "All volunteers fetched successfully"));
});

// Get volunteers by status
const getVolunteersByStatus = asyncHandler(async (req, res) => {
    const { status } = req.params;

    if (!["Available", "Assigned", "Inactive"].includes(status)) {
        throw new ApiError(400, "Invalid status");
    }

    const volunteers = await Volunteer.find({ status })
        .populate("userId", "name email")
        .populate("assignedDisaster", "location severity status");

    if (!volunteers.length) {
        throw new ApiError(404, "No volunteers found for this status");
    }

    return res.status(200).json(new ApiResponse(200, volunteers, `Volunteers with status '${status}' fetched successfully`));
});

// Update volunteer status
const updateVolunteerStatus = asyncHandler(async (req, res) => {
    const { volunteerId } = req.params;
    const { status } = req.body;
    console.log(req.body);

    if (!["Available", "Assigned", "Inactive"].includes(status)) {
        throw new ApiError(400, "Invalid status");
    }

    const volunteer = await Volunteer.findById(volunteerId);
    if (!volunteer) {
        throw new ApiError(404, "Volunteer not found");
    }

    volunteer.status = status;
    await volunteer.save();

    return res.status(200).json(new ApiResponse(200, volunteer, `Volunteer status updated to ${status}`));
});

// Assign a volunteer to a disaster
const assignVolunteerToDisaster = asyncHandler(async (req, res) => {
    const { volunteerId, disasterId } = req.body;

    const volunteer = await Volunteer.findById(volunteerId);
    if (!volunteer) {
        throw new ApiError(404, "Volunteer not found");
    }

    const disaster = await Disaster.findById(disasterId);
    if (!disaster) {
        throw new ApiError(404, "Disaster not found");
    }

    volunteer.assignedDisaster = disasterId;
    volunteer.status = "Assigned";
    await volunteer.save();

    return res.status(200).json(new ApiResponse(200, volunteer, "Volunteer assigned to disaster successfully"));
});

// Remove a volunteer from a disaster
const removeVolunteerAssignment = asyncHandler(async (req, res) => {
    const { volunteerId } = req.params;

    const volunteer = await Volunteer.findById(volunteerId);
    if (!volunteer) {
        throw new ApiError(404, "Volunteer not found");
    }

    volunteer.assignedDisaster = null;
    volunteer.status = "Available";
    await volunteer.save();

    return res.status(200).json(new ApiResponse(200, volunteer, "Volunteer assignment removed successfully"));
});

export {
    registerVolunteer,
    getAllVolunteers,
    getVolunteersByStatus,
    updateVolunteerStatus,
    assignVolunteerToDisaster,
    removeVolunteerAssignment
};
