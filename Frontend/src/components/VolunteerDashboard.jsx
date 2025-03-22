import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Bell, Clock, BookOpen } from 'lucide-react';
import Profile from './Profile';
import Notifications from './Notifications';
import PreviousWork from './PreviousWork';
import Learning from './Learning';

const VolunteerDashboard = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [error, setError] = useState(null);

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'previous', label: 'Previous Work', icon: Clock },
    { id: 'learning', label: 'Learning', icon: BookOpen },
  ];

  if (error) {
    return <div className="text-red-500">Something went wrong: {error.message}</div>;
  }

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-50 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* <h1 className="text-3xl font-bold text-gray-900 mb-8">Volunteer Dashboard</h1> */}
        
        {/* Tabs Navigation */}
        <div className="bg-white rounded-xl shadow-sm mb-6 mt-6">
          <div className="flex flex-wrap">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                className={`flex items-center px-6 py-4 space-x-2 ${
                  activeTab === tab.id
                    ? 'border-b-2 border-green-600 text-green-600'
                    : 'text-gray-600 hover:text-green-600'
                }`}
                onClick={() => setActiveTab(tab.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <tab.icon className="w-5 h-5" />
                <span className="font-medium">{tab.label}</span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-xl  min-h-[600px]"
        >
          {activeTab === 'profile' && <Profile />}
          {activeTab === 'notifications' && <Notifications />}
          {activeTab === 'previous' && <PreviousWork />}
          {activeTab === 'learning' && <Learning />}
        </motion.div>
      </div>
    </div>
  );
};

export default VolunteerDashboard; 