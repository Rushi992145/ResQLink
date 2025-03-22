import mongoose from "mongoose";

const VolunteerSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    skills: [String],
    availability: {
      type: String,
      enum: ["Full-time", "Part-time", "On-call"],
      required: true,
    },
    location: {
      city: { type: String, required: true },
      district: { type: String },
      state: { type: String },
      country: { type: String, required: true },
    },
    assignedDisaster: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Disaster" 
    },
    status: {
      type: String,
      enum: ["Available", "Assigned", "Inactive"],
      default: "Available",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Volunteer", VolunteerSchema);
