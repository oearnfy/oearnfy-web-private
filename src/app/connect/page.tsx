'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const ConnectPage = () => {
  const router = useRouter();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  return (
    <div className="min-h-screen relative overflow-hidden bg-[#0A0F1E] flex items-center justify-center p-4">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(17,24,39,1),rgba(0,0,0,0))]" />
        
        {/* Star field background */}
        <div className="absolute inset-0 opacity-50">
          <div className="absolute inset-0" style={{ backgroundImage: 'url(/stars.svg)', backgroundRepeat: 'repeat' }} />
        </div>
        
        {/* Animated gradient overlay */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-900/10 to-transparent animate-pulse-slow" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-900/10 to-transparent animate-pulse-slower" />
        </div>
      </div>

      {/* Interactive gradient background */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(56, 189, 248, 0.15) 0%, transparent 60%)`
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md"
      >
        {/* Decorative top line */}
        <div className="absolute -top-px left-1/2 transform -translate-x-1/2 w-1/4 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent" />

        <div className="relative bg-white/5 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/10">
          {/* Glassmorphism card effect */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-white/0 pointer-events-none" />
          
          <div className="relative z-10">
            {/* Logo section */}
            <div className="text-center mb-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.5, rotateY: 180 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                transition={{ 
                  duration: 1,
                  type: "spring",
                  stiffness: 100,
                  damping: 15
                }}
                className="mb-6 relative w-32 h-32 mx-auto"
              >
                <div className="absolute inset-0 bg-gradient-conic from-blue-500 via-purple-500 to-pink-500 rounded-xl opacity-75 blur-lg animate-spin-slow" />
                <div className="relative bg-black/40 backdrop-blur-sm rounded-xl p-4 border border-white/10 shadow-xl transform hover:scale-105 transition-transform duration-300">
                  <Image
                    src="/logo.svg"
                    alt="Logo"
                    width={96}
                    height={96}
                    className="w-24 h-24 mx-auto filter drop-shadow-glow animate-float"
                    priority
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="space-y-2"
              >
                <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                  Connect
                </h2>
                <p className="text-gray-400 text-lg">
                  একটি অ্যাকাউন্ট বেছে নিন
                </p>
                <p className="text-gray-500 text-sm mt-2">
                  একটি অ্যাকাউন্ট নির্বাচন করা হলে আপনাকে পুনঃনির্দেশিত করা হবে: https://oearnfy.com
                </p>
              </motion.div>
            </div>

            {/* Connection options */}
            <div className="space-y-4">
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                onClick={() => router.push('/signup')}
                className="w-full relative group bg-gradient-to-r from-blue-500 to-purple-500 text-white py-4 px-6 rounded-lg font-semibold transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative">oearnfy.com-এ অব্যাহত থাকার জন্য</span>
              </motion.button>

              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                onClick={() => router.push('/login')}
                className="w-full relative group bg-white/5 hover:bg-white/10 text-white py-4 px-6 rounded-lg font-semibold transition-all duration-300 border border-white/10"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative">Log In</span>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Decorative bottom line */}
        <div className="absolute -bottom-px left-1/2 transform -translate-x-1/2 w-1/4 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
      </motion.div>
    </div>
  );
};

export default ConnectPage; 