import React, { useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

const DisasterDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { disaster, status } = state || {};
  const [isNotifying, setIsNotifying] = useState(false);
  const longitude = useSelector((state) => state.auth.longitude);
  const lattitude = useSelector((state) => state.auth.lattitude);

  const title = "Alert!! A disaster is happend and alot of people needs you help";
  const body =  "Please check your disaster-relief portal to get more information about the disaster and further instructions";

  async function sendnotificationhandler()
  {
    try 
    {
      const response = await fetch('http://localhost:3000/api/notification/sendnotification',{
        method : 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body : JSON.stringify({title,body,longitude,lattitude})
      })

      const value = await response.json();
      console.log(value);
    }
    catch(error)
    {
      console.log(error.message);
    }
  }

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

  const sendVolunteerAlert = async () => {
    setIsNotifying(true);
    try {
      const response = await fetch(
        "http://localhost:3000/api/notification/sendnotification",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: "A disaster is happened and alot of people needs you help",
            body: "Please check your disaster-relief portal to get more information about the disaster and further instructions",
            longitude: longitude,
            lattitude: lattitude,
            disasterId: disaster._id
          }),
        }
      );

      const data = await response.json();
      console.log("Notification Response:", data);

      if (response.ok) {
        alert("Volunteers have been notified successfully!");
        navigate("/admin-dashboard");
      } else {
        alert("Failed to notify volunteers. Please try again.");
      }
    } catch (error) {
      console.error("Error sending notification:", error);
      alert("Error sending notification. Please try again.");
    } finally {
      setIsNotifying(false);
    }
  };

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
                  {disaster.disasterType}
                </h1>
              </div>
              <p className="text-lg text-gray-600">
                📍{" "}
                {disaster.location
                  ? `${disaster.location.lati}, ${disaster.location.long}`
                  : "Location not available"}
              </p>
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
                <p className="mt-1 text-gray-800">
                  {disaster.description || "No description available"}
                </p>
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
                    Reporter
                  </h3>
                  <p className="mt-1 text-gray-800">
                    👤 {disaster.name || "Anonymous"}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Contact Number
                  </h3>
                  <p className="mt-1 text-gray-800">
                    📞 {disaster.contactNumber || "Not provided"}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Assistance Required
                  </h3>
                  <p className="mt-1 text-gray-800">
                    {disaster.assistanceRequired || "Not specified"}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Reported Date
                  </h3>
                  <p className="mt-1 text-gray-800">
                    📅 {new Date(disaster.reportedAt).toLocaleDateString()}
                  </p>
                </div>
                {status === "resolved" && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Resolved Date
                    </h3>
                    <p className="mt-1 text-gray-800">
                      ✅{" "}
                      {disaster.resolvedAt
                        ? new Date(disaster.resolvedAt).toLocaleDateString()
                        : "Not available"}
                    </p>
                  </div>
                )}
              </div>
              {disaster.image && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Disaster Image
                  </h3>
                  <img
                    src={disaster.image}
                    alt="Disaster"
                    className="mt-2 rounded-lg max-w-full h-auto"
                  />
                </div>
              )}
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
                <button
                  onClick={sendVolunteerAlert}
                  disabled={isNotifying}
                  className={`px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 font-medium flex items-center ${
                    isNotifying ? "opacity-75 cursor-not-allowed" : ""
                  }`}
                >
                  {isNotifying ? (
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
                      Notifying...
                    </>
                  ) : (
                    "Alert Volunteers"
                  )}
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
