import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock, Users, Heart } from 'lucide-react';

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
      className="p-8 max-w-4xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h2 className="text-2xl font-bold mb-8 text-gray-900">Previous Campaigns</h2>
      <div className="space-y-6">
        {workHistory.map((work, index) => (
          <motion.div
            key={work.id}
            className="border border-gray-200 rounded-lg p-6 hover:border-green-500 transition-colors duration-200"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <h3 className="text-xl font-semibold mb-4 text-gray-900">{work.title}</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="flex items-center space-x-2 text-gray-600">
                <MapPin className="w-5 h-5 text-green-600" />
                <span>{work.location}</span>
              </div>
              
              <div className="flex items-center space-x-2 text-gray-600">
                <Calendar className="w-5 h-5 text-green-600" />
                <span>{new Date(work.date).toLocaleDateString()}</span>
              </div>
              
              <div className="flex items-center space-x-2 text-gray-600">
                <Clock className="w-5 h-5 text-green-600" />
                <span>{work.duration}</span>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-gray-700 mb-2">{work.description}</p>
              <div className="flex items-center space-x-2 text-green-600">
                <Heart className="w-5 h-5" />
                <span className="font-medium">{work.impact}</span>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Users className="w-5 h-5 text-green-600" />
                <span className="font-medium text-gray-700">
                  {work.volunteers} Volunteers Participated
                </span>
              </div>
              <p className="text-gray-600">
                <span className="font-medium">Resources Deployed:</span> {work.resourcesDeployed}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default NgoPreviousWork;