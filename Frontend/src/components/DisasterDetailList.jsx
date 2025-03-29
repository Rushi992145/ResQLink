import React from 'react';
import { useParams, Link } from 'react-router-dom';

const DisasterDetailList = () => {
  const { id } = useParams();

  // Sample data - replace with your actual data source
  const disaster = {
    id: 1,
    title: "Flood in Bangladesh",
    location: "Dhaka, Bangladesh",
    date: "2024-03-15",
    severity: "High",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    totalDonations: 25000,
    targetAmount: 100000,
    donors: 150,
    description: "Severe flooding has affected thousands of people in Dhaka, Bangladesh. Immediate assistance is needed for food, water, and medical supplies.",
    impact: "Over 50,000 people affected",
    needs: ["Food", "Water", "Medical Supplies", "Shelter"],
    recentDonations: [
      { name: "John Doe", amount: 1000, date: "2024-03-16" },
      { name: "Jane Smith", amount: 500, date: "2024-03-16" },
      { name: "Anonymous", amount: 2000, date: "2024-03-15" },
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-14">
      {/* Hero Section */}
      <div className="relative h-[70vh]">
        <img
          src={disaster.image}
          alt={disaster.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/50"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4 max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">{disaster.title}</h1>
            <div className="flex items-center justify-center space-x-6 text-lg mb-8">
              <span className="flex items-center">
                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {disaster.location}
              </span>
              <span className="flex items-center">
                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {new Date(disaster.date).toLocaleDateString()}
              </span>
            </div>
            <div className="flex items-center justify-center space-x-4">
              <span className="bg-red-500 text-white px-6 py-2 rounded-full text-lg font-medium">
                {disaster.severity} Priority
              </span>
              <Link
                to="/"
                className="bg-green-600 text-white px-8 py-3 rounded-full text-lg font-medium hover:bg-green-700 transition-colors duration-300 transform hover:scale-105 shadow-lg"
              >
                Donate Now
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Description Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">About This Disaster</h2>
            <p className="text-xl text-gray-600 leading-relaxed">{disaster.description}</p>
          </div>

          {/* Impact Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Impact</h2>
            <p className="text-xl text-gray-600">{disaster.impact}</p>
          </div>

          {/* Needs Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Needed Items</h2>
            <div className="flex flex-wrap gap-4">
              {disaster.needs.map((need, index) => (
                <span
                  key={index}
                  className="bg-green-100 text-green-800 px-6 py-3 rounded-full text-lg font-medium"
                >
                  {need}
                </span>
              ))}
            </div>
          </div>

          {/* Donation Progress */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Donation Progress</h2>
            <div className="space-y-6">
              <div className="w-full bg-gray-100 rounded-full h-4">
                <div
                  className="bg-green-600 h-4 rounded-full transition-all duration-500"
                  style={{
                    width: `${(disaster.totalDonations / disaster.targetAmount) * 100}%`,
                  }}
                ></div>
              </div>
              <div className="flex justify-between text-xl">
                <span className="text-gray-600">${disaster.totalDonations.toLocaleString()}</span>
                <span className="text-gray-600">${disaster.targetAmount.toLocaleString()}</span>
              </div>
              <p className="text-gray-500 text-lg">
                {disaster.donors} donors have contributed so far
              </p>
            </div>
          </div>

          {/* Recent Donations */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Recent Donations</h2>
            <div className="space-y-4">
              {disaster.recentDonations.map((donation, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <div>
                    <p className="font-medium text-gray-800 text-lg">{donation.name}</p>
                    <p className="text-gray-500">
                      {new Date(donation.date).toLocaleDateString()}
                    </p>
                  </div>
                  <p className="font-semibold text-green-600 text-xl">
                    ${donation.amount.toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisasterDetailList;
