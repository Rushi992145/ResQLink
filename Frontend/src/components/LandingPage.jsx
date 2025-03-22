import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

// Mock data for NGOs
const ngoData = [
  { id: 1, name: "Red Cross", category: "Medical Aid", location: "Global" },
  {
    id: 2,
    name: "World Food Programme",
    category: "Medical Aid",
    location: "Global",
  },
  {
    id: 3,
    name: "World Food Programme",
    category: "Food Aid",
    location: "Global",
  },
  { id: 4, name: "UNICEF", category: "Child Welfare", location: "Global" },
  {
    id: 5,
    name: "Habitat for Humanity",
    category: "Shelter",
    location: "Global",
  },
  {
    id: 6,
    name: "Save the Children",
    category: "Child Welfare",
    location: "Regional",
  },
  { id: 7, name: "Direct Relief", category: "Medical Aid", location: "Local" },
  {
    id: 8,
    name: "CARE International",
    category: "Humanitarian Aid",
    location: "Global",
  },
];

const LandingPage = () => {
  const [locationFilter, setLocationFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  const filteredNGOs = ngoData.filter((ngo) => {
    return (
      (locationFilter === "" || ngo.location === locationFilter) &&
      (categoryFilter === "" || ngo.category === categoryFilter)
    );
  });

  const uniqueLocations = [...new Set(ngoData.map((ngo) => ngo.location))];
  const uniqueCategories = [...new Set(ngoData.map((ngo) => ngo.category))];

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Enhanced Hero Section */}
      <section className="relative py-20 bg-green-600 text-white overflow-hidden">
        {/* Animated background elements */}
        <motion.div
          className="absolute top-0 right-0 w-72 h-72 bg-green-500 rounded-full opacity-20"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-96 h-96 bg-green-500 rounded-full opacity-10"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [0, -90, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        <div className="container mx-auto px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center"
          >
            <motion.h1
              className="text-5xl font-bold mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <motion.span
                className="inline-block"
                whileHover={{ scale: 1.05, color: "#ffffff" }}
              >
                Disaster
              </motion.span>{" "}
              <motion.span
                className="inline-block"
                whileHover={{ scale: 1.05, color: "#ffffff" }}
              >
                Relief
              </motion.span>{" "}
              <motion.span
                className="inline-block"
                whileHover={{ scale: 1.05, color: "#ffffff" }}
              >
                Platform
              </motion.span>
            </motion.h1>

            <motion.p
              className="text-xl mb-8 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              A community-powered platform connecting those affected by
              disasters with resources, volunteers, and NGOs for real-time
              emergency response and recovery.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link to="/register">
                <motion.button
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 20px rgba(255,255,255,0.3)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-green-600 font-bold py-3 px-8 rounded-lg shadow-lg transform transition-all duration-300 hover:rotate-1"
                >
                  Join Our Community
                </motion.button>
              </Link>

              <Link to="/about">
                <motion.button
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 20px rgba(255,255,255,0.2)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-transparent border-2 border-white text-white font-bold py-3 px-8 rounded-lg transform transition-all duration-300 hover:-rotate-1"
                >
                  Learn More
                </motion.button>
              </Link>
            </motion.div>

            {/* Enhanced statistics section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16"
            >
              {[
                { number: "500+", label: "Disasters Managed", icon: "🚨" },
                { number: "1000+", label: "Volunteers", icon: "👥" },
                { number: "50+", label: "NGO Partners", icon: "🤝" },
                { number: "10K+", label: "Lives Impacted", icon: "❤️" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-green-700 bg-opacity-20 rounded-xl p-6 backdrop-blur-sm border border-white border-opacity-20 shadow-xl"
                >
                  <div className="text-3xl mb-2">{stat.icon}</div>
                  <motion.h3
                    className="text-3xl font-bold text-white mb-1"
                    whileHover={{ scale: 1.1 }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                  >
                    {stat.number}
                  </motion.h3>
                  <p className="text-sm text-white text-opacity-90 font-medium">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Enhanced wave divider */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden">
          <motion.svg
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="relative block w-full h-12"
          >
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
              className="fill-white"
            />
          </motion.svg>
        </div>
      </section>

      {/* Action Buttons Section - Updated with green gradient and animations */}
      <section className="py-16 bg-gradient-to-b from-green-50 to-green-100 relative overflow-hidden">
        {/* Enhanced animated background elements */}
        <motion.div
          className="absolute top-20 right-10 w-96 h-96 bg-gradient-to-br from-green-300 to-green-400 rounded-full opacity-30"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 45, 0],
            y: [-10, 10, -10],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-10 left-10 w-80 h-80 bg-gradient-to-tr from-green-400 to-green-500 rounded-full opacity-25"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [0, -45, 0],
            x: [-10, 10, -10],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-40 left-1/4 w-64 h-64 bg-gradient-to-bl from-green-200 to-green-300 rounded-full opacity-20"
          animate={{
            scale: [1, 1.1, 1],
            y: [-15, 15, -15],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <div className="container mx-auto px-6 relative">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              whileHover={{
                y: -10,
                boxShadow:
                  "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
              className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-lg overflow-hidden shadow-md"
            >
              <div className="p-8">
                <h2 className="text-2xl font-bold mb-4">Report a Disaster</h2>
                <p className="mb-6">
                  Help others by reporting disasters in your area. Your
                  information can save lives and direct resources where they're
                  needed most.
                </p>
                <Link to="/report-disaster">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white text-green-500 font-bold py-2 px-6 rounded-lg"
                  >
                    Report Now
                  </motion.button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              whileHover={{
                y: -10,
                boxShadow:
                  "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
              className="bg-gradient-to-br from-green-600 to-green-700 text-white rounded-lg overflow-hidden shadow-md"
            >
              <div className="p-8">
                <h2 className="text-2xl font-bold mb-4">Request Assistance</h2>
                <p className="mb-6">
                  Need help during a disaster? Request essential resources like
                  food, water, medical aid, or shelter through our platform.
                </p>
                <Link to="/request-assistance">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white text-green-600 font-bold py-2 px-6 rounded-lg"
                  >
                    Request Aid
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* NGO List Section - Updated with green theme */}
      <section className="py-16 bg-gradient-to-b from-green-100 to-green-50 relative overflow-hidden">
        {/* Enhanced animated background elements */}
        <motion.div
          className="absolute top-20 right-20 w-[500px] h-[500px] bg-gradient-to-br from-green-300 to-green-400 rounded-full opacity-25"
          animate={{
            scale: [1, 1.1, 1],
            x: [0, 30, 0],
            y: [-20, 20, -20],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-20 w-[600px] h-[600px] bg-gradient-to-tr from-green-400 to-green-500 rounded-full opacity-20"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [0, -30, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/3 w-72 h-72 bg-gradient-to-bl from-green-200 to-green-300 rounded-full opacity-30"
          animate={{
            scale: [1.1, 1, 1.1],
            y: [-20, 20, -20],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <div className="container mx-auto px-6 relative">
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-bold text-green-800 mb-4"
            >
              Our Partner NGOs
            </motion.h2>
            <p className="text-lg text-green-700 max-w-2xl mx-auto">
              We work with trusted organizations worldwide to ensure effective
              disaster response.
            </p>
          </div>

          {/* Improved Filters */}
          <div className="mb-12 max-w-3xl mx-auto bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-md border border-green-100">
            <div className="flex justify-center items-center md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Filter by Category
                </label>
                <select
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 transition-colors"
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                >
                  <option value="">All Categories</option>
                  {uniqueCategories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* NGO Cards Grid - Cards will keep their existing styling for contrast */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredNGOs.map((ngo) => (
              <motion.div
                key={ngo.id}
                whileHover={{
                  scale: 1.03,
                  boxShadow:
                    "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                }}
                className="bg-white/90 backdrop-blur-sm rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 border border-green-50"
              >
                <div className="p-6">
                  <div className="bg-green-50 rounded-lg p-4 mb-4">
                    <svg
                      className="w-12 h-12 text-green-600 mx-auto"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-800">
                    {ngo.name}
                  </h3>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                        {ngo.category}
                      </span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600"></div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
                  >
                    <span>View Profile</span>
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredNGOs.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12 bg-white/80 backdrop-blur-sm rounded-xl shadow-md border border-green-100"
            >
              <svg
                className="w-16 h-16 text-gray-400 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-gray-500 text-lg">
                No NGOs found matching your filters. Please try different
                criteria.
              </p>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
