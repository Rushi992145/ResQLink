import React, { useState , useEffect, use} from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const Profile = () => {
  const accesstoken = useSelector((state) => state.auth.token);
  const id = useSelector((state) => state.auth.id);
  const name = useSelector((state) => state.auth.name);
  const email = useSelector((state) => state.auth.email);

  useEffect(() => {
    const fetchVolunteerDetails = async () => {
      try {
        console.log("temp",id)
        const response = await axios.post(
          "http://localhost:3000/api/volunteers/getvoldetails", // Use POST instead of GET
          { id },  // Pass `id` inside the request body
          {
            headers: {
              Authorization: `Bearer ${accesstoken}`,
              "Content-Type": "application/json"
            }
          }
        );
        console.log(response.data);
        setFormData(response.data);  
      } catch (error) {
        console.error("Error fetching volunteer details:", error);
      }
    };
  
    if (id) {
      fetchVolunteerDetails();
    }
  }, [id, accesstoken]);
  

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    bloodGroup: "",
    aadharNumber: "",
    familyContact: "",
    emergencyContact: "",
    skills: "",
    availability: "",
  });



  // Use useEffect to set initial values from Redux state
  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      name,
      email,
    }));
  }, [name, email]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/api/volunteers/", 
        { userId: id, ...formData, accesstoken },
        {
          headers: {
            Authorization: `Bearer ${accesstoken}`,
            "Content-Type": "application/json",
          },
        }
      );

      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    }
  };

  return (
    <motion.div className="p-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <h2 className="text-2xl font-bold mb-8 text-gray-900">Profile Information</h2>

      <form className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto" onSubmit={handleSubmit}>
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-3"
          />
        </div>

        {/* Email */}
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

        {/* Phone */}
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

        {/* Address */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-3"
          />
        </div>

        {/* City */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-3"
          />
        </div>

        {/* Blood Group */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Blood Group</label>
          <input
            type="text"
            name="bloodGroup"
            value={formData.bloodGroup}
            onChange={handleChange}
            className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-3"
          />
        </div>

        {/* Aadhar Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Aadhar Number</label>
          <input
            type="text"
            name="aadharNumber"
            value={formData.aadharNumber}
            onChange={handleChange}
            className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-3"
          />
        </div>

        {/* Family Contact Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Family Contact No.</label>
          <input
            type="tel"
            name="familyContact"
            value={formData.familyContact}
            onChange={handleChange}
            className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-3"
          />
        </div>

        {/* Emergency Contact */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Emergency Contact</label>
          <input
            type="tel"
            name="emergencyContact"
            value={formData.emergencyContact}
            onChange={handleChange}
            className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-3"
          />
        </div>

        {/* Skills */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Skills</label>
          <textarea
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            rows="3"
            className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-3"
          />
        </div>

        {/* Availability */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Availability</label>
          <input
            type="text"
            name="availability"
            value={formData.availability}
            onChange={handleChange}
            className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-3"
          />
        </div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          className="md:col-span-2 bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors duration-200 w-full md:w-auto md:mx-auto"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Update Profile
        </motion.button>
      </form>
    </motion.div>
  );
};

export default Profile;
