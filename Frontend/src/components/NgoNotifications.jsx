import React, { useState } from "react";
import { motion } from "framer-motion";
import { Check, X, ChevronDown, ChevronUp, MapPin, Bell } from "lucide-react";

const NgoNotifications = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Urgent Medical Supplies Needed",
      urgency: "Critical",
      location: "Downtown Hospital, New York",
      description:
        "There is an urgent requirement for medical supplies including bandages, saline, and antibiotics due to a sudden disaster affecting the downtown area.",
      contactPerson: "Dr. Alice Johnson",
      contactDetails: "+1 234 567 890",
      category: "Resource Request",
      sender: "Local Health Authority",
      timestamp: "2024-03-20T10:00:00",
      status: "pending",
    },
    {
      id: 2,
      title: "Flood Relief Volunteers Required",
      urgency: "High",
      location: "Riverside Area, California",
      description:
        "We are organizing a flood relief camp and need volunteers for distributing food, setting up shelters, and assisting affected families.",
      contactPerson: "Mark Davis",
      contactDetails: "+1 987 654 321",
      category: "Volunteer Request",
      sender: "Emergency Response Team",
      timestamp: "2024-03-19T15:30:00",
      status: "pending",
    },
  ]);

  const [expanded, setExpanded] = useState({});
  const [activeFilter, setActiveFilter] = useState("all");

  const handleResponse = (id, status) => {
    setNotifications(
      notifications.map((notif) =>
        notif.id === id ? { ...notif, status } : notif
      )
    );
  };

  const toggleExpand = (id) => {
    setExpanded((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const filteredNotifications = notifications.filter((notif) => {
    if (activeFilter === "all") return true;
    return notif.status === activeFilter;
  });

  return (
    <motion.div className="p-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-green-100 rounded-lg">
            <Bell className="w-6 h-6 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Notifications</h2>
        </div>
        <div className="flex space-x-2">
          {["all", "accepted", "rejected"].map((filter) => (
            <motion.button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                activeFilter === filter
                  ? "bg-green-600 text-white shadow-sm"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </motion.button>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        {filteredNotifications.map((notification) => (
          <motion.div
            key={notification.id}
            className="border border-gray-200 rounded-xl p-6 hover:border-green-500 transition-colors duration-200 bg-white shadow-sm hover:shadow-md"
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.01 }}
          >
            <div className="flex justify-between items-start">
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <Bell className="mr-2 text-yellow-600" size={20} />
                  {notification.title}
                </h3>
                <div className="flex items-center space-x-3">
                  <span className="font-medium text-gray-700">Urgency:</span>
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      notification.urgency === "Critical"
                        ? "bg-red-100 text-red-700"
                        : notification.urgency === "High"
                        ? "bg-orange-100 text-orange-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {notification.urgency}
                  </span>
                  <span className="text-sm text-gray-500">
                    From: {notification.sender}
                  </span>
                </div>

                {expanded[notification.id] && (
                  <div className="space-y-3 pt-2">
                    <div className="flex items-center text-gray-700">
                      <MapPin className="mr-2 text-blue-600" size={16} />
                      <span className="font-medium">Location:</span> {notification.location}
                    </div>
                    <div className="text-gray-700">
                      <span className="font-medium">Category:</span> {notification.category}
                    </div>
                    <div className="text-gray-700">
                      <span className="font-medium">Description:</span> {notification.description}
                    </div>
                    <div className="text-gray-700">
                      <span className="font-medium">Contact:</span> {notification.contactPerson} ({notification.contactDetails})
                    </div>
                  </div>
                )}

                <motion.button
                  onClick={() => toggleExpand(notification.id)}
                  className="text-green-600 font-medium flex items-center"
                  whileHover={{ x: 5 }}
                >
                  {expanded[notification.id] ? "Show Less" : "Show More"}
                  {expanded[notification.id] ? (
                    <ChevronUp className="ml-2" size={16} />
                  ) : (
                    <ChevronDown className="ml-2" size={16} />
                  )}
                </motion.button>
              </div>

              {notification.status === "pending" && (
                <div className="flex space-x-3">
                  <motion.button
                    onClick={() => handleResponse(notification.id, "accepted")}
                    className="p-2.5 bg-green-600 text-white rounded-full hover:bg-green-700 shadow-sm"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Check size={18} />
                  </motion.button>
                  <motion.button
                    onClick={() => handleResponse(notification.id, "rejected")}
                    className="p-2.5 bg-red-600 text-white rounded-full hover:bg-red-700 shadow-sm"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X size={18} />
                  </motion.button>
                </div>
              )}

              {notification.status !== "pending" && (
                <span
                  className={`text-sm px-3 py-1 rounded-full font-medium ${
                    notification.status === "accepted"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {notification.status.charAt(0).toUpperCase() + notification.status.slice(1)}
                </span>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default NgoNotifications;
