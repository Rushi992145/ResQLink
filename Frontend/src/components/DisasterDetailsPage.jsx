import React, { useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import Navigation from "../components/Navigation";
import Marker from "./Marker";

const DisasterDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { disaster, status } = state || {};
  const [volunteerLocations, setVolunteerLocations] = useState([]);

  const [isNotifying, setIsNotifying] = useState(false);
  const longitude = useSelector((state) => state.auth.longitude);
  const lattitude = useSelector((state) => state.auth.lattitude);

  const [isResolvingDisaster, setIsResolvingDisaster] = useState(false);

  const title =
    "Alert!! A disaster is happend and alot of people needs you help";
  const body =
    "Please check your disaster-relief portal to get more information about the disaster and further instructions";

  async function sendnotificationhandler() {
    try {
      const response = await fetch(
        "http://localhost:3000/api/notification/sendnotification",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title, body, longitude, lattitude }),
        }
      );

      const value = await response.json();
      console.log(value);
    } catch (error) {
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
            disasterId: disaster._id,
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

  const handleMarkResolved = async () => {
    setIsResolvingDisaster(true);
    try {
      // First update the disaster request status
      const reportResponse = await fetch(`http://localhost:3000/api/report/${disaster._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ 
          status: 'rejected', // Using 'rejected' as resolved status
          resolvedAt: new Date().toISOString() // Add resolved date
        })
      });

      if (!reportResponse.ok) {
        throw new Error('Failed to update disaster report status');
      }

      // Create a disaster record if it doesn't exist and update its status
      const disasterResponse = await fetch(`http://localhost:3000/api/report/resolve/${disaster._id}`, {
        method: 'POST', // Changed to POST as we're creating/updating a record
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ 
          status: 'resolved',
          resolvedAt: new Date().toISOString()
        })
      });

      if (!disasterResponse.ok) {
        throw new Error('Failed to update disaster status');
      }

      // Update volunteer status for this disaster
      const volunteerResponse = await fetch(`http://localhost:3000/api/volunteer/complete-disaster/${disaster._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!volunteerResponse.ok) {
        throw new Error('Failed to update volunteer status');
      }

      alert('Disaster marked as resolved successfully');
      navigate('/admin-dashboard'); // Redirect back to dashboard
    } catch (error) {
      console.error('Error marking disaster as resolved:', error);
    } finally {
      setIsResolvingDisaster(false);
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
    <div className={`min-h-screen w-full ${styles.bgColor} pt-16`}>
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

          {/* Map Container */}
          <div className="mt-6 bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-4 border-b">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                <svg
                  className="w-5 h-5 mr-2 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                Disaster Location
              </h3>
            </div>
            <div className="relative h-[400px] w-full">
              <div className="absolute inset-0 bg-gray-50 animate-pulse rounded-b-xl">
                <Marker
                  longitude={disaster.location.long}
                  latitude={disaster.location.lati}
                  volunteerLocations={volunteerLocations}
                />
              </div>
              {/* Map Controls Overlay */}
              <div className="absolute top-4 right-4 space-y-2">
                <button className="p-2 bg-white rounded-lg shadow-md hover:bg-gray-50 transition-colors">
                  <svg
                    className="w-5 h-5 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
                <button className="p-2 bg-white rounded-lg shadow-md hover:bg-gray-50 transition-colors">
                  <svg
                    className="w-5 h-5 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                    />
                  </svg>
                </button>
              </div>
              {/* Volunteer Locations Legend */}
              <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-md p-3">
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  Volunteer Locations
                </h4>
                <div className="space-y-1">
                  {volunteerLocations.map((loc, index) => (
                    <div key={index} className="flex items-center text-sm">
                      <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                      <span className="text-gray-600">{loc.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
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
                <button 
                  onClick={handleMarkResolved}
                  disabled={isResolvingDisaster}
                  className={`px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 font-medium flex items-center ${
                    isResolvingDisaster ? "opacity-75 cursor-not-allowed" : ""
                  }`}
                >
                  {isResolvingDisaster ? (
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
                      Resolving...
                    </>
                  ) : (
                    "Mark as Resolved"
                  )}
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
