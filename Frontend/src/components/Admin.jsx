import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
// import DisasterDetailsPage from "./DisasterDetailsPage";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  // Static data
  const [stats] = useState({
    totalDisasters: 156,
    totalRequests: 243,
    approvedVolunteers: 89,
    pendingVolunteers: 34,
    approvedNGOs: 45,
    pendingNGOs: 12,
    ongoingEfforts: 78,
  });

  // Add state for disaster reports
  const [disasterReports, setDisasterReports] = useState({
    pending: [],
    active: [],
    resolved: [],
  });

  // Update the useEffect to properly store fetched data
  useEffect(() => {
    async function getAllDisasterReport() {
      try {
        const response = await fetch(
          "http://localhost:3000/api/report/getreport",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`, // Add token for authentication
            },
          }
        );

        const data = await response.json();
        console.log(data);
        // Categorize disasters based on status
        const categorizedReports = {
          pending: data.data.filter((report) => report.status === "pending"),
          active: data.data.filter((report) => report.status === "approved"),
          resolved: data.data.filter((report) => report.status === "rejected"),
        };

        setDisasterReports(categorizedReports);
        console.log("Categorized Disaster Reports:", categorizedReports);
      } catch (error) {
        console.log(error.message);
      }
    }

    getAllDisasterReport();
  }, []);

  const [activeTab, setActiveTab] = useState("overview");

  // Static volunteer data
  const pendingVolunteers = [
    {
      id: 1,
      name: "John Doe",
      skills: "Medical, First Aid",
      location: "New York",
      date: "2024-03-15",
    },
    {
      id: 2,
      name: "Sarah Smith",
      skills: "Search & Rescue",
      location: "Los Angeles",
      date: "2024-03-14",
    },
    {
      id: 3,
      name: "Mike Johnson",
      skills: "Logistics, Driving",
      location: "Chicago",
      date: "2024-03-13",
    },
  ];

  // Static NGO data
  const pendingNGOs = [
    {
      id: 1,
      name: "Help International",
      type: "Medical Relief",
      location: "Global",
      date: "2024-03-15",
    },
    {
      id: 2,
      name: "Care Foundation",
      type: "Food & Shelter",
      location: "Asia",
      date: "2024-03-14",
    },
    {
      id: 3,
      name: "Relief Corps",
      type: "Emergency Response",
      location: "Europe",
      date: "2024-03-13",
    },
  ];

  // Static volunteer assignments
  const activeDisasters = [
    {
      id: 1,
      type: "Hurricane",
      location: "Miami, FL",
      volunteersNeeded: 15,
      assigned: 8,
    },
    {
      id: 2,
      type: "Wildfire",
      location: "California",
      volunteersNeeded: 25,
      assigned: 12,
    },
  ];

  const availableVolunteers = [
    {
      id: 1,
      name: "Emma Wilson",
      skills: "Medical",
      availability: "Immediate",
      rating: "4.8",
    },
    {
      id: 2,
      name: "James Brown",
      skills: "Rescue",
      availability: "Next Week",
      rating: "4.5",
    },
  ];

  // Modify the tabs array
  const tabs = [
    { id: "overview", label: "Overview", icon: "📊" },
    // { id: "approval", label: "User Approval", icon: "👥" },
    { id: "reported", label: "Reported Disasters", icon: "🚨" },
    { id: "aid", label: "Aid Requirements", icon: "🆘" },
  ];

  // Add these state variables at the top of the Admin component
  const [aidRequirements, setAidRequirements] = useState([]);
  const [isAidModalOpen, setIsAidModalOpen] = useState(false);
  const [selectedAid, setSelectedAid] = useState(null);

  // Add this useEffect to fetch aid requirements
  useEffect(() => {
    fetchAidRequirements();
  }, []);

  // Add this function to fetch aid requirements
  const fetchAidRequirements = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/aid/all");
      const data = await response.json();

      if (data.success) {
        setAidRequirements(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch aid requirements:", error);
    }
  };

  // Add this state for modal
  const [selectedDisaster, setSelectedDisaster] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Add new state variables
  const [selectedDisasterDetails, setSelectedDisasterDetails] = useState(null);
  const [selectedDisasterStatus, setSelectedDisasterStatus] = useState(null);

  const navigate = useNavigate();

  // Tab components
  const Overview = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {[
        {
          title: "Total Disasters",
          value: stats.totalDisasters,
          color: "red",
          icon: "🚨",
        },
        {
          title: "Aid Requests",
          value: stats.totalRequests,
          color: "blue",
          icon: "🆘",
        },
        {
          title: "Active Volunteers",
          value: stats.approvedVolunteers,
          color: "green",
          icon: "👥",
        },
        {
          title: "Ongoing Relief",
          value: stats.ongoingEfforts,
          color: "yellow",
          icon: "🔄",
        },
      ].map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white p-6 rounded-xl shadow-lg"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-2xl">{stat.icon}</span>
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium bg-${stat.color}-100 text-${stat.color}-800`}
            >
              +12% this week
            </span>
          </div>
          <h3 className="text-gray-600 text-sm font-medium">{stat.title}</h3>
          <p className="text-3xl font-bold mt-2">{stat.value}</p>
        </motion.div>
      ))}
    </div>
  );

  const UserApproval = () => (
    <div className="space-y-8">
      {/* Volunteer Requests */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-semibold mb-4">
          Pending Volunteer Requests ({pendingVolunteers.length})
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Skills
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {pendingVolunteers.map((volunteer) => (
                <tr key={volunteer.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {volunteer.name}
                  </td>
                  <td className="px-6 py-4">{volunteer.skills}</td>
                  <td className="px-6 py-4">{volunteer.location}</td>
                  <td className="px-6 py-4">{volunteer.date}</td>
                  <td className="px-6 py-4 space-x-2">
                    <button className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600">
                      Approve
                    </button>
                    <button className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600">
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* NGO Requests */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-semibold mb-4">
          Pending NGO Requests ({pendingNGOs.length})
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Organization
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {pendingNGOs.map((ngo) => (
                <tr key={ngo.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{ngo.name}</td>
                  <td className="px-6 py-4">{ngo.type}</td>
                  <td className="px-6 py-4">{ngo.location}</td>
                  <td className="px-6 py-4">{ngo.date}</td>
                  <td className="px-6 py-4 space-x-2">
                    <button className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600">
                      Approve
                    </button>
                    <button className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600">
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const ReportedDisasters = () => {
    const [activeSection, setActiveSection] = useState("pending");

    const sections = [
      { id: "pending", label: "Pending Reports", icon: "⚠️", color: "yellow" },
      { id: "active", label: "Active Disasters", icon: "🔴", color: "red" },
      {
        id: "resolved",
        label: "Resolved Disasters",
        icon: "✅",
        color: "green",
      },
    ];

    // Helper function to format date
    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    };

    return (
      <div className="space-y-6">
        <div className="flex space-x-4 mb-6">
          {sections.map((section) => (
            <motion.button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`flex items-center px-4 py-2 rounded-lg font-medium ${
                activeSection === section.id
                  ? `bg-${section.color}-100 text-${section.color}-800 border-2 border-${section.color}-500`
                  : "bg-white text-gray-600 hover:bg-gray-50"
              }`}
            >
              <span className="mr-2">{section.icon}</span>
              {section.label}
            </motion.button>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          {activeSection === "pending" && (
            <div className="space-y-4">
              {disasterReports.pending.map((disaster) => (
                <motion.div
                  key={disaster._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="border border-yellow-100 rounded-lg p-4 hover:shadow-lg transition-all duration-300 bg-yellow-50"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-lg text-yellow-700">
                      {disaster.disasterType}
                    </h4>
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      {disaster.severity}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    📍 {disaster.location?.lati}, {disaster.location?.long}
                  </p>
                  <p className="text-sm text-gray-600 mb-2">
                    👤 Reporter: {disaster.name || "Anonymous"}
                  </p>
                  <p className="text-sm text-gray-600 mb-3">
                    {disaster.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">
                      Reported: {formatDate(disaster.reportedAt)}
                    </span>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        navigate(`/admin-dashboard/disaster/${disaster._id}`, {
                          state: { disaster, status: "pending" },
                        });
                      }}
                      className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
                    >
                      View Details
                    </motion.button>
                  </div>
                </motion.div>
              ))}
              {disasterReports.pending.length === 0 && (
                <p className="text-center text-gray-500">
                  No pending disaster reports
                </p>
              )}
            </div>
          )}

          {activeSection === "active" && (
            <div className="space-y-4">
              {disasterReports.active.map((disaster) => (
                <motion.div
                  key={disaster._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="border border-red-100 rounded-lg p-4 hover:shadow-lg transition-all duration-300 bg-red-50"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-lg text-red-700">
                      {disaster.disasterType}
                    </h4>
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      {disaster.severity}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    📍 {disaster.location?.lati}, {disaster.location?.long}
                  </p>
                  <p className="text-sm text-gray-600 mb-2">
                    👤 Reporter: {disaster.name || "Anonymous"}
                  </p>
                  <p className="text-sm text-gray-600 mb-3">
                    {disaster.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">
                      Active since: {formatDate(disaster.reportedAt)}
                    </span>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        navigate(`/admin-dashboard/disaster/${disaster._id}`, {
                          state: { disaster, status: "active" },
                        });
                      }}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                    >
                      View Details
                    </motion.button>
                  </div>
                </motion.div>
              ))}
              {disasterReports.active.length === 0 && (
                <p className="text-center text-gray-500">No active disasters</p>
              )}
            </div>
          )}

          {activeSection === "resolved" && (
            <div className="space-y-4">
              {disasterReports.resolved.map((disaster) => (
                <motion.div
                  key={disaster._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="border border-green-100 rounded-lg p-4 hover:shadow-lg transition-all duration-300 bg-green-50"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-lg text-green-700">
                      {disaster.disasterType}
                    </h4>
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Resolved
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    📍 {disaster.location?.lati}, {disaster.location?.long}
                  </p>
                  <p className="text-sm text-gray-600 mb-2">
                    👤 Reporter: {disaster.name || "Anonymous"}
                  </p>
                  <p className="text-sm text-gray-600 mb-3">
                    {disaster.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">
                      Resolved: {formatDate(disaster.resolvedAt)}
                    </span>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        navigate(`/admin-dashboard/disaster/${disaster._id}`, {
                          state: { disaster, status: "resolved" },
                        });
                      }}
                      className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                    >
                      View Details
                    </motion.button>
                  </div>
                </motion.div>
              ))}
              {disasterReports.resolved.length === 0 && (
                <p className="text-center text-gray-500">
                  No resolved disasters
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    );
  };

  {
    /* Notification Modal */
  }
  {
    isModalOpen && selectedDisaster && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-xl p-6 max-w-lg w-full mx-4"
        >
          <h3 className="text-2xl font-bold mb-4">Disaster Alert</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold">Type</h4>
              <p>{selectedDisaster.type}</p>
            </div>
            <div>
              <h4 className="font-semibold">Location</h4>
              <p>{selectedDisaster.location}</p>
            </div>
            <div>
              <h4 className="font-semibold">Severity</h4>
              <p>{selectedDisaster.severity}</p>
            </div>
            <div>
              <h4 className="font-semibold">Description</h4>
              <p>{selectedDisaster.description}</p>
            </div>
            <div>
              <h4 className="font-semibold">Affected People</h4>
              <p>{selectedDisaster.affectedPeople}</p>
            </div>
          </div>
          <div className="flex justify-end space-x-4 mt-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
            >
              Close
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              Alert Volunteers
            </motion.button>
          </div>
        </motion.div>
      </div>
    );
  }

  // Update the AidRequirements component
  const AidRequirements = React.memo(() => {
    // Helper function to format date
    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    };

    // Helper function to get status color - memoize it
    const getStatusColor = React.useCallback((status) => {
      switch (status) {
        case "pending":
          return "yellow";
        case "fulfilled":
          return "green";
        case "partially-fulfilled":
          return "orange";
        default:
          return "gray";
      }
    }, []);

    // Memoize the render of each aid requirement
    const renderAidRequirement = React.useCallback(
      (aid) => (
        <motion.div
          key={aid._id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          {/* Header */}
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                {aid.disasterType}
              </h3>
              <p className="text-sm text-gray-600">
                Requested by: {aid.name || "Anonymous"}
              </p>
            </div>
            <div className="text-right">
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                Deadline: {formatDate(aid.deadline)}
              </span>
            </div>
          </div>

          {/* Location */}
          <div className="mb-4">
            <p className="text-sm text-gray-600">
              📍 Location: {aid.location?.lati}, {aid.location?.long}
            </p>
            <p className="text-sm text-gray-600">
              📞 Contact: {aid.contactNumber || "Not provided"}
            </p>
          </div>

          {/* Requirements */}
          <div className="space-y-3">
            <h4 className="font-medium text-gray-700">Requirements:</h4>
            <div className="grid gap-2">
              {aid.requirements.map((req, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-gray-50 p-3 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-gray-800">{req.type}</span>
                    <span className="text-gray-600">({req.quantity})</span>
                    {req.urgent && (
                      <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs">
                        Urgent
                      </span>
                    )}
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium bg-${getStatusColor(
                      req.status
                    )}-100 text-${getStatusColor(req.status)}-800`}
                  >
                    {req.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Description */}
          {aid.description && (
            <div className="mt-4 text-sm text-gray-600">
              <p className="font-medium">Additional Details:</p>
              <p>{aid.description}</p>
            </div>
          )}

          {/* Footer */}
          <div className="mt-6 flex justify-between items-center pt-4 border-t">
            <span className="text-sm text-gray-500">
              Created: {formatDate(aid.createdAt)}
            </span>
            <div className="flex space-x-2">
              <button
                onClick={() => {
                  setSelectedAid(aid);
                  setIsAidModalOpen(true);
                }}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                View Details
              </button>
            </div>
          </div>
        </motion.div>
      ),
      [formatDate, getStatusColor]
    );

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Aid Requirements</h2>
        </div>

        {aidRequirements.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No aid requirements found
          </div>
        ) : (
          <div className="grid gap-6">
            {aidRequirements.map(renderAidRequirement)}
          </div>
        )}

        {/* Aid Details Modal */}
        {isAidModalOpen && selectedAid && (
          <AidDetailsModal
            aid={selectedAid}
            onClose={() => setIsAidModalOpen(false)}
          />
        )}
      </div>
    );
  });

  // Create a separate AidDetailsModal component
  const AidDetailsModal = React.memo(({ aid, onClose }) => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-xl p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto"
        >
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-2xl font-bold">Aid Request Details</h3>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>

          {/* Modal content */}
          <div className="space-y-4">
            {/* ... Detailed aid information ... */}
            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={onClose}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Close
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  });

  return (
    <div className="min-h-screen bg-gray-100 pt-16">
      <div className="container mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Admin Dashboard
        </h1>

        {/* Enhanced Navigation Tabs */}
        <div className="flex overflow-x-auto mb-8 bg-white rounded-lg shadow-sm">
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-3 text-sm font-medium whitespace-nowrap flex items-center ${
                activeTab === tab.id
                  ? "text-green-600 border-b-2 border-green-600 bg-green-50"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </motion.button>
          ))}
        </div>

        {/* Tab Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          {activeTab === "overview" && <Overview />}
          {activeTab === "approval" && <UserApproval />}
          {activeTab === "reported" && <ReportedDisasters />}
          {activeTab === "aid" && <AidRequirements />}
        </motion.div>

        {selectedDisasterDetails && (
          <DisasterDetails
            disaster={selectedDisasterDetails}
            status={selectedDisasterStatus}
            onClose={() => {
              setSelectedDisasterDetails(null);
              setSelectedDisasterStatus(null);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Admin;
