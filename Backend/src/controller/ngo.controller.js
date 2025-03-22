import asyncHandler from "../utils/asyncHandler.js";
import NGO from "../models/ngo.model.js";
import User from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// Register a new NGO
const registerNGO = asyncHandler(async (req, res) => {
    const { userId, organizationName, registrationNumber, focusAreas, ...rest } = req.body;

    if (!userId || !organizationName || !registrationNumber || !focusAreas.length) {
        throw new ApiError(400, "All required fields must be provided");
    }

    const user = await User.findById(userId);
    if (!user || user.role !== "ngo") {
        throw new ApiError(403, "Invalid user ID or user is not an NGO");
    }

    const existingNGO = await NGO.findOne({ registrationNumber });
    if (existingNGO) {
        throw new ApiError(409, "NGO with this registration number already exists");
    }

    const ngo = await NGO.create({
        userId,
        organizationName,
        registrationNumber,
        focusAreas,
        ...rest,
    });

    return res.status(201).json(new ApiResponse(201, { ngo }, "NGO registered successfully"));
});

// Get NGO details
const getNGODetails = asyncHandler(async (req, res) => {
    const { ngoId } = req.params;

    const ngo = await NGO.findById(ngoId).populate("userId", "name email");
    if (!ngo) {
        throw new ApiError(404, "NGO not found");
    }

    return res.status(200).json(new ApiResponse(200, ngo, "NGO details fetched successfully"));
});

// Update NGO profile
const updateNGOProfile = asyncHandler(async (req, res) => {
    const { ngoId } = req.params;
    const updateData = req.body;

    const ngo = await NGO.findById(ngoId);
    if (!ngo) {
        throw new ApiError(404, "NGO not found");
    }

    Object.assign(ngo, updateData);
    await ngo.save();

    return res.status(200).json(new ApiResponse(200, ngo, "NGO profile updated successfully"));
});

// Delete NGO
const deleteNGO = asyncHandler(async (req, res) => {
    const { ngoId } = req.params;

    const ngo = await NGO.findById(ngoId);
    if (!ngo) {
        throw new ApiError(404, "NGO not found");
    }

    await NGO.findByIdAndDelete(ngoId);

    return res.status(200).json(new ApiResponse(200, {}, "NGO deleted successfully"));
});

export { registerNGO, getNGODetails, updateNGOProfile, deleteNGO };
