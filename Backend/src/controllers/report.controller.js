import {asyncHandler} from "../utils/asyncHandler.js";
import DisasterRequest from "../models/report.model.js";
import User from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// Create a new disaster request
const createDisasterRequest = asyncHandler(async (req, res) => {
    console.log("Request Body"); 
    const { name,contactNumber, disasterType, location, image, description, assistanceRequired, severity } = req.body;

    console.log("Received Data:", req.body); // Debugging

    // Validate required fields
    if (!disasterType || !severity) {
        throw new ApiError(400, "Missing required fields");
    }

    if (!["earthquake", "flood", "fire", "hurricane", "other"].includes(disasterType)) {
        throw new ApiError(400, "Invalid disaster type");
    }

    if (!["low", "moderate", "high", "severe"].includes(severity)) {
        throw new ApiError(400, "Invalid severity level");
    }

    // Ensure `userId` is set to `null` for anonymous users
    const disasterRequest = await DisasterRequest.create({
        name,
        contactNumber,
        disasterType,
        location,
        description,
        assistanceRequired,
        image,
        severity,
    });
    console.log("Disaster Request:", disasterRequest); // Debugging

    return res.status(201).json(new ApiResponse(201, disasterRequest, "Disaster request created successfully"));
});


// Get all disaster requests
const getAllDisasterRequests = asyncHandler(async (req, res) => {
    const disasterRequests = await DisasterRequest.find()
        .sort({ reportedAt: -1 });

    return res.status(200).json(new ApiResponse(200, disasterRequests, "All disaster requests fetched successfully"));
});

// Get disaster requests by status
const getDisasterRequestsByStatus = asyncHandler(async (req, res) => {
    const { status } = req.params;
    console.log("Status:", status);

    if (!["pending", "approved", "rejected"].includes(status)) {
        throw new ApiError(400, "Invalid status");
    }

    const disasterRequests = await DisasterRequest.find({ status })
        .sort({ reportedAt: -1 });

    // if (!disasterRequests.length) {
    //     throw new ApiError(404, "No disaster requests found for this status");
    // }

    return res.status(200).json(new ApiResponse(200, disasterRequests, `Disaster requests with status '${status}' fetched successfully`));
});

// Update disaster request status (Approve/Reject)
const updateDisasterRequestStatus = asyncHandler(async (req, res) => {
    const { requestId } = req.params;
    const { status } = req.body;

    if (!["approved", "rejected"].includes(status)) {
        throw new ApiError(400, "Invalid status value");
    }

    const disasterRequest = await DisasterRequest.findById(requestId);
    if (!disasterRequest) {
        throw new ApiError(404, "Disaster request not found");
    }

    disasterRequest.status = status;
    await disasterRequest.save();

    return res.status(200).json(new ApiResponse(200, disasterRequest, `Disaster request status updated to ${status}`));
});

// Delete a disaster request
const deleteDisasterRequest = asyncHandler(async (req, res) => {
    const { requestId } = req.params;

    const disasterRequest = await DisasterRequest.findById(requestId);
    if (!disasterRequest) {
        throw new ApiError(404, "Disaster request not found");
    }

    await DisasterRequest.findByIdAndDelete(requestId);

    return res.status(200).json(new ApiResponse(200, {}, "Disaster request deleted successfully"));
});

export {
    createDisasterRequest,
    getAllDisasterRequests,
    getDisasterRequestsByStatus,
    updateDisasterRequestStatus,
    deleteDisasterRequest
};
