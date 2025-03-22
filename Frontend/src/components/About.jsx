import React from "react";
import { motion } from "framer-motion";

const About = () => {
  return (
    <div className="min-h-screen pt-16 bg-gradient-to-b from-green-50 to-green-100">
      <div className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl font-bold text-green-800 mb-8 text-center">
            About ResQLink
          </h1>

          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-2xl font-semibold text-green-700 mb-4">
                Our Mission
              </h2>
              <p className="text-gray-600 mb-6">
                ResQLink is dedicated to bridging the gap between
                disaster-affected communities and relief organizations. We
                provide a robust platform that enables quick response and
                efficient resource distribution during critical times.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h2 className="text-2xl font-semibold text-green-700 mb-4">
                What We Do
              </h2>
              <ul className="list-disc list-inside text-gray-600 space-y-3">
                <li>Connect disaster victims with immediate assistance</li>
                <li>Coordinate with NGOs and relief organizations</li>
                <li>Facilitate volunteer registration and deployment</li>
                <li>Provide real-time disaster reporting and tracking</li>
              </ul>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-xl shadow-lg p-8"
          >
            <h2 className="text-2xl font-semibold text-green-700 mb-4">
              Our Impact
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">
                  500+
                </div>
                <div className="text-gray-600">Disasters Managed</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">
                  1000+
                </div>
                <div className="text-gray-600">Active Volunteers</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">
                  50+
                </div>
                <div className="text-gray-600">NGO Partners</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
