import React from 'react';
import { Link } from 'react-router-dom';

const DisasterList = () => {
  // Sample data - replace with your actual data source
  const disasters = [
    {
      id: 1,
      title: "Flood in Bangladesh",
      location: "Dhaka, Bangladesh",
      date: "2024-03-15",
      severity: "High",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      totalDonations: 25000,
      targetAmount: 100000,
      donors: 150
    },
    {
      id: 2,
      title: "Earthquake in Nepal",
      location: "Kathmandu, Nepal",
      date: "2024-03-10",
      severity: "Critical",
      image: "https://images.unsplash.com/photo-1540202404-1b927e27fa8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      totalDonations: 45000,
      targetAmount: 200000,
      donors: 300
    },
    // Add more disasters as needed
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-14">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-green-700 to-green-800 text-white">
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="relative container mx-auto px-4 py-24">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
            Disaster Relief Efforts
          </h1>
          <p className="text-xl text-center max-w-2xl mx-auto text-green-100">
            Join us in making a difference. Support ongoing disaster relief efforts and help communities rebuild.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {disasters.map((disaster) => (
            <Link
              to={`/disaster/${disaster.id}`}
              key={disaster.id}
              className="group"
            >
              <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
                <div className="relative h-56">
                  <img
                    src={disaster.image}
                    alt={disaster.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {disaster.severity}
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent h-20"></div>
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-green-600 transition-colors">
                    {disaster.title}
                  </h2>
                  <div className="flex items-center text-gray-600 mb-3">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {disaster.location}
                  </div>
                  <div className="flex items-center text-gray-600 mb-4">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {new Date(disaster.date).toLocaleDateString()}
                  </div>
                  <div className="space-y-3">
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div
                        className="bg-green-600 h-2 rounded-full transition-all duration-500"
                        style={{
                          width: `${(disaster.totalDonations / disaster.targetAmount) * 100}%`,
                        }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">${disaster.totalDonations.toLocaleString()}</span>
                      <span className="text-gray-600">${disaster.targetAmount.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      {disaster.donors} donors
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DisasterList;
