import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Clock, AlertCircle, Check, X } from 'lucide-react';
import Navigation from '../components/Navigation'
import { useLocation } from 'react-router-dom';


const NotificationDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const disasterId = location.pathname.substring(location.pathname.lastIndexOf("/") + 1);
  const [notification,setNotification] = useState(null);

  useEffect(()=>{
     async function getNotificationData()
     {
        try
        {
          const response = await fetch(`http://localhost:3000/api/report/getdisaster/${disasterId}`);

          const value = await response.json();

          console.log("disaster is :",value.data);
          setNotification(value.data[0]);
 
        }
        catch(error)
        {
          console.log(error.message);
        }
     }

     getNotificationData();
  },[])

  function acceptrequesthandler()
  {
    try 
    {
      
    }
    catch(error)
    {
      console.log(error.message);
    }
  }


  // Mock data - In a real app, you would fetch this based on the ID
  // const notification = {
  //   id: parseInt(id),
  //   message: 'Emergency response needed in Downtown area',
  //   timestamp: '2024-01-20T10:00:00',
  //   status: 'pending',
  //   description: 'Urgent assistance required for flood relief operations. We need volunteers to help with evacuation procedures and distribute emergency supplies. Your immediate response would be greatly appreciated.',
  //   location: 'Downtown Area, Main Street',
  //   type: 'Emergency',
  //   priority: 'High',
  //   contactPerson: 'John Doe',
  //   contactNumber: '+1 234-567-8900',
  //   requiredVolunteers: 20,
  //   duration: '4-6 hours',
  //   skills: ['First Aid', 'Communication', 'Physical Fitness']
  // };

  const handleResponse = (status) => {
    // Handle the response (accept/reject)
    console.log(`Notification ${id} ${status}`);
    // Navigate back after response
    navigate('/volunteer/notifications');
  };

  return (
    <motion.div
      className="p-8 max-w-4xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
    >
      {/* Back Button */}
      <motion.button
        onClick={() => navigate('/volunteer/notifications')}
        className="flex items-center space-x-2 text-green-600 hover:text-green-700 mb-6"
        whileHover={{ x: -4 }}
      >
        <ArrowLeft size={20} />
        <span>Back to Notifications</span>
      </motion.button>

      {/* Main Content */}
      <div className="bg-white rounded-xl shadow-sm p-8">
        <div className="space-y-6">
          {/* Header */}
          <div className="border-b border-gray-200 pb-6">
            {/* <h1 className="text-2xl font-bold text-gray-900 mb-2">{notification.message}</h1> */}
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              {
                notification && 
                <span className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {new Date(notification.reportedAt).toLocaleString()}
               </span>
              }
             {
              notification && 
              <span className={`px-3 py-1 rounded-full text-xs font-medium
                // ${notification.severity === 'high' 
                  ? 'bg-red-100 text-red-700'
                  : 'bg-yellow-100 text-yellow-700'
                }`}
              >
                {notification.severity} severity
              </span>
             }
            </div>
          </div>

          {/* Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Location</h3>
                {
                  notification && 
                  <p className="mt-1 flex items-center text-gray-900">
                  <MapPin className="w-4 h-4 mr-2 text-green-600" />
                  lat : {notification.location.lati} {" "} long : {notification.location.long}
                </p>
                }
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Type</h3>
               {
                notification && 
                <p className="mt-1 flex items-center text-gray-900">
                <AlertCircle className="w-4 h-4 mr-2 text-green-600" />
                {notification.disasterType}
              </p>
               }
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Contact Person</h3>
                {
                  notification && <p className="mt-1 text-gray-900">{notification.name}</p>
                }
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Contact Number</h3>
                {
                  notification && <p className="mt-1 text-gray-900">{notification.contactNumber}</p>
                }
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Required Volunteers</h3>
                <p className="mt-1 text-gray-900">{parseInt(Math.random()*15+1)}</p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">Description</h3>
           {
            notification &&  <p className="text-gray-900">{notification.description}</p>
           }
          </div>

          <div>
            {
              notification && notification.location ? 
              <Navigation longitude={notification.location.long} lattitude={notification.location.lati} /> : null
            }
          </div>

          {/* Action Buttons */}
          {notification && notification.status === 'pending' && (
            <div className="flex space-x-4 pt-6 border-t border-gray-200">
              <motion.button
                onClick={() => handleResponse('accepted')}
                className="flex-1 bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center justify-center space-x-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Check size={20} />
                <span onClick={acceptrequesthandler}>Accept Request</span>
              </motion.button>
            </div>
          )}

          {notification && notification.status === 'approved' && (
            <div className="flex space-x-4 pt-6 border-t border-gray-200">
              <motion.button
                onClick={() => handleResponse('accepted')}
                className="flex-1 bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center justify-center space-x-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                
                <span>You have accepted this disaster request</span>
              </motion.button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default NotificationDetail; 