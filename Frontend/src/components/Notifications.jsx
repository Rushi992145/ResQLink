import React from 'react';
import { motion } from 'framer-motion';
import { Check, X, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Notifications = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = React.useState([
    {
      id: 1,
      message: 'Emergency response needed in Downtown area',
      timestamp: '2024-01-20T10:00:00',
      status: 'pending',
      description: 'Urgent assistance required for flood relief operations...',
      location: 'Downtown Area, Main Street',
      type: 'Emergency',
      priority: 'High'
    },
    {
      id: 2,
      message: 'Flood relief volunteers needed',
      timestamp: '2024-01-19T15:30:00',
      status: 'pending',
      description: 'Looking for volunteers to help with evacuation...',
      location: 'Riverside Community',
      type: 'Volunteer Request',
      priority: 'Medium'
    },
  ]);

  const handleResponse = (e, id, status) => {
    e.stopPropagation(); // Prevent triggering the card click
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, status } : notif
    ));
  };

  const handleNotificationClick = (id) => {
    navigate(`/volunteer/notifications/${id}`);
  };

  return (
    <motion.div
      className="p-8 max-w-4xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h2 className="text-2xl font-bold mb-8 text-gray-900">Notifications</h2>
      <div className="space-y-6">
        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            className="border border-gray-200 rounded-lg p-6 hover:border-green-500 transition-colors duration-200 cursor-pointer"
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.01 }}
            onClick={() => handleNotificationClick(notification.id)}
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="text-lg font-medium text-gray-900 mb-2">{notification.message}</p>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
                <p className="text-sm text-gray-500">
                  {new Date(notification.timestamp).toLocaleString()}
                </p>
              </div>
              {notification.status === 'pending' && (
                <div className="flex space-x-3 ml-4">
                  <motion.button
                    onClick={(e) => handleResponse(e, notification.id, 'accepted')}
                    className="p-2.5 bg-green-600 text-white rounded-full hover:bg-green-700"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Check size={18} />
                  </motion.button>
                  <motion.button
                    onClick={(e) => handleResponse(e, notification.id, 'rejected')}
                    className="p-2.5 bg-red-600 text-white rounded-full hover:bg-red-700"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X size={18} />
                  </motion.button>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Notifications; 