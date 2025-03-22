import React, { useState } from "react";
import { motion } from "framer-motion";

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

  // Static disaster reports
  const disasterReports = [
    {
      id: 1,
      location: "Miami, FL",
      type: "Hurricane",
      severity: "High",
      status: "Active",
      date: "2024-03-15",
    },
    {
      id: 2,
      location: "California",
      type: "Wildfire",
      severity: "Critical",
      status: "Active",
      date: "2024-03-14",
    },
    {
      id: 3,
      location: "Texas",
      type: "Flood",
      severity: "Medium",
      status: "Resolved",
      date: "2024-03-10",
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
    { id: "approval", label: "User Approval", icon: "👥" },
    { id: "reported", label: "Reported Disasters", icon: "🚨" },
    { id: "aid", label: "Aid Requirements", icon: "🆘" },
  ];

  // Add new static data for reported disasters
  const reportedDisasters = {
    active: [
      {
        id: 1,
        type: "Hurricane",
        location: "Miami, FL",
        severity: "Critical",
        reportedAt: "2024-03-15",
        affectedPeople: "5,000+",
        description:
          "Category 4 hurricane causing severe flooding and infrastructure damage",
        status: "Active",
      },
      {
        id: 2,
        type: "Wildfire",
        location: "California",
        severity: "High",
        reportedAt: "2024-03-14",
        affectedPeople: "2,000+",
        description: "Rapidly spreading wildfire threatening residential areas",
        status: "Active",
      },
    ],
    resolved: [
      {
        id: 3,
        type: "Flood",
        location: "Texas",
        severity: "Medium",
        reportedAt: "2024-03-10",
        resolvedAt: "2024-03-13",
        affectedPeople: "1,000+",
        description: "Flash flooding in urban areas",
        status: "Resolved",
      },
    ],
  };

  const aidRequirements = [
    {
      id: 1,
      disaster: "Hurricane Miami",
      requirements: [
        { type: "Medical Supplies", quantity: "500 units", urgent: true },
        { type: "Food & Water", quantity: "1000 packages", urgent: true },
        { type: "Shelter", quantity: "200 tents", urgent: false },
      ],
      location: "Miami, FL",
      deadline: "24 hours",
    },
    {
      id: 2,
      disaster: "California Wildfire",
      requirements: [
        { type: "Respiratory Masks", quantity: "2000 units", urgent: true },
        { type: "Water Supply", quantity: "5000 liters", urgent: true },
      ],
      location: "California",
      deadline: "48 hours",
    },
  ];

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

  const ReportedDisasters = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Active Disasters */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-semibold mb-6 flex items-center">
          <span className="text-red-500 mr-2">⚠️</span>
          Active Disasters
        </h3>
        <div className="space-y-4">
          {reportedDisasters.active.map((disaster) => (
            <motion.div
              key={disaster.id}
              whileHover={{ scale: 1.02 }}
              className="border border-red-100 rounded-lg p-4 hover:shadow-lg transition-all duration-300 bg-red-50"
            >
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold text-lg text-red-700">
                  {disaster.type}
                </h4>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium 
                  ${
                    disaster.severity === "Critical"
                      ? "bg-red-100 text-red-800"
                      : disaster.severity === "High"
                      ? "bg-orange-100 text-orange-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {disaster.severity}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-2">
                📍 {disaster.location}
              </p>
              <p className="text-sm text-gray-600 mb-2">
                👥 Affected: {disaster.affectedPeople}
              </p>
              <p className="text-sm text-gray-600 mb-3">
                {disaster.description}
              </p>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">
                  Reported: {disaster.reportedAt}
                </span>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  View Details
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Resolved Disasters */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-semibold mb-6 flex items-center">
          <span className="text-green-500 mr-2">✅</span>
          Resolved Disasters
        </h3>
        <div className="space-y-4">
          {reportedDisasters.resolved.map((disaster) => (
            <motion.div
              key={disaster.id}
              whileHover={{ scale: 1.02 }}
              className="border border-green-100 rounded-lg p-4 hover:shadow-lg transition-all duration-300 bg-green-50"
            >
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold text-lg text-green-700">
                  {disaster.type}
                </h4>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Resolved
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-2">
                📍 {disaster.location}
              </p>
              <p className="text-sm text-gray-600 mb-2">
                👥 Affected: {disaster.affectedPeople}
              </p>
              <p className="text-sm text-gray-600 mb-3">
                {disaster.description}
              </p>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">
                  Resolved: {disaster.resolvedAt}
                </span>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  View Report
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );

  const AidRequirements = () => (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-semibold mb-6 flex items-center">
        <span className="text-blue-500 mr-2">🆘</span>
        Current Aid Requirements
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {aidRequirements.map((aid) => (
          <motion.div
            key={aid.id}
            whileHover={{ scale: 1.02 }}
            className="border border-blue-100 rounded-lg p-4 hover:shadow-lg transition-all duration-300"
          >
            <div className="flex justify-between items-start mb-3">
              <h4 className="font-semibold text-lg text-blue-700">
                {aid.disaster}
              </h4>
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {aid.deadline}
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-3">�� {aid.location}</p>
            <div className="space-y-2 mb-4">
              {aid.requirements.map((req, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">{req.type}</span>
                  <div className="flex items-center">
                    <span className="text-sm font-medium mr-2">
                      {req.quantity}
                    </span>
                    {req.urgent && (
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        Urgent
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-end">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Manage Aid
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

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
      </div>
    </div>
  );
};

export default Admin;
