import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, X, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Notifications = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/report/getreport",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        const value = await response.json();
        console.log("disaster reports : ", value);

        // Filter only approved disasters
        const approvedDisasters = value.data.filter(disaster => disaster.status === 'approved');
        console.log("approved disaster",approvedDisasters);
        

        console.log("here",approvedDisasters[0].location.lati);
        
        // Transform the data to match notification format
        const formattedNotifications = approvedDisasters.map(disaster => ({
          id: disaster._id,
          message: `${disaster.disasterType} - ${disaster.severity} Level`,
          timestamp: disaster.reportedAt,
          status: 'pending',
          description: disaster.description,
          // location: `${disaster.location.lati}, ${disaster.location.long}`,
          type: disaster.disasterType,
          priority: disaster.severity,
          disaster: disaster
        }));

        console.log("formattedNotifications",formattedNotifications);

        setNotifications(formattedNotifications);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const handleResponse = async (e, id, status) => {
    e.stopPropagation();
    
    try {
      // Update local state immediately for better UX
      setNotifications(notifications.map(notif => 
        notif.id === id ? { ...notif, status } : notif
      ));

      // Make API call to update status
      const response = await fetch(`http://localhost:3000/api/report/updatestatus/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        throw new Error('Failed to update status');
      }

      // If rejected, remove from notifications after a delay
      if (status === 'rejected') {
        setTimeout(() => {
          setNotifications(notifications.filter(notif => notif.id !== id));
        }, 1000);
      }
    } catch (error) {
      console.error('Error updating status:', error);
      // Revert the status if the API call fails
      setNotifications(notifications.map(notif => 
        notif.id === id ? { ...notif, status: 'pending' } : notif
      ));
    }
  };

  const handleNotificationClick = (id) => {
    const notification = notifications.find(n => n.id === id);
    if (notification) {
      navigate(`/volunteer/notifications/${id}`, { 
        state: { disaster: notification.disaster }
      });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <motion.div
      className="p-8 max-w-4xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h2 className="text-2xl font-bold mb-8 text-gray-900">Notifications</h2>
      <div className="space-y-6">
        {notifications.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No active notifications</p>
          </div>
        ) : (
          notifications.map((notification) => (
            <motion.div
              key={notification.id}
              className={`border rounded-lg p-6 transition-colors duration-200 cursor-pointer ${
                notification.status === 'accepted' 
                  ? 'border-green-500 bg-green-50' 
                  : notification.status === 'rejected'
                  ? 'border-red-500 bg-red-50'
                  : 'border-gray-200 hover:border-green-500'
              }`}
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              whileHover={{ scale: notification.status === 'pending' ? 1.01 : 1 }}
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
                  <p className="text-sm text-gray-600 mt-2">{notification.description}</p>
                  <p className="text-sm text-gray-500 mt-1">📍 {notification.location}</p>
                </div>
                
                {notification.status === 'accepted' && (
                  <div className="ml-4">
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                      Accepted
                    </span>
                  </div>
                )}
                {notification.status === 'rejected' && (
                  <div className="ml-4">
                    <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm">
                      Rejected
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
          ))
        )}
      </div>
    </motion.div>
  );
};

export default Notifications; 