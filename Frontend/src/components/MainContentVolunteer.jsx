import React from 'react';
import { motion } from 'framer-motion';
import Profile from './Profile';
import Notifications from './Notifications';
import PreviousWork from './PreviousWork';
import Learning from './Learning';
import '../styles/MainContentVolunteer.css';

const MainContentVolunteer = ({ activeTab }) => {
  const getTabTitle = () => {
    switch (activeTab) {
      case 'profile':
        return 'Profile';
      case 'notifications':
        return 'Notifications';
      case 'previous':
        return 'Previous Work';
      case 'learning':
        return 'Learning';
      default:
        return 'Dashboard';
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return <Profile />;
      case 'notifications':
        return <Notifications />;
      case 'previous':
        return <PreviousWork />;
      case 'learning':
        return <Learning />;
      default:
        return <Profile />;
    }
  };

  return (
    <div className="h-full overflow-y-auto scrollbar-hide">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-100 px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-gray-900">{getTabTitle()}</h1>
            <div className="h-8 w-1 bg-green-500 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 sm:p-6 lg:p-8">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          {renderContent()}
        </motion.div>
      </div>
    </div>
  );
};

export default MainContentVolunteer;
