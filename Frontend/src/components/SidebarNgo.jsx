import React from 'react';
import { motion } from 'framer-motion';
import { User, Bell, Clock, Building, LogOut, Home } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { 
  setName, 
  setEmail, 
  setRole, 
  setId, 
  setToken, 
  setFcmToken, 
  setLongitude, 
  setLattitude 
} from '../Redux/authslice';

const SidebarNgo = ({ activeTab, setActiveTab, isSidebarOpen, setIsSidebarOpen }) => {
  const name = useSelector((state) => state.auth.name);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const tabs = [
    { id: 'profile', label: 'NGO Profile', icon: Building },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'previous', label: 'Previous Work', icon: Clock },
  ];

  // Get initials from name
  const getInitials = (name) => {
    if (!name) return "N";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const handleLogout = () => {
    // Clear Redux state
    dispatch(setName(null));
    dispatch(setEmail(null));
    dispatch(setRole(null));
    dispatch(setId(null));
    dispatch(setToken(null));
    dispatch(setFcmToken(null));
    dispatch(setLongitude(null));
    dispatch(setLattitude(null));

    // Clear localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('email');
    localStorage.removeItem('name');
    localStorage.removeItem('id');
    localStorage.removeItem('fcm_token');
    localStorage.removeItem('longitude');
    localStorage.removeItem('lattitude');

    // Navigate to login
    navigate('/login');
  };

  return (
    <div className="h-full bg-white shadow-lg w-72 flex flex-col">
      {/* Profile Section */}
      <div className="sticky top-0 z-10 bg-white">
        <div className="p-6 border-b border-gray-100 bg-gradient-to-br from-green-50 to-white">
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center mb-3 shadow-lg ring-4 ring-white">
              <span className="text-xl font-bold text-white">{getInitials(name)}</span>
            </div>
            <h2 className="text-lg font-semibold text-gray-800 mb-1">{name || 'NGO'}</h2>
            <p className="text-sm text-gray-500 mb-2">Active Organization</p>
            <div className="flex items-center space-x-1 text-green-600 bg-green-50 px-3 py-1 rounded-full">
              <Home className="w-3.5 h-3.5" />
              <span className="text-xs font-medium">Online</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4 scrollbar-hide">
        <div className="space-y-1.5">
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              className={`w-full flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-green-50 text-green-600 shadow-sm'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
              onClick={() => {
                setActiveTab(tab.id);
                if (window.innerWidth < 768) {
                  setIsSidebarOpen(false);
                }
              }}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <tab.icon className={`w-5 h-5 mr-3 ${
                activeTab === tab.id ? 'text-green-600' : 'text-gray-400'
              }`} />
              <span className="font-medium">{tab.label}</span>
            </motion.button>
          ))}
        </div>

        {/* Logout Button */}
        <div className="mt-6">
          <motion.button
            onClick={handleLogout}
            className="w-full flex items-center px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-all duration-200"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            <LogOut className="w-5 h-5 mr-3" />
            <span className="font-medium">Logout</span>
          </motion.button>
        </div>
      </nav>
    </div>
  );
};

export default SidebarNgo;
