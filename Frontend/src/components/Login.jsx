import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { setToken } from "../Redux/authslice";
import { setEmail } from "../Redux/authslice";
import { setRole } from "../Redux/authslice";
import { setName } from "../Redux/authslice";
import { setId } from "../Redux/authslice";


const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle login logic here

    console.log(formData,typeof(formData));

    const response = await fetch('http://localhost:3000/api/users/login',{
      method : 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body : JSON.stringify(formData)
    })

    const value = await response.json();
    console.log("value is : ",value.data);

    localStorage.setItem('token',value.data.token);
    localStorage.setItem('role',value.data.user.role);
    localStorage.setItem('email',value.data.user.email);
    localStorage.setItem('name',value.data.user.name);
    localStorage.setItem('id',value.data.user._id);

    dispatch(setToken(value.data.token));
    dispatch(setName(value.data.user.name));
    dispatch(setEmail(value.data.user.email));
    dispatch(setRole(value.data.user.role));
    dispatch(setId(value.data.user._id));

    if(value.data.user.role=='volunteer')
    {
      navigate('/volunteer-dashboard');
    }
    else if(value.data.user.role=='ngo')
    {
      console.log("role is :",value.data.user.role);
      navigate('/ngo-dashboard');
    }
    else
    {
      navigate('/admin-dashboard');
    }

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg"
      >
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Welcome Back
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-medium text-green-600 hover:text-green-500"
            >
              Register here
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <motion.div whileTap={{ scale: 0.99 }}>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                email
              </label>
              <input
                id="email"
                name="email"
                type="text"
                required
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </motion.div>

            <motion.div whileTap={{ scale: 0.99 }}>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </motion.div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Sign in
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
