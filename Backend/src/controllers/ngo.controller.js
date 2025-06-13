import { asyncHandler } from "../utils/asyncHandler.js";
import NGO from "../models/ngo.model.js";
import User from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// Register a new NGO
const updateNGO = asyncHandler(async (req, res) => {
  const {
    userId,
    organizationName,
    registrationNumber,
    focusAreas,
    address,
    contact,
    website,
    city,
  } = req.body;

  console.log(req.body);

  // Validate required fields
  // if (!userId || !organizationName || !registrationNumber || !focusAreas?.length) {
  //     throw new ApiError(400, "Missing required fields");
  // }

  // Check if user exists and is an NGO
  const user = await User.findById(userId);
  if (!user || user.role !== "ngo") {
    throw new ApiError(403, "Invalid user ID or user is not an NGO");
  }

  // Find NGO by userId (since userId is a field, not _id)
  let ngo = await NGO.findOne({ userId });

  if (ngo) {
    // Update existing NGO
    ngo.organizationName = organizationName;
    ngo.registrationNumber = registrationNumber;
    ngo.focusAreas = focusAreas;
    ngo.address = address;
    ngo.contact = contact;
    ngo.website = website;
    ngo.city = city;

    await ngo.save();

    return res
      .status(200)
      .json(new ApiResponse(200, ngo, "NGO updated successfully"));
  } else {
    // Create new NGO if not found
    ngo = await NGO.create({
      userId,
      organizationName,
      registrationNumber,
      focusAreas,
      address,
      contact,
      website,
    });

    return res
      .status(201)
      .json(new ApiResponse(201, ngo, "NGO registered successfully"));
  }
});

// Get NGO details
const getNGODetails = asyncHandler(async (req, res) => {
  try {
    const { id } = req.body; // Extract volunteer ID from URL params

    const ngo = await NGO.findOne({ userId: id }).populate(
      "userId",
      "email"
    );
    if (!ngo) {
      throw new ApiError(404, "NGO not found");
    }

    return res
      .status(200)
      .json(new ApiResponse(200, ngo, "NGO details fetched successfully"));
  } catch (error) {
    console.error("Error fetching volunteer details:", error);
    res.status(500).json({ message: "Server error" });
  }
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

  return res
    .status(200)
    .json(new ApiResponse(200, ngo, "NGO profile updated successfully"));
});


const getAllNgos = asyncHandler(async (req, res) => {
    console.log("Get all NGOs");

    const ngos = await NGO.find();
    res.status(200).json({ success: true, data: ngos });
});

// Delete NGO
const deleteNGO = asyncHandler(async (req, res) => {
  const { ngoId } = req.params;

  const ngo = await NGO.findById(ngoId);
  if (!ngo) {
    throw new ApiError(404, "NGO not found");
  }

  await NGO.findByIdAndDelete(ngoId);

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "NGO deleted successfully"));
});

export { updateNGO,getAllNgos, getNGODetails, updateNGOProfile, deleteNGO };
