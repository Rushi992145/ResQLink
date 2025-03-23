import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate, Link, useLocation } from 'react-router-dom';
import { MapPin, Phone, Mail, Globe, Users, Award, ArrowLeft, Clock } from 'lucide-react';

const NgoDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [ngo, setNgo] = useState(null);

  useEffect(() => {
    // If we have NGO data in location state, use it
    if (location.state?.ngoData) {
      setNgo(location.state.ngoData);
    } else {
      // If no data in state, you could fetch it using the ID
      // For now, using mock data
      setNgo({
        id: 1,
        name: "Red Cross Society",
        category: "Medical Aid",
        location: "New York",
        description: "International humanitarian organization providing emergency assistance.",
        longDescription: "Detailed description of the NGO's work, mission, and impact...",
        volunteers: 5000,
        rating: 4.8,
        image: "https://example.com/redcross.jpg",
        contact: {
          phone: "+1 234-567-8900",
          email: "contact@redcross.org",
          website: "www.redcross.org",
          address: "123 Humanitarian Ave, New York, NY 10001"
        },
        stats: {
          peopleHelped: "100K+",
          disastersResponded: "500+",
          yearsActive: "50+"
        },
        recentWork: [
          {
            title: "Flood Relief Operation",
            date: "2024-01-15",
            location: "Downtown Area",
            impact: "Helped 1000+ families"
          }
        ]
      });
    }
  }, [location.state, id]);

  if (!ngo) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-600 mb-4">Loading NGO details...</p>
          <motion.button
            onClick={() => navigate(-1)}
            className="text-green-600 hover:text-green-700"
          >
            Go Back
          </motion.button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <motion.button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-green-600 hover:text-green-700 mb-6"
          whileHover={{ x: -4 }}
        >
          <ArrowLeft size={20} />
          <span>Back to NGO List</span>
        </motion.button>

        {/* Hero Section */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
          <div className="h-64 bg-gray-200 relative">
            <img
              src={ngo.image}
              alt={ngo.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-8">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{ngo.name}</h1>
                <div className="flex items-center space-x-4 text-gray-600">
                  <span className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {ngo.location}
                  </span>
                  <span className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    {ngo.volunteers}+ volunteers
                  </span>
                  <span className="flex items-center">
                    <Award className="w-4 h-4 mr-1 text-yellow-500" />
                    {ngo.rating} Rating
                  </span>
                </div>
              </div>
              <Link to="/request-assistance">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Request Aid
                </motion.button>
              </Link>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Left Column - About & Contact */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-xl shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About</h2>
              <p className="text-gray-600">{ngo.longDescription}</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Work</h2>
              <div className="space-y-6">
                {ngo.recentWork.map((work, index) => (
                  <div key={index} className="border-l-4 border-green-500 pl-4">
                    <h3 className="font-semibold text-gray-900">{work.title}</h3>
                    <div className="text-sm text-gray-600 mt-1">
                      <div className="flex items-center space-x-4">
                        <span className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {new Date(work.date).toLocaleDateString()}
                        </span>
                        <span className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {work.location}
                        </span>
                      </div>
                      <p className="mt-2 text-green-600">{work.impact}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Stats & Contact */}
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-sm p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Impact Statistics</h2>
              <div className="grid grid-cols-1 gap-6">
                {Object.entries(ngo.stats).map(([key, value]) => (
                  <div key={key} className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{value}</div>
                    <div className="text-sm text-gray-600 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Contact Information</h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-gray-600">
                  <Phone className="w-5 h-5 text-green-600" />
                  <span>{ngo.contact.phone}</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-600">
                  <Mail className="w-5 h-5 text-green-600" />
                  <span>{ngo.contact.email}</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-600">
                  <Globe className="w-5 h-5 text-green-600" />
                  <span>{ngo.contact.website}</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-600">
                  <MapPin className="w-5 h-5 text-green-600" />
                  <span>{ngo.contact.address}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NgoDetail;
