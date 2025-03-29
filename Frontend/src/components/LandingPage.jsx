import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Play, Clock, BookOpen } from "lucide-react";
import EmergencyGuide from "./EmergencyGuide";
import ChatbotButton from "./ChatbotButton";

// Mock data for NGOs
const ngoData = [
  {
    id: 1,
    name: "Red Cross",
    category: "Medical Aid",
    location: "Global",
    description:
      "International humanitarian organization providing emergency assistance.",
    longDescription:
      "The Red Cross is one of the world's largest humanitarian organizations, providing emergency assistance, disaster relief, and disaster preparedness education worldwide. We work in communities around the globe to save lives and promote human dignity.",
    volunteers: 5000,
    rating: 4.8,
    image: "https://example.com/redcross.jpg", // Replace with actual image URL
    contact: {
      phone: "+1 234-567-8900",
      email: "contact@redcross.org",
      website: "www.redcross.org",
      address: "123 Humanitarian Ave, Global HQ",
    },
    stats: {
      peopleHelped: "100K+",
      disastersResponded: "500+",
      yearsActive: "50+",
    },
    recentWork: [
      {
        title: "Flood Relief Operation",
        date: "2024-01-15",
        location: "Downtown Area",
        impact: "Helped 1000+ families",
      },
    ],
  },
  {
    id: 2,
    name: "World Food Programme",
    category: "Food Aid",
    location: "Global",
    description: "Leading humanitarian organization fighting hunger worldwide.",
    longDescription:
      "The World Food Programme is the world's largest humanitarian organization addressing hunger and promoting food security. We provide food assistance to millions of people worldwide.",
    volunteers: 3000,
    rating: 4.7,
    image: "https://example.com/wfp.jpg", // Replace with actual image URL
    contact: {
      phone: "+1 345-678-9012",
      email: "contact@wfp.org",
      website: "www.wfp.org",
      address: "456 Food Security Ave, Global HQ",
    },
    stats: {
      peopleHelped: "80K+",
      disastersResponded: "300+",
      yearsActive: "40+",
    },
    recentWork: [
      {
        title: "Emergency Food Distribution",
        date: "2024-02-01",
        location: "Rural Communities",
        impact: "Fed 5000+ families",
      },
    ],
  },
  {
    id: 3,
    name: "World Food Programme",
    category: "Food Aid",
    location: "Global",
    description: "Leading humanitarian organization fighting hunger worldwide.",
    longDescription:
      "The World Food Programme is the world's largest humanitarian organization addressing hunger and promoting food security. We provide food assistance to millions of people worldwide.",
    volunteers: 3000,
    rating: 4.7,
    image: "https://example.com/wfp.jpg", // Replace with actual image URL
    contact: {
      phone: "+1 345-678-9012",
      email: "contact@wfp.org",
      website: "www.wfp.org",
      address: "456 Food Security Ave, Global HQ",
    },
    stats: {
      peopleHelped: "80K+",
      disastersResponded: "300+",
      yearsActive: "40+",
    },
    recentWork: [
      {
        title: "Emergency Food Distribution",
        date: "2024-02-01",
        location: "Rural Communities",
        impact: "Fed 5000+ families",
      },
    ],
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
  const navigate = useNavigate();

  const filteredNGOs = ngoData.filter((ngo) => {
    return (
      (locationFilter === "" || ngo.location === locationFilter) &&
      (categoryFilter === "" || ngo.category === categoryFilter)
    );
  });

  const uniqueLocations = [...new Set(ngoData.map((ngo) => ngo.location))];
  const uniqueCategories = [...new Set(ngoData.map((ngo) => ngo.category))];

  const handleNgoClick = (ngo) => {
    if (ngo && ngo.id) {
      navigate(`/ngo/${ngo.id}`, {
        state: {
          ngoData: {
            ...ngo,
            image: ngo.image || "https://example.com/default-ngo.jpg",
            longDescription: ngo.longDescription || ngo.description,
            contact: ngo.contact || {
              phone: "Contact Not Available",
              email: "Not Available",
              website: "Not Available",
              address: "Address Not Available",
            },
            stats: ngo.stats || {
              peopleHelped: "N/A",
              disastersResponded: "N/A",
              yearsActive: "N/A",
            },
            recentWork: ngo.recentWork || [],
          },
        },
      });
    } else {
      console.error("Invalid NGO data");
    }
  };

  const courses = [
    {
      id: 1,
      title: "First Aid Basics",
      description:
        "Learn essential first aid techniques and emergency response procedures.",
      duration: "2 hours",
      level: "Beginner",
      modules: 5,
      progress: 60,
      image: "https://example.com/first-aid.jpg",
    },
    {
      id: 2,
      title: "Disaster Management",
      description:
        "Understanding disaster types and effective response strategies.",
      duration: "3 hours",
      level: "Intermediate",
      modules: 8,
      progress: 30,
      image: "https://example.com/disaster.jpg",
    },
    {
      id: 3,
      title: "Emergency Communication",
      description: "Master effective communication during crisis situations.",
      duration: "1.5 hours",
      level: "Advanced",
      modules: 4,
      progress: 0,
      image: "https://example.com/communication.jpg",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Hero Section with improved gradient */}
      <section className="relative py-20 bg-gradient-to-b from-green-50 via-green-100 to-green-200 text-green-800 overflow-hidden pb-32">
        {/* Animated background elements with softer colors */}
        <motion.div
          className="absolute top-0 right-0 w-72 h-72 bg-green-300 rounded-full opacity-20"
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
          className="absolute bottom-0 left-0 w-96 h-96 bg-green-400 rounded-full opacity-10"
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
          <motion.div className="max-w-3xl mx-auto text-center">
            <motion.h1 className="text-5xl font-bold mb-6 text-green-800">
              <motion.span
                className="inline-block"
                whileHover={{ scale: 1.05, color: "#047857" }}
              >
                Disaster
              </motion.span>{" "}
              <motion.span
                className="inline-block"
                whileHover={{ scale: 1.05, color: "#047857" }}
              >
                Relief
              </motion.span>{" "}
              <motion.span
                className="inline-block"
                whileHover={{ scale: 1.05, color: "#047857" }}
              >
                Platform
              </motion.span>
            </motion.h1>

            <motion.p className="text-xl mb-8 leading-relaxed text-green-700">
              A community-powered platform connecting those affected by
              disasters with resources, volunteers, and NGOs for real-time
              emergency response and recovery.
            </motion.p>

            {/* Updated button colors */}
            <motion.div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/register">
                <motion.button
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 20px rgba(16, 185, 129, 0.3)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-green-600 text-white font-bold py-3 px-8 rounded-lg shadow-lg transform transition-all duration-300 hover:bg-green-700"
                >
                  Join Our Community
                </motion.button>
              </Link>

              <Link to="/about">
                <motion.button
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 20px rgba(16, 185, 129, 0.2)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white bg-opacity-50 border-2 border-green-600 text-green-700 font-bold py-3 px-8 rounded-lg transform transition-all duration-300 hover:bg-white hover:bg-opacity-100"
                >
                  Learn More
                </motion.button>
              </Link>
            </motion.div>

            {/* Statistics with improved colors */}
            <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
              {[
                { number: "500+", label: "Disasters Managed", icon: "🚨" },
                { number: "1000+", label: "Volunteers", icon: "👥" },
                { number: "50+", label: "NGO Partners", icon: "🤝" },
                { number: "10K+", label: "Lives Impacted", icon: "❤️" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-white bg-opacity-90 rounded-xl p-6 backdrop-blur-sm border border-green-200 shadow-xl"
                >
                  <div className="text-3xl mb-2">{stat.icon}</div>
                  <motion.h3 className="text-3xl font-bold text-green-700 mb-1">
                    {stat.number}
                  </motion.h3>
                  <p className="text-sm text-green-600 font-medium">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Action Buttons Section with improved gradient */}
      <section className="py-16 bg-gradient-to-b from-green-200 via-white to-green-50 relative overflow-hidden -mt-20">
        {/* Background elements with softer colors */}
        <motion.div
          className="absolute top-0 right-10 w-96 h-96 bg-gradient-to-br from-green-200 to-green-300 rounded-full opacity-30"
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
          className="absolute top-60 left-10 w-80 h-80 bg-gradient-to-tr from-green-100 to-green-200 rounded-full opacity-25"
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
          {/* Action Cards with improved colors */}
          <div className="grid md:grid-cols-2 gap-8 mb-32">
            <motion.div
              whileHover={{
                y: -10,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
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
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
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

          {/* Volunteer Section with improved colors */}
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

          {/* Donation Section with Motivational Quotes */}
          <section className="py-20 bg-gradient-to-b from-green-50 via-white to-green-50 relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute inset-0 overflow-hidden">
              <motion.div
                className="absolute -top-40 -right-40 w-80 h-80 bg-green-200 rounded-full opacity-10"
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 45, 0],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
              <motion.div
                className="absolute -bottom-40 -left-40 w-80 h-80 bg-green-300 rounded-full opacity-10"
                animate={{
                  scale: [1.2, 1, 1.2],
                  rotate: [0, -45, 0],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            </div>

            <div className="container mx-auto px-6 relative">
              <div className="text-center mb-16">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="inline-flex items-center px-4 py-2 bg-green-100 rounded-full text-green-800 font-medium mb-6"
                >
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                  Make a Difference Today
                </motion.div>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-5xl font-bold text-green-800 mb-6"
                >
                  Your Donation Matters
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
                >
                  Join thousands of donors who are making a real difference in disaster relief and community recovery.
                </motion.p>
              </div>

              {/* Motivational Quotes Grid */}
              <div className="grid md:grid-cols-3 gap-8 mb-16">
                {[
                  {
                    quote: "The best way to find yourself is to lose yourself in the service of others.",
                    author: "Mahatma Gandhi",
                    icon: "🌟",
                    color: "from-yellow-50 to-yellow-100",
                    borderColor: "border-yellow-200"
                  },
                  {
                    quote: "No one has ever become poor by giving.",
                    author: "Anne Frank",
                    icon: "💫",
                    color: "from-blue-50 to-blue-100",
                    borderColor: "border-blue-200"
                  },
                  {
                    quote: "The meaning of life is to find your gift. The purpose of life is to give it away.",
                    author: "Pablo Picasso",
                    icon: "✨",
                    color: "from-purple-50 to-purple-100",
                    borderColor: "border-purple-200"
                  }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className={`bg-gradient-to-br ${item.color} rounded-2xl p-8 shadow-xl border ${item.borderColor} hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1`}
                  >
                    <div className="text-5xl mb-6">{item.icon}</div>
                    <p className="text-xl font-medium text-gray-800 mb-6 italic leading-relaxed">"{item.quote}"</p>
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md mr-3">
                        <span className="text-lg">{item.author[0]}</span>
                      </div>
                      <p className="text-sm font-medium text-gray-600">- {item.author}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Donation Impact Stats */}
              <div className="grid md:grid-cols-4 gap-8 mb-16">
                {[
                  { number: "1000+", label: "Lives Saved", icon: "❤️", color: "text-red-500" },
                  { number: "50+", label: "Communities Helped", icon: "🏘️", color: "text-blue-500" },
                  { number: "24/7", label: "Emergency Response", icon: "🚨", color: "text-orange-500" },
                  { number: "100%", label: "Transparency", icon: "🔍", color: "text-green-500" }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="bg-white rounded-2xl p-8 shadow-lg text-center border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <div className={`text-4xl mb-4 ${stat.color}`}>{stat.icon}</div>
                    <div className="text-3xl font-bold text-gray-800 mb-2">{stat.number}</div>
                    <div className="text-sm font-medium text-gray-600">{stat.label}</div>
                  </motion.div>
                ))}
              </div>

              {/* Donation CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="text-center"
              >
                <div className="bg-white rounded-2xl p-8 shadow-xl border border-green-100 max-w-2xl mx-auto">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">Ready to Make a Difference?</h3>
                  <p className="text-gray-600 mb-8">
                    Your donation will help us provide immediate relief and long-term support to communities in need.
                  </p>
                  <Link to="/donate">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-green-600 text-white px-10 py-4 rounded-xl font-bold shadow-lg hover:bg-green-700 transition-all duration-300 flex items-center justify-center mx-auto space-x-3 group"
                    >
                      <span>Donate Now</span>
                      {/* <span className="text-xl transform group-hover:scale-110 transition-transform duration-300">❤️</span> */}
                    </motion.button>
                  </Link>
                  <p className="mt-6 text-sm text-gray-500 flex items-center justify-center">
                    <span className="mr-2">🔒</span>
                    Secure and transparent donation process
                  </p>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Emergency Guide Section */}
          <EmergencyGuide />

          {/* NGO Section with improved background */}
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
                        onClick={() => handleNgoClick(ngo)}
                        className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
                      >
                        <span>View Details</span>
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

      {/* Chatbot Button */}
      <ChatbotButton />
    </div>
  );
};

export default LandingPage;
