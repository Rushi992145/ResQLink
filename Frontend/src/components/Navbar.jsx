import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Home,
  Phone,
  Shield,
  Building,
  HeartHandshake,
  User,
  LogOut,
  ChevronDown,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import { setToken } from "../Redux/authslice";
import { setEmail } from "../Redux/authslice";
import { setRole } from "../Redux/authslice";
import { setName } from "../Redux/authslice";
import { setId } from "../Redux/authslice";
import { setFcmToken } from "../Redux/authslice";
import { setLattitude } from "../Redux/authslice";
import { setLongitude } from "../Redux/authslice";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const location = useLocation();

  const token = useSelector((state) => state.auth.token);
  const role = useSelector((state) => state.auth.role);
  const name = useSelector((state) => state.auth.name);

  // Get initials from name
  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  // Get dashboard route based on role
  const getDashboardRoute = () => {
    switch (role) {
      case "admin":
        return "/admin-dashboard";
      case "volunteer":
        return "/volunteer-dashboard";
      case "ngo":
        return "/ngo-dashboard";
      default:
        return "/";
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/about", label: "About", icon: HeartHandshake },
    { path: "/contact", label: "Contact", icon: Phone },
    { path: "/ngolist", label: "NGO", icon: Building },
  ];

  function logoutclickhandler()
    {
      
      dispatch(setName(null));
      dispatch(setEmail(null));
      dispatch(setRole(null));
      dispatch(setId(null));
      dispatch(setToken(null));
      dispatch(setFcmToken(null));
      dispatch(setLongitude(null));
      dispatch(setLattitude(null));

      
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      localStorage.removeItem('email');
      localStorage.removeItem('name');
      localStorage.removeItem('id');
      localStorage.removeItem('fcm_token');
      localStorage.removeItem('longitude');
      localStorage.removeItem('lattitude');

      navigate('/login');
    }

    // console.log("token is :",token);

  return (
    <div className="fixed w-full top-0 z-50">
      <motion.nav
        className={`${
          scrolled ? "bg-white shadow-xl" : "bg-green-700"
        } transition-all duration-500`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo and Name */}
            <Link to="/">
              <motion.div
                className="flex items-center space-x-3 cursor-pointer"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                whileHover={{ scale: 1.05 }}
              >
                <div
                  className={`${
                    scrolled ? "bg-green-700" : "bg-white"
                  } p-2 rounded-full transition-colors duration-500`}
                >
                  <Shield
                    className={`h-6 w-6 md:h-8 md:w-8 ${
                      scrolled ? "text-white" : "text-green-700"
                    }`}
                  />
                </div>
                <span
                  className={`text-xl md:text-2xl font-extrabold tracking-tight ${
                    scrolled ? "text-green-700" : "text-white"
                  }`}
                >
                  Res<span className="text-yellow-500">Q</span>Link
                </span>
              </motion.div>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center justify-between flex-1 px-8">
              <div className="flex-1"></div>
              <div className="flex items-center space-x-2">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
                      ${
                        location.pathname === item.path
                          ? scrolled
                            ? "bg-green-600 text-white shadow-md"
                            : "bg-white text-green-700 shadow-md"
                          : scrolled
                          ? "text-green-700 hover:bg-green-50"
                          : "text-white hover:bg-green-600"
                      }`}
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </Link>
                ))}
              </div>

              {/* Auth/Profile Section */}
              <div className="flex-1 flex justify-end">
                {!token ? (
                  <div className="flex items-center space-x-3">
                    <Link to="/login">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`px-5 py-2 rounded-full text-sm font-medium transition-colors duration-300 border-2
                          ${
                            scrolled
                              ? "border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
                              : "border-white text-white hover:bg-white hover:text-green-700"
                          }`}
                      >
                        Login
                      </motion.button>
                    </Link>
                    <Link to="/register">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`px-5 py-2 rounded-full text-sm font-medium shadow-md transition-colors duration-300
                          ${
                            scrolled
                              ? "bg-green-600 text-white hover:bg-green-700"
                              : "bg-white text-green-700 hover:bg-green-50"
                          }`}
                      >
                        Register
                      </motion.button>
                    </Link>
                  </div>
                ) : (
                  <div className="relative">
                    <motion.div
                      className="flex items-center space-x-3 cursor-pointer"
                      onClick={() => setShowProfileMenu(!showProfileMenu)}
                    >
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center  font-medium ${
                          scrolled ? "bg-green-600 text-white" : "bg-white text-green-700"
                        }`}
                      >
                        {getInitials(name)}
                      </div>
                      <ChevronDown
                        className={`w-5 h-5 ${
                          scrolled ? "text-green-700" : "text-white"
                        }`}
                      />
                    </motion.div>

                    {/* Profile Dropdown */}
                    <AnimatePresence>
                      {showProfileMenu && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="absolute right-0 mt-2 w-48 rounded-xl bg-white shadow-lg py-1"
                        >
                          <Link
                            to={getDashboardRoute()}
                            className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-green-50"
                            onClick={() => setShowProfileMenu(false)}
                          >
                            <User className="w-4 h-4" />
                            <span>Dashboard</span>
                          </Link>
                          <button
                            onClick={logoutclickhandler}
                            className="flex items-center space-x-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full"
                          >
                            <LogOut className="w-4 h-4" />
                            <span>Logout</span>
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <motion.button
                className={`inline-flex items-center justify-center p-2 rounded-full focus:outline-none
                  ${
                    scrolled
                      ? "bg-green-600 text-white hover:bg-green-700"
                      : "bg-white text-green-700 hover:bg-green-50"
                  }`}
                onClick={() => setIsOpen(!isOpen)}
                whileTap={{ scale: 0.95 }}
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className={`md:hidden ${
                scrolled ? "bg-white" : "bg-green-800"
              } shadow-xl rounded-b-2xl`}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="px-4 pt-3 pb-4 space-y-1">
                {navItems.map((item) => (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.3,
                      delay: navItems.indexOf(item) * 0.1,
                    }}
                  >
                    <Link
                      to={item.path}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-base font-medium transition-all duration-200
                                                ${
                                                  location.pathname ===
                                                  item.path
                                                    ? scrolled
                                                      ? "bg-green-50 text-green-700 border-l-4 border-green-600"
                                                      : "bg-green-600 text-white border-l-4 border-white"
                                                    : scrolled
                                                    ? "text-gray-700 hover:bg-green-50 hover:text-green-700"
                                                    : "text-white hover:bg-green-600"
                                                }`}
                      onClick={() => setIsOpen(false)}
                    >
                      <item.icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </Link>
                  </motion.div>
                ))}
                <div
                  className={`flex flex-col space-y-3 pt-5 pb-3 border-t ${
                    scrolled ? "border-gray-200" : "border-green-600"
                  }`}
                >
                  <Link to="/login" className="w-full">
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      className={`w-full px-4 py-3 text-center rounded-xl text-base font-medium transition-colors duration-300
                        ${
                          scrolled
                            ? "bg-white border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
                            : "bg-white text-green-700 hover:bg-green-50"
                        }`}
                    >
                      Login
                    </motion.button>
                  </Link>
                  <Link to="/register" className="w-full">
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      className={`w-full px-4 py-3 text-center rounded-xl text-base font-medium shadow-md transition-colors duration-300
                        ${
                          scrolled
                            ? "bg-green-600 text-white hover:bg-green-700"
                            : "bg-white text-green-700 hover:bg-green-50"
                        }`}
                    >
                      Register
                    </motion.button>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Semi-transparent overlay for navbar on the homepage */}
      {!scrolled && location.pathname === "/" && (
        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-black to-transparent opacity-40 z-[-1]"></div>
      )}
    </div>
  );
};

export default Navbar;
