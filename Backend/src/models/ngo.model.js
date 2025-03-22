import mongoose from "mongoose";

const NGOSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    organizationName: {
      type: String,
      required: true,
    },
    registrationNumber: {
      type: String,
      unique: true,
      required: true,
    },
    missionStatement: String,
    contactPerson: String,
    contactNumber: String,
    address: String,
    focusAreas: {
      type: [String],
      required: true,
    },
    activeDisasters: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Disaster",
      },
    ],
    website: String,
    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
  },
  { timestamps: true }
);

export default mongoose.model("NGO", NGOSchema);
