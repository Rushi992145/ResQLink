import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Bell, Clock, Building, Home, Settings, LogOut, Menu, X, MessageCircle } from 'lucide-react';
import NgoProfile from './NgoProfile';
import NgoNotifications from './NgoNotifications';
import NgoPreviousWork from './NgoPreviousWork';
import SidebarNgo from './SidebarNgo';
import MainContentNgo from './MainContentNgo';

const NgoDashboard = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [error, setError] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const tabs = [
    { id: 'profile', label: 'NGO Profile', icon: Building },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'previous', label: 'Previous Work', icon: Clock },
  ];

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (error) {
    return <div className="text-red-500 p-4">Something went wrong: {error.message}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed top-24 left-4 z-50 p-2 rounded-lg bg-white shadow-lg flex items-center justify-center md:hidden"
      >
        {isSidebarOpen ? (
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: 180 }}
            transition={{ duration: 0.2 }}
          >
            <X className="w-6 h-6 text-gray-600" />
          </motion.div>
        ) : (
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Menu className="w-6 h-6 text-gray-600" />
          </motion.div>
        )}
      </button>

      {/* Chatbot Toggle Button */}
      <motion.button
        onClick={() => setIsChatbotOpen(!isChatbotOpen)}
        className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-green-600 text-white shadow-lg hover:bg-green-700 transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <MessageCircle className="w-6 h-6" />
      </motion.button>

      <div className="flex h-[calc(100vh-5rem)]">
        {/* Sidebar */}
        <AnimatePresence mode="wait">
          {isSidebarOpen && (
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 20 }}
              className="fixed md:relative inset-y-0 left-0 z-40"
            >
              <SidebarNgo
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                isSidebarOpen={isSidebarOpen}
                setIsSidebarOpen={setIsSidebarOpen}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <div className="flex-1 overflow-hidden">
          <MainContentNgo activeTab={activeTab} />
        </div>
      </div>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default NgoDashboard;