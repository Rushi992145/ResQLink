import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';

const NgoProfile = () => {
    const accesstoken = useSelector((state) => state.auth.token);
    const id = useSelector((state) => state.auth.id);
    const name = useSelector((state) => state.auth.name);
    const email = useSelector((state) => state.auth.email);

  const [formData, setFormData] = useState({
    organizationName: '',
    registrationNumber: '',
    email: '',
    contactNumber: '',
    address: '',
    city: '',
    focusAreas: ['Disaster Relief', 'Education', 'Healthcare'],
    website: '',
  });

  const [newFocusArea, setNewFocusArea] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddFocusArea = (e) => {
    e.preventDefault();
    if (newFocusArea.trim() && !formData.focusAreas.includes(newFocusArea.trim())) {
      setFormData(prev => ({
        ...prev,
        focusAreas: [...prev.focusAreas, newFocusArea.trim()]
      }));
      setNewFocusArea('');
    }
  };

  const handleRemoveFocusArea = (areaToRemove) => {
    setFormData(prev => ({
      ...prev,
      focusAreas: prev.focusAreas.filter(area => area !== areaToRemove)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await fetch(`https://api.example.com/ngos/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accesstoken}`
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            alert('Profile updated successfully!');
        } else {
            alert('Failed to update profile');
        }
    } catch (error) {
        console.error('Error updating profile:', error);
        alert('Something went wrong');
    }
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
            name="organizationName"
            value={formData.organizationName}
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
            name="contactNumber"
            value={formData.contactNumber}
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
          <label className="block text-sm font-medium text-gray-700 mb-2">Focus Areas</label>
          <div className="flex flex-wrap gap-2 mb-2">
            {formData.focusAreas.map((area, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800"
              >
                {area}
                <button
                  type="button"
                  onClick={() => handleRemoveFocusArea(area)}
                  className="ml-2 text-green-600 hover:text-green-800"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
          <form onSubmit={handleAddFocusArea} className="flex gap-2">
            <input
              type="text"
              value={newFocusArea}
              onChange={(e) => setNewFocusArea(e.target.value)}
              placeholder="Add a focus area"
              className="flex-1 rounded-lg border border-gray-300 p-3 focus:border-green-500 focus:ring-green-500"
            />
            <motion.button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Add
            </motion.button>
          </form>
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

       
        

        <motion.button
          type="submit"
          className="md:col-span-2 bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors duration-200 w-full md:w-auto md:mx-auto"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSubmit}
        >
          Update NGO Profile
        </motion.button>
      </form>
    </motion.div>
  );
};

export default NgoProfile;