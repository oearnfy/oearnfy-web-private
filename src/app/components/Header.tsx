'use client';

import { useState } from 'react';
import { FaSearch, FaBell, FaUserCircle, FaVideo, FaSignOutAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white shadow-md z-50 px-4">
      <div className="flex items-center justify-between h-full max-w-screen-2xl mx-auto">
        {/* Logo */}
        <Link href="/dashboard" className="flex items-center">
          <Image
            src="/logo.svg"
            alt="OEARNFY"
            width={100}
            height={30}
          />
        </Link>

        {/* Search Bar */}
        <div className="flex-1 max-w-2xl mx-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:border-blue-500"
            />
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <FaSearch className="text-gray-500" />
            </button>
          </div>
        </div>

        {/* Right Side Icons */}
        <div className="flex items-center space-x-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <FaVideo className="text-xl" />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <FaBell className="text-xl" />
          </motion.button>

          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.1 }}
              className="p-2 hover:bg-gray-100 rounded-full"
              onClick={() => setIsProfileOpen(!isProfileOpen)}
            >
              <FaUserCircle className="text-2xl" />
            </motion.button>

            {/* Profile Dropdown */}
            {isProfileOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2"
              >
                <Link href="/profile" className="flex items-center px-4 py-2 hover:bg-gray-100">
                  <FaUserCircle className="mr-2" />
                  Your Channel
                </Link>
                <button
                  onClick={() => {
                    // Handle sign out
                  }}
                  className="flex items-center w-full px-4 py-2 hover:bg-gray-100 text-red-500"
                >
                  <FaSignOutAlt className="mr-2" />
                  Sign Out
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
} 