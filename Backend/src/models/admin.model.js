import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    contactNumber: String,
    role: {
      type: String,
      enum: ["superadmin", "admin"],
      default: "admin",
    },
    assignedDisasters: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Disaster",
      },
    ],
    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Admin", AdminSchema);
