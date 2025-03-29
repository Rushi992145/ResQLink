import mongoose from "mongoose";

const VolunteerSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    skills: String,
    availability: {
      type: String,
      enum: ["Full-time", "Part-time", "On-call"],
    },
    phone: { type: String },
    city: { type: String },
    address: { type: String },
    bloodGroup: { type: String },
    aadharNumber: { type: String },
    familyContact: { type: String },
    emergencyContact: { type: String },
    assignedDisaster: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Disaster"
    },
    status: {
      type: String,
      enum: ["Available", "Assigned", "Inactive"],
      default: "Available",
    },
    disasterAssigned : { type: mongoose.Schema.Types.ObjectId,
      ref: "DisasterRequest",
      default: null,
    }
  },
  { timestamps: true }
);

export default mongoose.model("Volunteer", VolunteerSchema);
