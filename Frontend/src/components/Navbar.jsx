import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div>
            <nav className="bg-green-700 text-white shadow-lg">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo and Name */}
                        <motion.div
                            className="flex-shrink-0 flex items-center cursor-pointer"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                        >
                            <span className="text-xl font-bold">ResQLink</span>
                        </motion.div>

                        {/* Desktop Menu */}
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-center space-x-4">
                                <a
                                    href="#"
                                    className="px-3 py-2 rounded-md text-sm font-medium hover:bg-green-600 transition-colors duration-200"
                                >
                                    Home
                                </a>
                                <a
                                    href="#"
                                    className="px-3 py-2 rounded-md text-sm font-medium hover:bg-green-600 transition-colors duration-200"
                                >
                                    About
                                </a>
                                <a
                                    href="#"
                                    className="px-3 py-2 rounded-md text-sm font-medium hover:bg-green-600 transition-colors duration-200"
                                >
                                    Contact Us
                                </a>
                            </div>
                        </div>

                        {/* Auth Buttons */}
                        <div className="hidden md:block">
                            <div className="ml-4 flex items-center md:ml-6">
                                <button
                                    className="bg-white text-green-700 px-4 py-1 rounded-md ml-3 text-sm font-medium cursor-pointer hover:bg-gray-200 transition-colors duration-200"
                                >
                                    Login
                                </button>
                                <button
                                    className="bg-green-500 text-white px-4 py-1 rounded-md ml-3 text-sm font-medium cursor-pointer hover:bg-green-600 transition-colors duration-200"
                                >
                                    Register
                                </button>
                            </div>
                        </div>

                        {/* Mobile menu button */}
                        <div className="md:hidden flex items-center">
                            <button
                                className="inline-flex items-center justify-center p-2 rounded-md hover:bg-green-600 focus:outline-none"
                                onClick={() => setIsOpen(!isOpen)}
                            >
                                {isOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile menu - Improved */}
                <div className={`${isOpen ? 'block' : 'hidden'} md:hidden bg-green-700`}>
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <a
                            href="#"
                            className="block px-3 py-2 rounded-md text-base font-medium hover:bg-green-600 transition-colors duration-200"
                        >
                            Home
                        </a>
                        <a
                            href="#"
                            className="block px-3 py-2 rounded-md text-base font-medium hover:bg-green-600 transition-colors duration-200"
                        >
                            About
                        </a>
                        <a
                            href="#"
                            className="block px-3 py-2 rounded-md text-base font-medium hover:bg-green-600 transition-colors duration-200"
                        >
                            Contact Us
                        </a>
                        <div className="flex flex-col space-y-2 pt-4 pb-3 border-t border-green-600">
                            <button className="w-full px-3 py-2 text-center rounded-md text-base font-medium bg-white text-green-700 hover:bg-gray-100 transition-colors duration-200">
                                Login
                            </button>
                            <button className="w-full px-3 py-2 text-center rounded-md text-base font-medium bg-green-500 text-white hover:bg-green-600 transition-colors duration-200">
                                Register
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
