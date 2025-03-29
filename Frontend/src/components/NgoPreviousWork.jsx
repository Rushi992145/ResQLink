import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock, Users, Heart, Award } from 'lucide-react';

const NgoPreviousWork = () => {
  const workHistory = [
    {
      id: 1,
      title: 'Flood Relief Campaign',
      location: 'Downtown Area',
      date: '2024-01-15',
      duration: '2 weeks',
      description: 'Coordinated flood relief efforts and provided emergency supplies',
      impact: 'Assisted 500+ families',
      volunteers: 50,
      resourcesDeployed: 'Emergency supplies, Medical kits, Food packages'
    },
    {
      id: 2,
      title: 'Emergency Medical Camp',
      location: 'City Hospital',
      date: '2024-01-10',
      duration: '1 week',
      description: 'Set up emergency medical camp for disaster victims',
      impact: 'Treated 300+ patients',
      volunteers: 30,
      resourcesDeployed: 'Medical equipment, Medicines, First aid supplies'
    }
  ];

  return (
    <motion.div
      className="p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-green-100 rounded-lg">
            <Award className="w-6 h-6 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Previous Campaigns</h2>
        </div>
      </div>

      <div className="space-y-6">
        {workHistory.map((work, index) => (
          <motion.div
            key={work.id}
            className="border border-gray-200 rounded-xl p-6 hover:border-green-500 transition-colors duration-200 bg-white shadow-sm hover:shadow-md"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-semibold text-gray-900">{work.title}</h3>
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                Completed
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="flex items-center space-x-2 text-gray-600 bg-gray-50 p-3 rounded-lg">
                <MapPin className="w-5 h-5 text-green-600" />
                <span>{work.location}</span>
              </div>
              
              <div className="flex items-center space-x-2 text-gray-600 bg-gray-50 p-3 rounded-lg">
                <Calendar className="w-5 h-5 text-green-600" />
                <span>{new Date(work.date).toLocaleDateString()}</span>
              </div>
              
              <div className="flex items-center space-x-2 text-gray-600 bg-gray-50 p-3 rounded-lg">
                <Clock className="w-5 h-5 text-green-600" />
                <span>{work.duration}</span>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-gray-700">{work.description}</p>
              <div className="flex items-center space-x-2 text-green-600">
                <Heart className="w-5 h-5" />
                <span className="font-medium">{work.impact}</span>
              </div>
            </div>

            <div className="mt-6 bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-3">
                <Users className="w-5 h-5 text-green-600" />
                <span className="font-medium text-gray-700">
                  {work.volunteers} Volunteers Participated
                </span>
              </div>
              <div className="text-gray-600">
                <span className="font-medium">Resources Deployed:</span> {work.resourcesDeployed}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default NgoPreviousWork;