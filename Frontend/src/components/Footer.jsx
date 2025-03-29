import React from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Shield,
} from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-green-700 to-green-800 text-white w-full">
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10 ${window.location.pathname.includes('/ngo-dashboard') ? 'md:pl-72' : ''}`}>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            <Link to="/">
              <motion.div
                className="flex items-center space-x-3 cursor-pointer"
                whileHover={{ scale: 1.05 }}
              >
                <div className="bg-white p-2 rounded-full">
                  <Shield className="h-8 w-8 text-green-700" />
                </div>
                <span className="text-2xl font-extrabold tracking-tight">
                  Res<span className="text-yellow-500">Q</span>Link
                </span>
              </motion.div>
            </Link>
            <p className="text-green-100 text-sm leading-relaxed">
              Connecting resources with those in need during emergencies and
              natural disasters through community-powered relief efforts.
            </p>
            <div className="flex space-x-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
                <motion.a
                  key={index}
                  href="#"
                  className="bg-green-600 p-2 rounded-full hover:bg-green-500 transition-colors duration-200"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="space-y-3"
          >
            <h3 className="text-lg font-bold">Quick Links</h3>
            <ul className="space-y-3">
              {["Home", "About", "Volunteer", "NGO", "Contact"].map((item) => (
                <motion.li key={item} whileHover={{ x: 5 }}>
                  <Link
                    to={
                      item.toLowerCase() === "home"
                        ? "/"
                        : `/${item.toLowerCase()}`
                    }
                    className="flex items-center space-x-2 text-green-100 hover:text-white transition-colors duration-200 text-sm"
                  >
                    <span>{item}</span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="space-y-3"
          >
            <h3 className="text-lg font-bold">Contact Us</h3>
            <ul className="space-y-4">
              {[
                {
                  icon: MapPin,
                  text: "123 Relief Street, City",
                  href: "https://maps.google.com",
                },
                {
                  icon: Phone,
                  text: "+1 (555) 123-4567",
                  href: "tel:+15551234567",
                },
                {
                  icon: Mail,
                  text: "help@resqlink.com",
                  href: "mailto:help@resqlink.com",
                },
              ].map((item, index) => (
                <motion.li
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center space-x-3"
                >
                  <div className="bg-green-600 p-2 rounded-full">
                    <item.icon className="w-4 h-4" />
                  </div>
                  <a
                    href={item.href}
                    className="text-green-100 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {item.text}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="space-y-3"
          >
            <h3 className="text-lg font-bold">Stay Updated</h3>
            <p className="text-sm text-green-100">
              Subscribe to our newsletter for updates and emergency alerts.
            </p>
            <form className="space-y-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded-lg bg-green-600 border border-green-500 text-white placeholder-green-200 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-4 py-2 rounded-lg bg-yellow-100 text-green-800 font-medium hover:bg-yellow-300 transition-colors duration-200"
              >
                Subscribe
              </motion.button>
            </form>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          className="mt-6 md:mt-8 pt-4 md:pt-6 border-t border-green-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-green-100">
              © {new Date().getFullYear()} ResQLink. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center md:justify-end items-center gap-4 md:gap-6">
              {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(
                (item) => (
                  <Link
                    key={item}
                    to={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
                    className="text-sm text-green-100 hover:text-white transition-colors duration-200"
                  >
                    {item}
                  </Link>
                )
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
