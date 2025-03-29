import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import SideBarVolunteer from './SideBarVolunteer';
import MainContentVolunteer from './MainContentVolunteer';
import ChatbotModal from '../Modals/ChatBotModal';
import { MessageCircle } from 'lucide-react';

const VolunteerDashboard = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsDesktop(width >= 768);
      if (width >= 768) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleChatbot = () => {
    setIsChatbotOpen(!isChatbotOpen);
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] mt-20 md:mt-24">
      {/* Menu Button - Visible on mobile */}
      <motion.button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed top-24 left-4 z-40 p-2.5 bg-white rounded-xl shadow-md md:hidden hover:bg-gray-50 border border-gray-100"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          animate={{ rotate: isSidebarOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {isSidebarOpen ? (
            <X className="w-5 h-5 text-gray-600" />
          ) : (
            <Menu className="w-5 h-5 text-gray-600" />
          )}
        </motion.div>
      </motion.button>

      {/* Chatbot Toggle Button */}
      <motion.button 
        onClick={toggleChatbot}
        className="fixed bottom-6 right-6 z-40 bg-green-500 text-white p-3.5 rounded-xl shadow-lg hover:bg-green-600 transition-all"
        whileHover={{ scale: 1.05, rotate: 5 }}
        whileTap={{ scale: 0.95 }}
      >
        <MessageCircle className="w-5 h-5" />
      </motion.button>

      {/* Chatbot Modal */}
      {isChatbotOpen && <ChatbotModal onClose={toggleChatbot} />}

      {/* Overlay for mobile */}
      <AnimatePresence>
        {isSidebarOpen && !isDesktop && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      <div className="flex h-[calc(100vh-5rem)]">
        {/* Sidebar */}
        <AnimatePresence>
          <motion.div 
            className={`fixed md:relative inset-y-0 left-0 z-30 transform ${
              isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
            } md:translate-x-0 transition-transform duration-300 ease-in-out h-full`}
            initial={{ x: '-100%' }}
            animate={{ x: isSidebarOpen ? 0 : '-100%' }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 20 }}
          >
            <SideBarVolunteer
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              isSidebarOpen={isSidebarOpen}
              setIsSidebarOpen={setIsSidebarOpen}
            />
          </motion.div>
        </AnimatePresence>

        {/* Main Content */}
        <div 
          className={`flex-1 transition-all duration-300 ${
            isSidebarOpen && !isDesktop ? 'opacity-50 pointer-events-none' : 'opacity-100'
          }`}
        >
          <MainContentVolunteer activeTab={activeTab} />
        </div>
      </div>
    </div>
  );
};

export default VolunteerDashboard; 