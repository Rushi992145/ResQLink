import mongoose from "mongoose";

const DisasterSchema = new mongoose.Schema(
  {
    requestId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DisasterRequest",
      required: true,
    },
    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    location: String,
    severity: {
      type: String,
      enum: ["low", "moderate", "high", "severe"],
      required: true,
    },
    affectedPeople: Number,
    status: {
      type: String,
      enum: ["ongoing", "resolved"],
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
