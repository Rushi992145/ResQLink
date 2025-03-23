import React from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const DisasterDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { disaster, status } = state || {};

  const getStatusStyles = () => {
    switch (status) {
      case "pending":
        return {
          bgColor: "bg-yellow-50",
          textColor: "text-yellow-800",
          borderColor: "border-yellow-200",
          buttonClass: "bg-yellow-500 hover:bg-yellow-600",
          icon: "⚠️",
          statusBadge: "bg-yellow-100 text-yellow-800",
        };
      case "active":
        return {
          bgColor: "bg-red-50",
          textColor: "text-red-800",
          borderColor: "border-red-200",
          buttonClass: "bg-red-500 hover:bg-red-600",
          icon: "🔴",
          statusBadge: "bg-red-100 text-red-800",
        };
      case "resolved":
        return {
          bgColor: "bg-green-50",
          textColor: "text-green-800",
          borderColor: "border-green-200",
          buttonClass: "bg-green-500 hover:bg-green-600",
          icon: "✅",
          statusBadge: "bg-green-100 text-green-800",
        };
      default:
        return {
          bgColor: "bg-gray-50",
          textColor: "text-gray-800",
          borderColor: "border-gray-200",
          buttonClass: "bg-gray-500 hover:bg-gray-600",
          icon: "ℹ️",
          statusBadge: "bg-gray-100 text-gray-800",
        };
    }
  };

  const styles = getStatusStyles();

  if (!disaster) {
    return (
      <div className="min-h-screen bg-gray-100 pt-16">
        <div className="container mx-auto px-6 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800">
              Disaster not found
            </h1>
            <button
              onClick={() => navigate("/admin-dashboard")}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Return to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${styles.bgColor} pt-16`}>
      <div className="container mx-auto px-6 py-8">
        {/* Navigation */}
        <div className="mb-8">
          <button
            onClick={() => navigate("/admin-dashboard")}
            className="flex items-center text-gray-600 hover:text-gray-800"
          >
            ← Back to Dashboard
          </button>
        </div>

        {/* Header */}
        <div
          className={`bg-white rounded-xl shadow-lg p-8 mb-8 border-l-4 ${styles.borderColor}`}
        >
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">{styles.icon}</span>
                <h1 className="text-3xl font-bold text-gray-800">
                  {disaster.type}
                </h1>
              </div>
              <p className="text-lg text-gray-600">📍 {disaster.location}</p>
            </div>
            <span
              className={`px-4 py-2 rounded-full text-sm font-medium ${styles.statusBadge}`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <h2 className="text-xl font-semibold mb-4">Disaster Information</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Description
                </h3>
                <p className="mt-1 text-gray-800">{disaster.description}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Severity Level
                  </h3>
                  <p className="mt-1 text-gray-800">⚠️ {disaster.severity}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Affected People
                  </h3>
                  <p className="mt-1 text-gray-800">
                    👥 {disaster.affectedPeople}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Reported Date
                  </h3>
                  <p className="mt-1 text-gray-800">📅 {disaster.reportedAt}</p>
                </div>
                {status === "resolved" && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Resolved Date
                    </h3>
                    <p className="mt-1 text-gray-800">
                      ✅ {disaster.resolvedAt}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={`bg-white rounded-xl shadow-lg p-6 border ${styles.borderColor}`}
          >
            <h2 className="text-xl font-semibold mb-4">Actions</h2>
            <div className="flex justify-center">
              {status === "pending" && (
                <button className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 font-medium">
                  Alert Volunteers
                </button>
              )}
              {status === "active" && (
                <button className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 font-medium">
                  Mark as Resolved
                </button>
              )}
              {status === "resolved" && (
                <p className="text-gray-600 italic">
                  This disaster has been resolved
                </p>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default DisasterDetailsPage;
