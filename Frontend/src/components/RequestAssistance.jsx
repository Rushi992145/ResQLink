import React, { useState } from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";

const RequestAssistance = () => {
  const [formData, setFormData] = useState({
    disasterId: "",
    disasterType: "",
    location: "",
    requirements: [
      {
        type: "",
        quantity: "",
        urgent: false,
        status: "pending",
      },
    ],
    deadline: "",
    status: "active",
    description: "",
    contactNumber: "",
    name: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Get user's location when component mounts
  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const locationString = `${position.coords.latitude}, ${position.coords.longitude}`;
          setFormData((prev) => ({
            ...prev,
            location: locationString,
          }));
        },
        (error) => {
          console.error("Error getting location:", error);
          setError("Failed to get location. Please enter manually.");
        }
      );
    }
  };

  const handleAddRequirement = () => {
    setFormData({
      ...formData,
      requirements: [
        ...formData.requirements,
        { type: "", quantity: "", urgent: false, status: "pending" },
      ],
    });
  };

  const handleRemoveRequirement = (index) => {
    const updatedRequirements = formData.requirements.filter(
      (_, i) => i !== index
    );
    setFormData({
      ...formData,
      requirements: updatedRequirements,
    });
  };

  const handleRequirementChange = (index, field, value) => {
    const updatedRequirements = [...formData.requirements];
    updatedRequirements[index] = {
      ...updatedRequirements[index],
      [field]: value,
    };
    setFormData({
      ...formData,
      requirements: updatedRequirements,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      // Create the aid request with all required fields from the schema
      const aidRequestBody = {
        name: formData.name,
        contactNumber: formData.contactNumber,
        disasterType: formData.disasterType,
        location: formData.location,
        requirements: formData.requirements.map((req) => ({
          type: req.type,
          quantity: req.quantity,
          urgent: req.urgent,
          status: "pending",
        })),
        deadline: formData.deadline,
        description: formData.description,
        status: "active",
      };

      console.log("Sending Aid Request:", aidRequestBody);

      const aidResponse = await fetch("http://localhost:3000/api/aid/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(aidRequestBody),
      });

      // Check if the response was not ok (e.g., 4xx, 5xx status codes)
      if (!aidResponse.ok) {
        const aidErrorData = await aidResponse.json();
        throw new Error(
          aidErrorData.message || `HTTP error! status: ${aidResponse.status}`
        );
      }

      const aidData = await aidResponse.json();
      console.log("Aid Response:", aidData);

      if (aidData.success) {
        setSuccess(true);
        // Reset form with all fields
        setFormData({
          name: "",
          contactNumber: "",
          disasterType: "",
          location: "",
          requirements: [
            { type: "", quantity: "", urgent: false, status: "pending" },
          ],
          deadline: "",
          description: "",
          status: "active",
        });
      } else {
        throw new Error(aidData.message || "Failed to create aid request");
      }
    } catch (error) {
      console.error("Error submitting request:", error);
      setError(
        error.message ||
          "Failed to submit request. Please check all required fields and try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-b from-green-50 to-green-100">
      <div className="container mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto"
        >
          <h1 className="text-3xl font-bold text-green-800 mb-2 text-center">
            Request Assistance
          </h1>
          <p className="text-gray-600 text-center mb-8 text-sm">
            Please provide details about the assistance needed for the disaster.
          </p>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
              Aid request submitted successfully!
            </div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg p-8"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-1 text-sm">
                    Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-4 py-2 rounded-lg border focus:ring-green-500 focus:border-green-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-1 text-sm">
                    Contact Number
                  </label>
                  <input
                    type="tel"
                    value={formData.contactNumber}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        contactNumber: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 rounded-lg border focus:ring-green-500 focus:border-green-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 mb-1 text-sm">
                  Disaster Type
                </label>
                <input
                  type="text"
                  value={formData.disasterType}
                  onChange={(e) =>
                    setFormData({ ...formData, disasterType: e.target.value })
                  }
                  className="w-full px-4 py-2 rounded-lg border focus:ring-green-500 focus:border-green-500"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1 text-sm">
                  Location
                </label>
                <div className="flex gap-4">
                  <input
                    type="text"
                    placeholder="Location (e.g., City, State)"
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                    className="w-full px-4 py-2 rounded-lg border focus:ring-green-500 focus:border-green-500"
                    required
                  />
                  <button
                    type="button"
                    onClick={handleGetLocation}
                    className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200"
                  >
                    📍 Get Location
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-gray-700 mb-1 text-sm">
                  Requirements
                </label>
                {formData.requirements.map((req, index) => (
                  <div key={index} className="flex gap-4 mb-4">
                    <input
                      type="text"
                      placeholder="Type"
                      value={req.type}
                      onChange={(e) =>
                        handleRequirementChange(index, "type", e.target.value)
                      }
                      className="flex-1 px-4 py-2 rounded-lg border focus:ring-green-500 focus:border-green-500"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Quantity"
                      value={req.quantity}
                      onChange={(e) =>
                        handleRequirementChange(
                          index,
                          "quantity",
                          e.target.value
                        )
                      }
                      className="flex-1 px-4 py-2 rounded-lg border focus:ring-green-500 focus:border-green-500"
                      required
                    />
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={req.urgent}
                        onChange={(e) =>
                          handleRequirementChange(
                            index,
                            "urgent",
                            e.target.checked
                          )
                        }
                        className="mr-2"
                      />
                      Urgent
                    </label>
                    {index > 0 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveRequirement(index)}
                        className="px-3 py-1 text-red-500 hover:text-red-700"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={handleAddRequirement}
                  className="text-green-500 hover:text-green-700"
                >
                  + Add Requirement
                </button>
              </div>

              <div>
                <label className="block text-gray-700 mb-1 text-sm">
                  Deadline
                </label>
                <input
                  type="datetime-local"
                  value={formData.deadline}
                  onChange={(e) =>
                    setFormData({ ...formData, deadline: e.target.value })
                  }
                  className="w-full px-4 py-2 rounded-lg border focus:ring-green-500 focus:border-green-500"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1 text-sm">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full px-4 py-2 rounded-lg border focus:ring-green-500 focus:border-green-500"
                  rows="3"
                  required
                ></textarea>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className={`w-full ${
                  isSubmitting
                    ? "bg-gray-400"
                    : "bg-green-600 hover:bg-green-700"
                } text-white py-3 rounded-lg transition-colors font-semibold flex items-center justify-center`}
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Submitting...
                  </>
                ) : (
                  "Submit Request"
                )}
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default RequestAssistance;
