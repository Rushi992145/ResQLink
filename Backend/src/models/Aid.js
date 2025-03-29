import mongoose from "mongoose";

const aidSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: String,
    required: true,
  },
  disasterType: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  requirements: [
    {
      type: {
        type: String,
        required: true,
      },
      quantity: {
        type: String,
        required: true,
      },
      urgent: {
        type: Boolean,
        default: false,
      },
      status: {
        type: String,
        enum: ["pending", "fulfilled", "partially-fulfilled"],
        default: "pending",
      },
    },
  ],
  deadline: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["active", "completed", "expired"],
    default: "active",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Aid", aidSchema);
