import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock, Award, ArrowLeft } from 'lucide-react';
import CertificateGenerator from './CertificateGenerator';

const PreviousWork = () => {
  const [showCertificate, setShowCertificate] = useState(false);
  const [selectedWork, setSelectedWork] = useState(null);

  // Static data for completed disaster assignments
  const completedWork = [
    {
      _id: '1',
      disasterType: 'Flood Relief',
      location: {
        lati: '19.0760° N',
        long: '72.8777° E',
        name: 'Mumbai, Maharashtra'
      },
      severity: 'High',
      startDate: '2024-02-15',
      endDate: '2024-02-20',
      description: 'Assisted in evacuation operations during severe flooding in low-lying areas. Coordinated with local authorities for emergency response.',
      name: 'Raj Kumar', // contact person
      contactNumber: '+91 98765 43210',
      status: 'completed'
    },
    {
      _id: '2',
      disasterType: 'Cyclone Response',
      location: {
        lati: '13.0827° N',
        long: '80.2707° E',
        name: 'Chennai, Tamil Nadu'
      },
      severity: 'Severe',
      startDate: '2024-01-10',
      endDate: '2024-01-15',
      description: 'Participated in pre-cyclone evacuation and post-cyclone relief distribution. Helped in setting up temporary shelters.',
      name: 'Priya Singh',
      contactNumber: '+91 87654 32109',
      status: 'completed'
    },
    {
      _id: '3',
      disasterType: 'Earthquake Relief',
      location: {
        lati: '22.2587° N',
        long: '71.1924° E',
        name: 'Bhuj, Gujarat'
      },
      severity: 'Critical',
      startDate: '2023-12-01',
      endDate: '2023-12-10',
      description: 'Engaged in search and rescue operations, debris clearing, and emergency medical assistance coordination.',
      name: 'Amit Patel',
      contactNumber: '+91 76543 21098',
      status: 'completed'
    }
  ];

  const handleGenerateCertificate = (work) => {
    setSelectedWork(work);
    setShowCertificate(true);
  };

  const calculateDuration = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const days = Math.round((end - start) / (1000 * 60 * 60 * 24));
    return `${days} days`;
  };

  const getSeverityColor = (severity) => {
    switch (severity.toLowerCase()) {
      case 'high':
        return 'bg-orange-100 text-orange-800';
      case 'severe':
        return 'bg-red-100 text-red-800';
      case 'critical':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  if (showCertificate && selectedWork) {
    return (
      <div>
        <button
          onClick={() => setShowCertificate(false)}
          className="mb-4 px-4 py-2 text-blue-600 hover:text-blue-800 flex items-center"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Previous Work
        </button>
        <CertificateGenerator
          disasterName={selectedWork.disasterType}
        />
      </div>
    );
  }

  return (
    <motion.div
      className="p-8 max-w-4xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h2 className="text-2xl font-bold mb-8 text-gray-900">Previous Disaster Relief Work</h2>
      <div className="space-y-6">
        {completedWork.map((work, index) => (
          <motion.div
            key={work._id}
            className="border border-gray-200 rounded-lg p-6 hover:border-green-500 transition-colors duration-200 bg-white shadow-sm"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-semibold text-gray-900">{work.disasterType}</h3>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getSeverityColor(work.severity)}`}>
                {work.severity} severity
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="flex items-center space-x-2 text-gray-600">
                <MapPin className="w-5 h-5 text-green-600" />
                <div>
                  <p className="font-medium">{work.location.name}</p>
                  <p className="text-xs text-gray-500">
                    {work.location.lati}, {work.location.long}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 text-gray-600">
                <Calendar className="w-5 h-5 text-green-600" />
                <div>
                  <p className="font-medium">{new Date(work.startDate).toLocaleDateString()}</p>
                  <p className="text-xs text-gray-500">Start Date</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 text-gray-600">
                <Clock className="w-5 h-5 text-green-600" />
                <div>
                  <p className="font-medium">{calculateDuration(work.startDate, work.endDate)}</p>
                  <p className="text-xs text-gray-500">Duration</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div>
                <h4 className="text-sm font-medium text-gray-500">Description</h4>
                <p className="text-gray-700 mt-1">{work.description}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Contact Person</h4>
                  <p className="text-gray-700 mt-1">{work.name}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Contact Number</h4>
                  <p className="text-gray-700 mt-1">{work.contactNumber}</p>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
              <span className="text-xs text-gray-500">
                Completed on: {new Date(work.endDate).toLocaleDateString()}
              </span>
              <motion.button
                onClick={() => handleGenerateCertificate(work)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Award className="w-4 h-4" />
                <span>Get Certificate</span>
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default PreviousWork; 