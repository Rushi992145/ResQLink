import React, { useState } from "react";
import { motion } from "framer-motion";

const RequestAssistance = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    location: "",
    peopleAffected: "",
    assistanceType: [],
    urgencyLevel: "medium",
    description: "",
  });

  const handleAssistanceTypeChange = (type) => {
    const updatedTypes = formData.assistanceType.includes(type)
      ? formData.assistanceType.filter((t) => t !== type)
      : [...formData.assistanceType, type];
    setFormData({ ...formData, assistanceType: updatedTypes });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-b from-green-50 to-green-100">
      <div className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto"
        >
          <h1 className="text-4xl font-bold text-green-800 mb-6 text-center">
            Request Assistance
          </h1>
          <p className="text-gray-600 text-center mb-8">
            Please provide details about the assistance you need. We'll connect
            you with the right resources.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg p-8"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 rounded-lg border focus:ring-green-500 focus:border-green-500"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    className="w-full px-4 py-2 rounded-lg border focus:ring-green-500 focus:border-green-500"
                    placeholder="Your phone number"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Location</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded-lg border focus:ring-green-500 focus:border-green-500"
                  placeholder="Your current location"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-4">
                  Type of Assistance Needed
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[
                    "Medical",
                    "Food",
                    "Shelter",
                    "Water",
                    "Clothing",
                    "Transportation",
                  ].map((type) => (
                    <motion.div
                      key={type}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="relative"
                    >
                      <input
                        type="checkbox"
                        id={type}
                        className="sr-only"
                        checked={formData.assistanceType.includes(type)}
                        onChange={() => handleAssistanceTypeChange(type)}
                      />
                      <label
                        htmlFor={type}
                        className={`block p-3 text-center rounded-lg cursor-pointer border transition-colors
                          ${
                            formData.assistanceType.includes(type)
                              ? "bg-green-500 text-white border-green-500"
                              : "bg-white text-gray-700 border-gray-300 hover:border-green-500"
                          }`}
                      >
                        {type}
                      </label>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-gray-700 mb-2">
                  Urgency Level
                </label>
                <select
                  className="w-full px-4 py-2 rounded-lg border focus:ring-green-500 focus:border-green-500"
                  value={formData.urgencyLevel}
                  onChange={(e) =>
                    setFormData({ ...formData, urgencyLevel: e.target.value })
                  }
                  required
                >
                  <option value="low">Low - Within a week</option>
                  <option value="medium">Medium - Within 2-3 days</option>
                  <option value="high">High - Within 24 hours</option>
                  <option value="critical">Critical - Immediate</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 mb-2">
                  Additional Details
                </label>
                <textarea
                  className="w-full px-4 py-2 rounded-lg border focus:ring-green-500 focus:border-green-500"
                  rows="4"
                  placeholder="Please provide any additional information that might help us assist you better"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                ></textarea>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold"
              >
                Submit Request
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default RequestAssistance;
