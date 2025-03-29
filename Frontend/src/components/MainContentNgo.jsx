import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import NgoProfile from './NgoProfile';
import NgoNotifications from './NgoNotifications';
import NgoPreviousWork from './NgoPreviousWork';
import './MainContentVolunteer.css';

const MainContentNgo = ({ activeTab }) => {
  const getTabTitle = () => {
    switch (activeTab) {
      case 'profile':
        return 'NGO Profile';
      case 'notifications':
        return 'Notifications';
      case 'previous':
        return 'Previous Work';
      default:
        return '';
    }
  };

  return (
    <div className="h-full bg-gray-50">
      <div className="h-full overflow-y-auto scrollbar-hide">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Page Header */}
          <div className="mb-6">
            <motion.h1 
              className="text-2xl font-bold text-gray-900"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {getTabTitle()}
            </motion.h1>
            <motion.div 
              className="h-1 w-20 bg-green-500 rounded mt-2"
              initial={{ width: 0 }}
              animate={{ width: 80 }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Main Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              {activeTab === 'profile' && <NgoProfile />}
              {activeTab === 'notifications' && <NgoNotifications />}
              {activeTab === 'previous' && <NgoPreviousWork />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default MainContentNgo;
