import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Bell, Clock, Building, Home, Settings, LogOut } from 'lucide-react';
import NgoProfile from './NgoProfile';
import NgoNotifications from './NgoNotifications';
import NgoPreviousWork from './NgoPreviousWork';

const NgoDashboard = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [error, setError] = useState(null);

  const tabs = [
    { id: 'profile', label: 'NGO Profile', icon: Building },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'previous', label: 'Previous Work', icon: Clock },
  ];

  if (error) {
    return <div className="text-red-500 p-4">Something went wrong: {error.message}</div>;
  }

  return (
    <div className="flex min-h-screen bg-gray-50 pt-20">
      {/* Sidebar */}
      <div className="fixed left-0 top-20 h-[calc(100vh-5rem)] w-72 bg-white shadow-lg z-40">
        {/* Profile Section */}
        <div className="p-8 border-b border-gray-100 bg-gradient-to-b from-green-50 to-white">
          <div className="flex flex-col items-center">
            <div className="w-28 h-28 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center mb-4 shadow-lg ring-4 ring-white">
              <User className="w-14 h-14 text-white" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-1">NGO Name</h2>
            <p className="text-sm text-gray-500">Location</p>
            <div className="mt-4 flex items-center space-x-2 text-green-600">
              <Building className="w-4 h-4" />
              <span className="text-sm font-medium">Active Organization</span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-6 h-[calc(100%-16rem)] overflow-y-auto custom-scrollbar">
          <div className="space-y-2">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                className={`w-full flex items-center px-6 py-3.5 rounded-xl transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-green-50 text-green-600 shadow-sm border border-green-100'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
                onClick={() => setActiveTab(tab.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <tab.icon className="w-5 h-5 mr-3" />
                <span className="font-medium">{tab.label}</span>
              </motion.button>
            ))}
          </div>

          {/* Additional Options */}
          <div className="mt-8 space-y-2">
           

           

            <motion.button
              className="w-full flex items-center px-6 py-3.5 rounded-xl text-red-600 hover:bg-red-50 transition-all duration-200"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <LogOut className="w-5 h-5 mr-3" />
              <span className="font-medium">Logout</span>
            </motion.button>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-72">
        <div className="max-w-7xl mx-auto px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="min-h-[calc(100vh-8rem)]"
          >
            {activeTab === 'profile' && <NgoProfile />}
            {activeTab === 'notifications' && <NgoNotifications />}
            {activeTab === 'previous' && <NgoPreviousWork />}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default NgoDashboard;