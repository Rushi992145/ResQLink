import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock } from 'lucide-react';

const PreviousWork = () => {
  const [workHistory, setWorkHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCompletedDisasters();
  }, []);

  const fetchCompletedDisasters = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/volunteer/completed-disasters', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch completed disasters');
      }

      const data = await response.json();
      setWorkHistory(data.disasters.map(disaster => ({
        id: disaster._id,
        title: disaster.disasterType,
        location: `${disaster.location.lati}, ${disaster.location.long}`,
        date: disaster.resolvedAt,
        duration: calculateDuration(disaster.createdAt, disaster.resolvedAt),
        description: disaster.description,
        impact: `Assisted in ${disaster.disasterType} relief operations`,
        severity: disaster.severity
      })));
    } catch (error) {
      console.error('Error fetching completed disasters:', error);
      setError('Failed to load work history');
    } finally {
      setIsLoading(false);
    }
  };

  const calculateDuration = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const hours = Math.round((end - start) / (1000 * 60 * 60));
    return `${hours} hours`;
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500 p-4">{error}</div>;
  }

  return (
    <motion.div
      className="p-8 max-w-4xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h2 className="text-2xl font-bold mb-8 text-gray-900">Previous Work History</h2>
      {workHistory.length === 0 ? (
        <div className="text-center text-gray-500 py-8">
          No completed disaster relief work yet
        </div>
      ) : (
        <div className="space-y-6">
          {workHistory.map((work, index) => (
            <motion.div
              key={work.id}
              className="border border-gray-200 rounded-lg p-6 hover:border-green-500 transition-colors duration-200"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold text-gray-900">{work.title}</h3>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  work.severity === 'high' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {work.severity} severity
                </span>
              </div>
              
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
              
              <p className="text-gray-700 mb-3">{work.description}</p>
              <p className="text-green-600 font-medium">{work.impact}</p>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default PreviousWork; 