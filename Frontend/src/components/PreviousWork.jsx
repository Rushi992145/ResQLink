import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock } from 'lucide-react';

const PreviousWork = () => {
  const workHistory = [
    {
      id: 1,
      title: 'Flood Relief Operation',
      location: 'Downtown Area',
      date: '2024-01-15',
      duration: '8 hours',
      description: 'Assisted in evacuation and provided emergency supplies',
      impact: 'Helped 50+ families',
    },
    {
      id: 2,
      title: 'Emergency Medical Support',
      location: 'City Hospital',
      date: '2024-01-10',
      duration: '6 hours',
      description: 'Provided first aid and medical assistance',
      impact: 'Supported medical staff with 30+ cases',
    },
  ];

  return (
    <motion.div
      className="p-8 max-w-4xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h2 className="text-2xl font-bold mb-8 text-gray-900">Previous Work History</h2>
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
            
            <p className="text-gray-700 mb-3 text-lg">{work.description}</p>
            <p className="text-green-600 font-medium text-lg">{work.impact}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default PreviousWork; 