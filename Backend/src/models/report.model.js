import mongoose from "mongoose";

const DisasterRequestSchema = new mongoose.Schema({
  name:String,
  contactNumber:String,
  disasterType: {
    type: String,
    enum: ["earthquake", "flood", "fire", "hurricane", "other"],
  },
  location: {
    lati:String,
    long:String,
  },
  image: String,
  description: String,
  assistanceRequired: {
    type: String,
  },
  severity: {
    type: String,
    enum: ["low", "moderate", "high", "severe"],
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
