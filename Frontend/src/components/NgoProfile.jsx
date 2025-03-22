import React, { useState } from 'react';
import { motion } from 'framer-motion';

const NgoProfile = () => {
  const [formData, setFormData] = useState({
    ngoName: 'Help Foundation',
    registrationNumber: 'NGO123456',
    email: 'contact@helpfoundation.org',
    phone: '+1234567890',
    address: '123 Charity Street',
    city: 'New York',
    focusArea: 'We are dedicated to providing disaster relief and humanitarian aid.',
    establishedYear: '2010',
    website: 'www.helpfoundation.org',
    socialMedia: {
      facebook: 'facebook.com/helpfoundation',
      twitter: '@helpfoundation'
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <motion.div
      className="p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h2 className="text-2xl font-bold mb-8 text-gray-900">NGO Information</h2>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">NGO Name</label>
          <input
            type="text"
            name="ngoName"
            value={formData.ngoName}
            onChange={handleChange}
            className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-3"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Registration Number</label>
          <input
            type="text"
            name="registrationNumber"
            value={formData.registrationNumber}
            onChange={handleChange}
            className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-3"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-3"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-3"
          />
        </div>
         {/* Address & City */}
         <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="block w-full rounded-lg border border-gray-300 p-3 focus:border-green-500 focus:ring-green-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="block w-full rounded-lg border border-gray-300 p-3 focus:border-green-500 focus:ring-green-500"
          />
        </div>


        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">About NGO</label>
          <textarea
            name="about"
            value={formData.about}
            onChange={handleChange}
            rows="4"
            className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-3"
          />
        </div>
        {/* Established Year & Website */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Established Year</label>
          <input
            type="text"
            name="establishedYear"
            value={formData.establishedYear}
            onChange={handleChange}
            className="block w-full rounded-lg border border-gray-300 p-3 focus:border-green-500 focus:ring-green-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
          <input
            type="text"
            name="website"
            value={formData.website}
            onChange={handleChange}
            className="block w-full rounded-lg border border-gray-300 p-3 focus:border-green-500 focus:ring-green-500"
          />
        </div>

        {/* Social Media Links */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Facebook</label>
          <input
            type="text"
            name="socialMedia.facebook"
            value={formData.socialMedia.facebook}
            onChange={handleChange}
            className="block w-full rounded-lg border border-gray-300 p-3 focus:border-green-500 focus:ring-green-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Twitter</label>
          <input
            type="text"
            name="socialMedia.twitter"
            value={formData.socialMedia.twitter}
            onChange={handleChange}
            className="block w-full rounded-lg border border-gray-300 p-3 focus:border-green-500 focus:ring-green-500"
          />
        </div>

        <motion.button
          type="submit"
          className="md:col-span-2 bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors duration-200 w-full md:w-auto md:mx-auto"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Update NGO Profile
        </motion.button>
      </form>
    </motion.div>
  );
};

export default NgoProfile;