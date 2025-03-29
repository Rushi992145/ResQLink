import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import {
  DollarSign,
  Users,
  Package,
  Truck,
  CheckCircle,
  Clock,
  AlertCircle,
  PieChart,
  Calendar,
  Building2,
  MapPin,
  Phone,
  Mail,
  X,
} from 'lucide-react';

const FundInfo = () => {
  const [selectedAid, setSelectedAid] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Sample data - replace with your actual data source
  const fundData = {
    totalFunds: 1500000,
    totalDonors: 2500,
    distributedFunds: 1200000,
    remainingFunds: 300000,
    categoryWiseUsage: [
      { category: "Medical Aid", amount: 400000, percentage: 33.33 },
      { category: "Food & Water", amount: 350000, percentage: 29.17 },
      { category: "Shelter", amount: 250000, percentage: 20.83 },
      { category: "Logistics", amount: 150000, percentage: 12.5 },
      { category: "Other", amount: 50000, percentage: 4.17 }
    ],
    aidRequests: [
      {
        id: 1,
        disaster: "Flood in Bangladesh",
        requester: "Local Relief Center",
        contact: {
          name: "Dr. Sarah Ahmed",
          phone: "+880 1234-567890",
          email: "sarah.ahmed@relief.org"
        },
        location: "Dhaka, Bangladesh",
        amount: 50000,
        status: "delivered",
        date: "2024-03-15",
        expectedDelivery: "2024-03-20",
        assignedNGO: "Global Relief Foundation",
        items: ["Food", "Water", "Medical Supplies"],
        priority: "High"
      },
      {
        id: 2,
        disaster: "Earthquake in Nepal",
        requester: "Emergency Response Team",
        contact: {
          name: "Rajesh Kumar",
          phone: "+977 9876-543210",
          email: "rajesh.kumar@emergency.org"
        },
        location: "Kathmandu, Nepal",
        amount: 75000,
        status: "in_transit",
        date: "2024-03-16",
        expectedDelivery: "2024-03-22",
        assignedNGO: "International Aid Network",
        items: ["Shelter", "Food", "First Aid"],
        priority: "Critical"
      },
      {
        id: 3,
        disaster: "Cyclone in Philippines",
        requester: "Disaster Relief Organization",
        contact: {
          name: "Maria Santos",
          phone: "+63 9123-456789",
          email: "maria.santos@disaster.org"
        },
        location: "Manila, Philippines",
        amount: 100000,
        status: "pending",
        date: "2024-03-17",
        expectedDelivery: "2024-03-25",
        assignedNGO: "Pacific Relief Services",
        items: ["Emergency Kits", "Water", "Food"],
        priority: "Medium"
      }
    ]
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800";
      case "in_transit":
        return "bg-blue-100 text-blue-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "canceled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "delivered":
        return <CheckCircle className="w-5 h-5" />;
      case "in_transit":
        return <Truck className="w-5 h-5" />;
      case "pending":
        return <Clock className="w-5 h-5" />;
      case "canceled":
        return <AlertCircle className="w-5 h-5" />;
      default:
        return <AlertCircle className="w-5 h-5" />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority.toLowerCase()) {
      case "critical":
        return "bg-red-100 text-red-800";
      case "high":
        return "bg-orange-100 text-orange-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleStatusClick = (aid) => {
    setSelectedAid(aid);
    setShowModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-14">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-green-700 to-green-800 text-white">
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="relative container mx-auto px-4 py-24">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
            Fund Transparency Dashboard
          </h1>
          <p className="text-xl text-center max-w-2xl mx-auto text-green-100">
            Track fund utilization, donations, and aid delivery status in real-time.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Fund Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Total Funds Donated</h3>
              <DollarSign className="w-8 h-8 text-green-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900">
              ${fundData.totalFunds.toLocaleString()}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Total Funds Distributed</h3>
              <Package className="w-8 h-8 text-green-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900">
              ${fundData.distributedFunds.toLocaleString()}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Remaining Funds</h3>
              <Clock className="w-8 h-8 text-yellow-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900">
              ${fundData.remainingFunds.toLocaleString()}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Total Donors</h3>
              <Users className="w-8 h-8 text-green-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900">
              {fundData.totalDonors.toLocaleString()}
            </p>
          </motion.div>
        </div>

        {/* Category-wise Fund Usage */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <PieChart className="w-6 h-6 mr-2 text-green-600" />
            Category-wise Fund Usage
          </h2>
          <div className="space-y-4">
            {fundData.categoryWiseUsage.map((category, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-700">{category.category}</span>
                  <span className="text-gray-600">${category.amount.toLocaleString()}</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div
                    className="bg-green-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${category.percentage}%` }}
                  ></div>
                </div>
                <div className="text-sm text-gray-500">
                  {category.percentage}% of total distribution
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Aid Delivery Status */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Aid Delivery Status</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-4 px-6 text-gray-600 font-semibold">Disaster</th>
                  <th className="text-left py-4 px-6 text-gray-600 font-semibold">Requester</th>
                  <th className="text-left py-4 px-6 text-gray-600 font-semibold">Amount</th>
                  <th className="text-left py-4 px-6 text-gray-600 font-semibold">Status</th>
                  <th className="text-left py-4 px-6 text-gray-600 font-semibold">Expected Delivery</th>
                  <th className="text-left py-4 px-6 text-gray-600 font-semibold">Assigned NGO</th>
                  <th className="text-left py-4 px-6 text-gray-600 font-semibold">Priority</th>
                </tr>
              </thead>
              <tbody>
                {fundData.aidRequests.map((aid) => (
                  <motion.tr
                    key={aid.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="py-4 px-6 text-gray-800">{aid.disaster}</td>
                    <td className="py-4 px-6 text-gray-800">
                      <div className="space-y-1">
                        <p className="font-medium">{aid.requester}</p>
                        <div className="flex items-center text-sm text-gray-500">
                          <MapPin className="w-4 h-4 mr-1" />
                          {aid.location}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-gray-800">
                      ${aid.amount.toLocaleString()}
                    </td>
                    <td className="py-4 px-6">
                      <button
                        onClick={() => handleStatusClick(aid)}
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(aid.status)} hover:opacity-80 transition-opacity`}
                      >
                        {getStatusIcon(aid.status)}
                        <span className="ml-2 capitalize">
                          {aid.status.replace('_', ' ')}
                        </span>
                      </button>
                    </td>
                    <td className="py-4 px-6 text-gray-800">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                        {new Date(aid.expectedDelivery).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="py-4 px-6 text-gray-800">
                      <div className="flex items-center">
                        <Building2 className="w-4 h-4 mr-2 text-gray-500" />
                        {aid.assignedNGO}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(aid.priority)}`}>
                        {aid.priority}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Status Details Modal */}
      <AnimatePresence>
        {showModal && selectedAid && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 backdrop-blur-sm bg-white/30 flex items-center justify-center z-50 p-4"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 20 }}
              className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl max-w-3xl w-full max-h-[85vh] flex flex-col"
              onClick={e => e.stopPropagation()}
            >
              {/* Modal Header - Fixed */}
              <div className="flex-none bg-white/95 backdrop-blur-md border-b border-gray-100 p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">Aid Delivery Details</h2>
                    <p className="text-gray-500 mt-1">Tracking ID: #{selectedAid.id}</p>
                  </div>
                  <button
                    onClick={() => setShowModal(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-full"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* Modal Content - Scrollable */}
              <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
                <div className="space-y-6">
                  {/* Disaster Info */}
                  <div className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200">
                    <div className="p-4 border-b border-gray-100 bg-gray-50/50">
                      <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                        <MapPin className="w-5 h-5 mr-2 text-green-600" />
                        Disaster Information
                      </h3>
                    </div>
                    <div className="p-4">
                      <p className="text-xl font-medium text-gray-900">{selectedAid.disaster}</p>
                      <div className="flex items-center text-gray-600 mt-2">
                        <MapPin className="w-5 h-5 mr-2 text-gray-400" />
                        {selectedAid.location}
                      </div>
                    </div>
                  </div>

                  {/* Requester Info */}
                  <div className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200">
                    <div className="p-4 border-b border-gray-100 bg-gray-50/50">
                      <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                        <Users className="w-5 h-5 mr-2 text-green-600" />
                        Requester Details
                      </h3>
                    </div>
                    <div className="p-4">
                      <p className="font-medium text-gray-900">{selectedAid.requester}</p>
                      <div className="mt-3 space-y-2">
                        <div className="flex items-center text-gray-600">
                          <Phone className="w-5 h-5 mr-2 text-gray-400" />
                          {selectedAid.contact.phone}
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Mail className="w-5 h-5 mr-2 text-gray-400" />
                          {selectedAid.contact.email}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Delivery Status */}
                  <div className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200">
                    <div className="p-4 border-b border-gray-100 bg-gray-50/50">
                      <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                        <Truck className="w-5 h-5 mr-2 text-green-600" />
                        Delivery Status
                      </h3>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-4">
                        <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium ${getStatusColor(selectedAid.status)}`}>
                          {getStatusIcon(selectedAid.status)}
                          <span className="ml-2 capitalize">
                            {selectedAid.status.replace('_', ' ')}
                          </span>
                        </span>
                        <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium ${getPriorityColor(selectedAid.priority)}`}>
                          {selectedAid.priority} Priority
                        </span>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center text-gray-600">
                          <Calendar className="w-5 h-5 mr-2 text-gray-400" />
                          <span>Expected Delivery: {new Date(selectedAid.expectedDelivery).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Building2 className="w-5 h-5 mr-2 text-gray-400" />
                          <span>Assigned NGO: {selectedAid.assignedNGO}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Aid Details */}
                  <div className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200">
                    <div className="p-4 border-b border-gray-100 bg-gray-50/50">
                      <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                        <Package className="w-5 h-5 mr-2 text-green-600" />
                        Aid Details
                      </h3>
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-gray-600">Amount Allocated</span>
                        <span className="text-xl font-bold text-gray-900">
                          ${selectedAid.amount.toLocaleString()}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600 block mb-2">Items Required:</span>
                        <div className="flex flex-wrap gap-2">
                          {selectedAid.items.map((item, index) => (
                            <span
                              key={index}
                              className="bg-green-50 text-green-700 px-3 py-1.5 rounded-full text-sm border border-green-100 hover:bg-green-100 transition-colors duration-200"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FundInfo;
