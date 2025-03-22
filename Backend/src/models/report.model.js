import mongoose from "mongoose";

const DisasterRequestSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  disasterType: {
    type: String,
    enum: ["earthquake", "flood", "fire", "hurricane", "other"],
    required: true,
  },
  location: String,
  image: String,
  severity: {
    type: String,
    enum: ["low", "moderate", "high", "severe"],
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
  reportedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("DisasterRequest", DisasterRequestSchema);
