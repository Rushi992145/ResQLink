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
      {/* Hero Section - Remove wave divider and adjust bottom padding */}
      <section className="relative py-20 bg-green-600 text-white overflow-hidden pb-32">
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
      </section>

      {/* Action Buttons Section - Combined with NGO section */}
      <section className="py-16 bg-gradient-to-b from-green-600 via-green-400 to-white relative overflow-hidden -mt-20">
        {/* Background elements for combined section */}
        <motion.div
          className="absolute top-0 right-10 w-96 h-96 bg-gradient-to-br from-green-400 to-green-500 rounded-full opacity-30"
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
          className="absolute top-60 left-10 w-80 h-80 bg-gradient-to-tr from-green-300 to-green-400 rounded-full opacity-25"
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
          className="absolute top-96 right-20 w-[500px] h-[500px] bg-gradient-to-br from-green-200 to-green-300 rounded-full opacity-25"
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

        <div className="container mx-auto px-6 relative">
          {/* Action Buttons */}
          <div className="grid md:grid-cols-2 gap-8 mb-32">
            {/* Report Disaster Card */}
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

            {/* Request Assistance Card */}
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

          {/* Volunteer Recruitment Section */}
          <div className="py-20 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="container mx-auto px-6"
            >
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-green-800 mb-6">
                  Make a Difference as a Volunteer
                </h2>
                <p className="text-xl text-black max-w-3xl mx-auto">
                  Join our global community of volunteers and help create
                  positive change during times of crisis.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    icon: "❤️",
                    title: "Save Lives",
                    description:
                      "Your skills and dedication can directly impact and save lives during critical situations.",
                    stats: "500+ lives impacted by volunteers",
                  },
                  {
                    icon: "🤝",
                    title: "Build Communities",
                    description:
                      "Help rebuild and strengthen communities affected by disasters through meaningful contributions.",
                    stats: "200+ communities supported",
                  },
                  {
                    icon: "🌟",
                    title: "Gain Experience",
                    description:
                      "Develop valuable skills in disaster management and humanitarian assistance.",
                    stats: "1000+ active volunteers",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ y: -10 }}
                    className="bg-white rounded-xl p-6 shadow-lg border border-green-100"
                  >
                    <div className="text-4xl mb-4">{item.icon}</div>
                    <h3 className="text-xl font-bold text-green-700 mb-3">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{item.description}</p>
                    <div className="text-sm font-medium text-green-600">
                      {item.stats}
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-12 text-center">
                <Link to="/register">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-green-600 text-white px-8 py-3 rounded-lg font-bold shadow-lg hover:bg-green-700 transition-colors"
                  >
                    Become a Volunteer Today
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          </div>

          {/* NGO Section */}
          <div className="py-20 bg-gradient-to-b from-white to-green-50">
            <div className="text-center mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-block p-2 px-6 bg-green-100 rounded-full text-green-800 font-medium mb-4"
              >
                Trusted Partners
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl font-bold text-green-800 mb-6"
              >
                Our Partner NGOs
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xl text-gray-600 max-w-3xl mx-auto"
              >
                We collaborate with leading humanitarian organizations worldwide
                to ensure swift and effective disaster response. Together, we're
                making a bigger impact.
              </motion.p>
            </div>

            {/* Statistics before NGO list */}
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {[
                { number: "45+", label: "Countries Covered" },
                { number: "100K+", label: "People Helped" },
                { number: "24/7", label: "Emergency Response" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white rounded-xl p-8 shadow-lg text-center border border-green-100"
                >
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            {/* NGO Filter and Cards Container */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-green-100">
              {/* Filter Section */}
              <div className="mb-12 max-w-4xl mx-auto">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-semibold text-green-800">
                    Filter by Category
                  </h3>
                  <p className="text-sm text-gray-600">
                    Select a category to view specific NGOs
                  </p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setCategoryFilter("")}
                    className={`p-4 rounded-xl shadow-sm transition-all duration-200 ${
                      categoryFilter === ""
                        ? "bg-green-500 text-white shadow-lg"
                        : "bg-white text-gray-700 hover:bg-green-50 border border-green-100"
                    }`}
                  >
                    <div className="text-center">
                      <span className="text-2xl mb-2 block">🌟</span>
                      <span className="font-medium">All Categories</span>
                      <span className="block text-xs mt-1 opacity-75">
                        {ngoData.length} NGOs
                      </span>
                    </div>
                  </motion.button>
                  {uniqueCategories.map((category) => (
                    <motion.button
                      key={category}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setCategoryFilter(category)}
                      className={`p-4 rounded-xl shadow-sm transition-all duration-200 ${
                        categoryFilter === category
                          ? "bg-green-500 text-white shadow-lg"
                          : "bg-white text-gray-700 hover:bg-green-50 border border-green-100"
                      }`}
                    >
                      <div className="text-center">
                        <span className="text-2xl mb-2 block">
                          {category === "Medical Aid"
                            ? "🏥"
                            : category === "Food Aid"
                            ? "🍲"
                            : category === "Child Welfare"
                            ? "👶"
                            : category === "Shelter"
                            ? "🏠"
                            : category === "Humanitarian Aid"
                            ? "🤝"
                            : "📦"}
                        </span>
                        <span className="font-medium">{category}</span>
                        <span className="block text-xs mt-1 opacity-75">
                          {
                            ngoData.filter((ngo) => ngo.category === category)
                              .length
                          }{" "}
                          NGOs
                        </span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* NGO Cards Grid */}
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

              {/* No Results Message */}
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
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
