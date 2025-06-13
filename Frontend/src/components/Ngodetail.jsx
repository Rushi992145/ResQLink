import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate, Link, useLocation } from 'react-router-dom';
import { MapPin, Phone, Mail, Globe, ArrowLeft, Clock, Users, Target, Award, Heart } from 'lucide-react';

const NgoDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [ngo, setNgo] = useState(null);

  useEffect(() => {
    if (location.state?.ngoData) {
      setNgo(location.state.ngoData);
    }
  }, [location.state]);

  if (!ngo) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center bg-gray-50">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p className="text-xl text-gray-600 mb-4">Loading NGO details...</p>
          <motion.button
            onClick={() => navigate(-1)}
            className="text-green-600 hover:text-green-700 font-medium"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Go Back
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <motion.button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-green-600 hover:text-green-700 mb-6 font-medium"
          whileHover={{ x: -4 }}
        >
          <ArrowLeft size={20} />
          <span>Back to NGO List</span>
        </motion.button>

        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden mb-8 border border-gray-100"
        >
          <div className="bg-gradient-to-r from-green-500 to-green-600 p-1"></div>
          <div className="p-8">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{ngo.organizationName}</h1>
                <div className="flex items-center space-x-4 text-gray-600">
                  <span className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {ngo.city}
                  </span>
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 border border-green-200">
                    {ngo.status}
                  </span>
                </div>
              </div>
              <Link to="/request-assistance">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2 shadow-md"
                >
                  <Heart size={20} />
                  <span>Request Aid</span>
                </motion.button>
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8"
        >
          {[
            { icon: Users, label: 'Team Members', value: '50+' },
            { icon: Target, label: 'Projects Completed', value: '100+' },
            { icon: Award, label: 'Years Active', value: '10+' },
            { icon: Heart, label: 'Lives Impacted', value: '10,000+' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
            >
              <stat.icon className="w-8 h-8 text-green-600 mb-3" />
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Left Column - About & Focus Areas */}
          <div className="lg:col-span-2 space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl shadow-sm p-8 border border-gray-100"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <MapPin className="w-6 h-6 mr-2 text-green-600" />
                Address
              </h2>
              <p className="text-gray-600 leading-relaxed">{ngo.address}</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-xl shadow-sm p-8 border border-gray-100"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Target className="w-6 h-6 mr-2 text-green-600" />
                Focus Areas
              </h2>
              <div className="flex flex-wrap gap-3">
                {ngo.focusAreas.map((area, index) => (
                  <motion.span
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    className="px-4 py-2 bg-green-50 text-green-700 rounded-full text-sm font-medium border border-green-200 shadow-sm"
                  >
                    {area}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Contact & Registration */}
          <div className="space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-xl shadow-sm p-8 border border-gray-100"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <Phone className="w-5 h-5 mr-2 text-green-600" />
                Contact Information
              </h2>
              <div className="space-y-4">
                <motion.div 
                  whileHover={{ x: 5 }}
                  className="flex items-center space-x-3 text-gray-600 p-3 rounded-lg hover:bg-gray-50"
                >
                  <Phone className="w-5 h-5 text-green-600" />
                  <span>{ngo.contactNumber}</span>
                </motion.div>
                <motion.div 
                  whileHover={{ x: 5 }}
                  className="flex items-center space-x-3 text-gray-600 p-3 rounded-lg hover:bg-gray-50"
                >
                  <Globe className="w-5 h-5 text-green-600" />
                  <a href={ngo.website} target="_blank" rel="noopener noreferrer" className="hover:text-green-600">
                    {ngo.website}
                  </a>
                </motion.div>
                <motion.div 
                  whileHover={{ x: 5 }}
                  className="flex items-center space-x-3 text-gray-600 p-3 rounded-lg hover:bg-gray-50"
                >
                  <MapPin className="w-5 h-5 text-green-600" />
                  <span>{ngo.address}</span>
                </motion.div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-xl shadow-sm p-8 border border-gray-100"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <Award className="w-5 h-5 mr-2 text-green-600" />
                Registration Details
              </h2>
              <div className="space-y-4">
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="text-center p-6 bg-gray-50 rounded-lg border border-gray-100"
                >
                  <div className="text-2xl font-bold text-green-600">{ngo.registrationNumber}</div>
                  <div className="text-sm text-gray-600 mt-1">Registration Number</div>
                </motion.div>
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="text-center p-6 bg-gray-50 rounded-lg border border-gray-100"
                >
                  <div className="text-2xl font-bold text-green-600">
                    {new Date(ngo.createdAt).toLocaleDateString()}
                  </div>
                  <div className="text-sm text-gray-600 mt-1">Established Date</div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NgoDetail;
