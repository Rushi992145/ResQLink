import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="footer p-6 md:p-10 bg-green-900 text-white mt-40">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* About Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-xl font-bold mb-4">ResQLink</h2>
            <p className="text-gray-300">
              Connecting resources with those in need during emergencies and natural disasters through community-powered relief efforts.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <h3 className="footer-title">Quick Links</h3>
            <ul className="space-y-2">
              <li><a className="link link-hover cursor-pointer transition-all duration-200 hover:translate-x-1 inline-block">Home</a></li>
              <li><a className="link link-hover cursor-pointer transition-all duration-200 hover:translate-x-1 inline-block">Report Disaster</a></li>
              <li><a className="link link-hover cursor-pointer transition-all duration-200 hover:translate-x-1 inline-block">Request Aid</a></li>
              <li><a className="link link-hover cursor-pointer transition-all duration-200 hover:translate-x-1 inline-block">Volunteer</a></li>
              <li><a className="link link-hover cursor-pointer transition-all duration-200 hover:translate-x-1 inline-block">Map</a></li>
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <h3 className="footer-title">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 cursor-pointer hover:text-green-300 transition-colors duration-200">
                <MapPin size={16} />
                <span>1234 Emergency Ave, Safety City</span>
              </li>
              <li className="flex items-center gap-2 cursor-pointer hover:text-green-300 transition-colors duration-200">
                <Phone size={16} />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-2 cursor-pointer hover:text-green-300 transition-colors duration-200">
                <Mail size={16} />
                <span>help@resqlink.org</span>
              </li>
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <h3 className="footer-title">Stay Updated</h3>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text text-gray-300">Subscribe to our newsletter</span>
              </label>
              <div className="join w-full">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="input input-bordered join-item w-full text-black" 
                />
                <button className="btn btn-success join-item cursor-pointer hover:brightness-110 transition-all duration-200">Subscribe</button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Social Media and Copyright */}
        <div className="divider bg-green-700 h-px my-6"></div>
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <motion.div 
            className="flex space-x-4 mb-4 md:mb-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            <a className="btn btn-circle btn-outline cursor-pointer hover:bg-green-600 hover:border-green-600 transition-all duration-200">
              <Facebook size={18} />
            </a>
            <a className="btn btn-circle btn-outline cursor-pointer hover:bg-green-600 hover:border-green-600 transition-all duration-200">
              <Twitter size={18} />
            </a>
            <a className="btn btn-circle btn-outline cursor-pointer hover:bg-green-600 hover:border-green-600 transition-all duration-200">
              <Instagram size={18} />
            </a>
            <a className="btn btn-circle btn-outline cursor-pointer hover:bg-green-600 hover:border-green-600 transition-all duration-200">
              <Linkedin size={18} />
            </a>
          </motion.div>
          
          <motion.div 
            className="text-gray-300 text-sm text-center md:text-right"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.5 }}
          >
            <p>© {new Date().getFullYear()} ResQLink. All rights reserved.</p>
            <p className="mt-1">
              <a className="link link-hover cursor-pointer mr-2">Privacy Policy</a> | 
              <a className="link link-hover cursor-pointer ml-2">Terms of Service</a>
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;