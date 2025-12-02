import {asyncHandler} from "../utils/asyncHandler.js";
import DisasterRequest from "../models/report.model.js";
import User from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import Disaster from "../models/disaster.model.js";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.VITE_API_KEY_GROQ,
  timeout: 30000
});

// AI Function to analyze disaster severity
const analyzeDisasterSeverity = async (description, disasterType, location) => {
  try {
    console.log("🤖 Starting AI Analysis...");
    console.log("Groq API Key exists:", !!process.env.VITE_API_KEY_GROQ);
    
    // Format location for the prompt
    const locationStr = typeof location === 'object' 
      ? `${location.lati}, ${location.long}` 
      : location;

    const prompt = `Analyze this disaster report and return ONLY a valid JSON object with these EXACT fields:
{
  "severity": "low" | "moderate" | "high" | "critical",
  "urgency_score": (number 1-10),
  "estimated_affected_people": (number),
  "recommended_resources": ["resource1", "resource2", "resource3", ...... ],
  "reasoning": "brief explanation about the disaster"
}

Disaster Type: ${disasterType}
Location: ${locationStr}
Description: ${description}

IMPORTANT: Return ONLY the JSON object, no markdown, no code blocks, no extra text.`;

    console.log("📝 Sending prompt to Groq...");
    
    const message = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: prompt
        }
      ],
      model: "llama-3.3-70b-versatile",
      max_tokens: 500,
      temperature: 0.3 // Lower temperature for more consistent JSON output
    });

    console.log("✅ Groq Response received");
    const response = message.choices[0].message.content;
    console.log("Raw Response:", response);

    // Clean the response - remove markdown code blocks if present
    let cleanedResponse = response
      .replace(/```json\n?/g, '')
      .replace(/```\n?/g, '')
      .trim();

    console.log("Cleaned Response:", cleanedResponse);

    const parsedResponse = JSON.parse(cleanedResponse);
    console.log("✨ Successfully parsed AI response:", parsedResponse);

    return parsedResponse;

  } catch (error) {
    console.error("❌ AI Analysis Error:", error);
    console.error("Error message:", error.message);
    console.error("Error status:", error.status);
    
    // Return null so we can handle it gracefully
    return null;
  }
};

// Fallback analysis when AI fails
const getFallbackAnalysis = (description, disasterType) => {
  console.log("⚠️ Using fallback analysis...");
  
  const fallbackMap = {
    earthquake: {
      severity: "high",
      urgency_score: 9,
      estimated_affected_people: 5000,
      recommended_resources: ["Medical Supplies", "Rescue Equipment", "Shelter", "Food & Water", "Emergency Communication"],
      reasoning: "Earthquake typically causes structural damage and multiple casualties"
    },
    flood: {
      severity: "high",
      urgency_score: 8,
      estimated_affected_people: 3000,
      recommended_resources: ["Boats & Life Jackets", "Food & Water", "Medical Supplies", "Shelter", "Sanitation Equipment"],
      reasoning: "Floods require immediate water rescue and disease prevention"
    },
    fire: {
      severity: "high",
      urgency_score: 9,
      estimated_affected_people: 2000,
      recommended_resources: ["Fire Extinguishers", "Medical Supplies", "Evacuation Transport", "Shelter", "Respiratory Equipment"],
      reasoning: "Fires spread rapidly and pose immediate life threat"
    },
    hurricane: {
      severity: "critical",
      urgency_score: 10,
      estimated_affected_people: 10000,
      recommended_resources: ["Emergency Shelters", "Food & Water", "Medical Supplies", "Generator Fuel", "Sanitation Kits"],
      reasoning: "Hurricanes cause widespread damage and displacement"
    },
    other: {
      severity: "moderate",
      urgency_score: 5,
      estimated_affected_people: 500,
      recommended_resources: ["Basic Medical Supplies", "Food & Water", "First Aid Kits"],
      reasoning: "Standard emergency response needed"
    }
  };

  return fallbackMap[disasterType] || fallbackMap.other;
};

// Create a new disaster request with AI analysis
const createDisasterRequest = asyncHandler(async (req, res) => {
    console.log("📥 Received Disaster Report Request");
    const { name, contactNumber, disasterType, location, image, description, assistanceRequired } = req.body;

    console.log("📋 Request Data:", { name, disasterType, location, description: description?.substring(0, 50) + "..." });

    // Validate required fields
    if (!disasterType || !description || !location) {
        throw new ApiError(400, "Missing required fields: disasterType, description, location");
    }

    if (!["earthquake", "flood", "fire", "hurricane", "other"].includes(disasterType)) {
        throw new ApiError(400, "Invalid disaster type");
    }

    // Get AI analysis for severity and resources
    console.log("🚀 Starting AI analysis...");
    let aiAnalysis = await analyzeDisasterSeverity(description, disasterType, location);
    
    // If AI analysis fails, use fallback
    if (!aiAnalysis) {
        console.log("⚠️ AI analysis failed, using fallback");
        aiAnalysis = getFallbackAnalysis(description, disasterType);
    }
    
    console.log("📊 Final AI Analysis:", aiAnalysis);

    // Create disaster request with AI-generated data
    const disasterRequest = await DisasterRequest.create({
        name,
        contactNumber,
        disasterType,
        location,
        description,
        assistanceRequired,
        image,
        severity: aiAnalysis?.severity || "moderate",
        urgencyScore: aiAnalysis?.urgency_score || 5,
        estimatedAffectedPeople: aiAnalysis?.estimated_affected_people || 0,
        recommendedResources: aiAnalysis?.recommended_resources || [],
        aiReasoning: aiAnalysis?.reasoning || "Standard analysis",
        isAIAnalyzed: !!aiAnalysis // Track if real AI was used
    });

    console.log("✅ Disaster Request Created:", disasterRequest._id);

    return res.status(201).json(new ApiResponse(201, disasterRequest, "Disaster request created and analyzed successfully"));
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

    return res.status(200).json(new ApiResponse(200, disasterRequests, `Disaster requests with status '${status}' fetched successfully`));
});

// Update disaster request status (Approve/Reject)
const updateDisasterRequestStatus = asyncHandler(async (req, res) => {
    const { requestId } = req.params;
    const { status, resolvedAt } = req.body;

    if (!["approved", "rejected"].includes(status)) {
        throw new ApiError(400, "Invalid status value");
    }

    const disasterRequest = await DisasterRequest.findById(requestId);
    if (!disasterRequest) {
        throw new ApiError(404, "Disaster request not found");
    }

    disasterRequest.status = status;
    if (status === "rejected") {
        disasterRequest.resolvedAt = resolvedAt;
    }
    await disasterRequest.save();

    return res.status(200).json(
        new ApiResponse(200, disasterRequest, `Disaster request ${status}`)
    );
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

// Get report by ID
const getReportById = asyncHandler(async (req, res) => {
    const id = req.params.id;

    console.log(id);
    const report = await DisasterRequest.findById(id);

    if (!report) {
        throw new ApiError(404, "Disaster report not found");
    }

    return res.status(200).json(new ApiResponse(200, report, "Disaster fetched successfully"));
});

// Resolve disaster
const resolveDisaster = asyncHandler(async (req, res) => {
    const { requestId } = req.params;
    const { status, resolvedAt } = req.body;

    // Find or create disaster record
    let disaster = await Disaster.findOne({ requestId });
    
    if (!disaster) {
        disaster = await Disaster.create({
            requestId,
            status: 'resolved',
            resolvedAt
        });
    } else {
        disaster.status = 'resolved';
        disaster.resolvedAt = resolvedAt;
        await disaster.save();
    }

    return res.status(200).json(
        new ApiResponse(200, disaster, "Disaster resolved successfully")
    );
});

export {
    createDisasterRequest,
    getAllDisasterRequests,
    getDisasterRequestsByStatus,
    updateDisasterRequestStatus,
    deleteDisasterRequest,
    getReportById,
    resolveDisaster,
    analyzeDisasterSeverity
};