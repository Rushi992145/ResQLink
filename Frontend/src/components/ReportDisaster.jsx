import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

const ReportDisaster = () => {
  const [formData, setFormData] = useState({
    disasterType: "",
    location: {
      lati: "",
      long: "",
    },
    address: "",
    description: "",
    severity: "moderate",
    peopleAffected: "",
    name: "",
    contactNumber: "",
    images: [],
  });

  const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const clocation = {
            lati: position.coords.latitude,
            long: position.coords.longitude,
          };
          console.log("Retrieved location:", clocation);
          setFormData((prevData) => ({
            ...prevData,
            location: clocation,
          }));
          resolve(clocation);
        },
        (error) => reject(error)
      );
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("here");
    toast.success("Submitted disaster report...");
    try {
      const location = await getCurrentLocation(); // Ensure location is updated before submission
      console.log("Submitting with location:", location);

      const response = await fetch("http://localhost:3000/api/report/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, location }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      toast.success("Disaster report submitted successfully!");
      console.log("Disaster report submitted successfully!");

      // Reset the form
      setFormData({
        disasterType: "",
        location: { lati: "", long: "" },
        address: "",
        description: "",
        severity: "moderate",
        peopleAffected: "",
        name: "",
        contactNumber: "",
        images: [],
      });
    } catch (error) {
      console.error("Error submitting disaster report:", error);
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
            Report a Disaster
          </h1>
          <p className="text-gray-600 text-center mb-8 text-sm">
            Your quick action can help save lives. Please provide as much detail
            as possible.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg p-8"
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-1 text-sm">
                    Disaster Type
                  </label>
                  <select
                    className="w-full px-4 py-2 rounded-lg border focus:ring-green-500 focus:border-green-500"
                    value={formData.disasterType}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        disasterType: e.target.value,
                      }))
                    }
                    required
                  >
                    <option value="">Select Type</option>
                    <option value="flood">Flood</option>
                    <option value="earthquake">Earthquake</option>
                    <option value="fire">Fire</option>
                    <option value="hurricane">Hurricane</option>
                    <option value="landslide">Landslide</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 mb-1 text-sm">
                    Severity Level
                  </label>
                  <select
                    className="w-full px-4 py-2 rounded-lg border focus:ring-green-500 focus:border-green-500"
                    value={formData.severity}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        severity: e.target.value,
                      }))
                    }
                    required
                  >
                    <option value="mild">Mild</option>
                    <option value="moderate">Moderate</option>
                    <option value="severe">Severe</option>
                    <option value="critical">Critical</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-gray-700 mb-1 text-sm">
                  Address
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded-lg border focus:ring-green-500 focus:border-green-500"
                  placeholder="Enter the exact location/address of the disaster"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      address: e.target.value,
                    }))
                  }
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1 text-sm">
                  Description
                </label>
                <textarea
                  className="w-full px-4 py-2 rounded-lg border focus:ring-green-500 focus:border-green-500"
                  rows="3"
                  placeholder="Describe the situation in detail"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  required
                ></textarea>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-1 text-sm">
                    Contact Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 rounded-lg border focus:ring-green-500 focus:border-green-500"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, name: e.target.value }))
                    }
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-1 text-sm">
                    Contact Phone
                  </label>
                  <input
                    type="tel"
                    className="w-full px-4 py-2 rounded-lg border focus:ring-green-500 focus:border-green-500"
                    placeholder="Your phone number"
                    value={formData.contactNumber}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        contactNumber: e.target.value,
                      }))
                    }
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 mb-1 text-sm">
                  Upload Images (if any)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="w-full px-4 py-2 rounded-lg border focus:ring-green-500 focus:border-green-500"
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      images: Array.from(e.target.files),
                    }))
                  }
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors font-semibold"
              >
                Submit Report
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default ReportDisaster;
