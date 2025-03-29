import mongoose from "mongoose";

const DisasterSchema = new mongoose.Schema(
  {
    requestId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DisasterRequest",    
    },
    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    severity: {
      type: String,
      enum: ["low", "moderate", "high", "severe","Low","Moderate","High","Severe"],
    },
    affectedPeople: Number,
    status: {
      type: String,
      enum: ["ongoing","pending","resolved"],
      default: "ongoing",
    },
    assignedVolunteers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    assignedNGOs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "NGO",
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Disaster", DisasterSchema);
