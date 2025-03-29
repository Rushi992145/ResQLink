import Aid from "../models/Aid.js";

// Create new aid requirement
export const createAid = async (req, res) => {
  try {
    const {
      name,
      contactNumber,
      disasterType,
      location,
      requirements,
      deadline,
      description,
    } = req.body;

    // Check if all required fields are provided
    if (
      !name ||
      !contactNumber ||
      !disasterType ||
      !location ||
      !requirements ||
      !deadline ||
      !description
    ) {
      console.log("Missing required fields:", {
        name,
        contactNumber,
        disasterType,
        location,
        requirements,
        deadline,
        description,
      });

      return res.status(400).json({
        success: false,
        message:
          "All fields (name, contactNumber, disasterType, location, requirements, deadline, description) are required",
      });
    }

    // Validate 'requirements' structure
    if (!Array.isArray(requirements)) {
      return res.status(400).json({
        success: false,
        message: "'requirements' must be an array",
      });
    }

    // Ensure each requirement has necessary properties
    for (let req of requirements) {
      if (!req.type || !req.quantity || req.urgent === undefined) {
        return res.status(400).json({
          success: false,
          message:
            "Each requirement must have 'type', 'quantity', and 'urgent' properties",
        });
      }
    }

    // Parse and validate deadline (ensure it is a valid date)
    const parsedDeadline = new Date(deadline);
    if (isNaN(parsedDeadline)) {
      return res.status(400).json({
        success: false,
        message: "Invalid date format for deadline",
      });
    }

    // Create aid requirement
    const aid = await Aid.create({
      name,
      contactNumber,
      disasterType,
      location,
      requirements,
      deadline: parsedDeadline,
      description,
    });

    res.status(201).json({
      success: true,
      message: "Aid requirement created successfully",
      data: aid,
    });
  } catch (error) {
    console.error("Error creating aid:", error);

    res.status(500).json({
      success: false,
      message: error.message || "Server error while creating aid requirement",
    });
  }
};

// Get all aid requirements
export const getAllAid = async (req, res) => {
  try {
    const aids = await Aid.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: aids,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get aid by ID
export const getAidById = async (req, res) => {
  try {
    const aid = await Aid.findById(req.params.id);
    if (!aid) {
      return res.status(404).json({
        success: false,
        message: "Aid requirement not found",
      });
    }

    res.status(200).json({
      success: true,
      data: aid,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update aid requirement
export const updateAid = async (req, res) => {
  try {
    const { requirements, status, description } = req.body;
    const aid = await Aid.findById(req.params.id);

    if (!aid) {
      return res.status(404).json({
        success: false,
        message: "Aid requirement not found",
      });
    }

    if (requirements) aid.requirements = requirements;
    if (status) aid.status = status;
    if (description) aid.description = description;
    aid.updatedAt = Date.now();

    await aid.save();

    res.status(200).json({
      success: true,
      message: "Aid requirement updated successfully",
      data: aid,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete aid requirement
export const deleteAid = async (req, res) => {
  try {
    const aid = await Aid.findById(req.params.id);
    if (!aid) {
      return res.status(404).json({
        success: false,
        message: "Aid requirement not found",
      });
    }

    await aid.remove();

    res.status(200).json({
      success: true,
      message: "Aid requirement deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update requirement status
export const updateRequirementStatus = async (req, res) => {
  try {
    const { requirementId, status } = req.body;
    const aid = await Aid.findById(req.params.id);

    if (!aid) {
      return res.status(404).json({
        success: false,
        message: "Aid requirement not found",
      });
    }

    const requirement = aid.requirements.id(requirementId);
    if (!requirement) {
      return res.status(404).json({
        success: false,
        message: "Requirement not found",
      });
    }

    requirement.status = status;
    aid.updatedAt = Date.now();

    await aid.save();

    res.status(200).json({
      success: true,
      message: "Requirement status updated successfully",
      data: aid,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
