import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import axios from 'axios';

const NgoProfile = () => {
    const accesstoken = useSelector((state) => state.auth.token);
    const id = useSelector((state) => state.auth.id);
    const name = useSelector((state) => state.auth.name);
    const email = useSelector((state) => state.auth.email);

  const [formData, setFormData] = useState({
    organizationName: '',
    registrationNumber: '',
    email: '',
    contact: '',
    address: '',
    city: '',
    focusAreas: [],
    website: '',
  });
  
  useEffect(() => {
      setFormData((prevData) => ({
        ...prevData,
        name,
        email,
      }));
    }, [name, email]);

    useEffect(() => {
      const fetchVolunteerDetails = async () => {
        try {
          console.log("temp",id)
          const response = await axios.post(
            "http://localhost:3000/api/ngos/getngo", // Use POST instead of GET
            { id },  // Pass `id` inside the request body
            {
              headers: {
                Authorization: `Bearer ${accesstoken}`,
                "Content-Type": "application/json"
              }
            }
          );
          console.log("ngo console data", response.data.data);
          setFormData({...response.data.data ,contact: response.data.data.contactNumber});  
        } catch (error) {
          console.error("Error fetching volunteer details:", error);
        }
      };
    
      if (id) {
        fetchVolunteerDetails();
      }
    }, [id, accesstoken]);

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
    e.stopPropagation();
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
    
    // Validate required fields
    if (!formData.organizationName || !formData.registrationNumber || !formData.focusAreas.length) {
      alert('Please fill in all required fields');
      return;
    }

    try {
        const response = await fetch(`http://localhost:3000/api/ngos/update`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accesstoken}`
            },
            body: JSON.stringify({
                userId: id,
                organizationName: formData.organizationName,
                registrationNumber: formData.registrationNumber,
                focusAreas: formData.focusAreas,
                address: formData.address,
                contact: formData.contact,
                website: formData.website,
                city: formData.city
            }),
        });

        if (response.ok) {
            alert('Profile updated successfully!');
        } else {
            const errorData = await response.json();
            alert(errorData.message || 'Failed to update profile');
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
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">NGO Name *</label>
          <input
            type="text"
            name="organizationName"
            value={formData.organizationName}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-3"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Registration Number *</label>
          <input
            type="text"
            name="registrationNumber"
            value={formData.registrationNumber}
            onChange={handleChange}
            required
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
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-3"
          />
        </div>

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
          <label className="block text-sm font-medium text-gray-700 mb-2">Focus Areas *</label>
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
          <div className="flex gap-2">
            <input
              type="text"
              value={newFocusArea}
              onChange={(e) => setNewFocusArea(e.target.value)}
              placeholder="Add a focus area"
              className="flex-1 rounded-lg border border-gray-300 p-3 focus:border-green-500 focus:ring-green-500"
            />
            <motion.button
              type="button"
              onClick={handleAddFocusArea}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Add
            </motion.button>
          </div>
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
        >
          Update NGO Profile
        </motion.button>
      </form>
    </motion.div>
  );
};

export default NgoProfile;