'use client';

import Link from 'next/link';

export default function WelcomePage() {
  return (
    <div className="min-h-[100dvh] flex flex-col items-center justify-center p-4 bg-gradient-to-b from-gray-50 to-gray-100 overflow-x-hidden">
      <div className="w-full max-w-[min(100%,24rem)] mx-auto bg-white rounded-2xl shadow-xl p-4 sm:p-6 space-y-6 border border-gray-200 safe-area-inset-bottom">
        {/* Logo Circle */}
        <div className="flex justify-center">
          <div className="relative hover-trigger group">
            {/* Enhanced Glow Effect with refined colors */}
            <div className="absolute -inset-6 bg-gradient-to-r from-blue-400/40 via-purple-400/40 to-pink-400/40 rounded-full opacity-40 animate-logo-glow blur-xl animate-quick-side-bounce"></div>
            
            {/* Ripple Effect */}
            <div className="absolute -inset-3 rounded-full animate-logo-ripple"></div>
            
            {/* Morphing Border */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 animate-logo-morph opacity-80"></div>
            
            {/* Main Logo Container with enhanced background */}
            <div className="relative rounded-full bg-gradient-to-b from-white via-gray-50 to-gray-100 p-4 shadow-xl border border-white/50 backdrop-blur-sm w-40 h-40 sm:w-48 sm:h-48 flex items-center justify-center animate-logo-wobble">
              {/* Enhanced Rotating Background Pattern */}
              <div className="absolute inset-0 rounded-full overflow-hidden animate-logo-orbit">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 mix-blend-overlay opacity-70"
                     style={{
                       backgroundImage: 'linear-gradient(45deg, rgba(59, 130, 246, 0.08) 25%, transparent 25%, transparent 50%, rgba(59, 130, 246, 0.08) 50%, rgba(59, 130, 246, 0.08) 75%, transparent 75%, transparent)',
                       backgroundSize: '20px 20px'
                     }}>
                </div>
                {/* Additional subtle radial gradient */}
                <div className="absolute inset-0 bg-radial-gradient opacity-40"></div>
              </div>
              
              {/* Shine Effect Layer */}
              <div className="absolute inset-0 rounded-full overflow-hidden">
                <div className="absolute inset-0 animate-logo-shine"></div>
              </div>
              
              {/* Inner glow effect */}
              <div className="absolute inset-3 rounded-full bg-gradient-to-b from-white/80 to-transparent opacity-60 blur-sm"></div>
              
              {/* Logo Image Container with refined animation */}
              <div className="relative w-32 h-32 sm:w-40 sm:h-40 animate-logo-bounce z-10 hover-scale">
                <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/20 to-blue-100/20 mix-blend-overlay"></div>
                <img
                  src="/logo.png"
                  alt="Oearnfy Logo"
                  className="w-full h-full object-contain drop-shadow-lg transition-transform duration-300 ease-out transform group-hover:scale-110"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Welcome Text */}
        <h1 className="text-center text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent whitespace-nowrap px-2">
          🌟WELCOME OEARNFY🌟
        </h1>

        {/* Observe and Earn Text */}
        <h2 className="text-center text-lg sm:text-xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent whitespace-nowrap px-2">
          💸OBSERVE && EARN💸
        </h2>

        {/* Welcome Message */}
        <p className="text-center text-[15px] sm:text-base text-gray-700 font-medium leading-relaxed px-2" 
           style={{ 
             fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif",
           }}>
          We sincerely congratulate you for joining our program where you can enjoy entertainment and earning together IN SHA ALLAH. Watch the video, have fun and take the opportunity to earn and start a new experience with us on a joyful and profitable journey.
        </p>

        {/* Enhanced Buttons */}
        <div className="space-y-4 px-2">
          <Link href="/connect" className="block w-full group">
            <div className="relative">
              {/* Enhanced Glow Effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-400/40 via-purple-400/40 to-pink-400/40 rounded-lg opacity-40 animate-logo-glow blur-xl animate-quick-side-bounce"></div>
              
              {/* Ripple Effect */}
              <div className="absolute -inset-2 rounded-lg animate-logo-ripple"></div>
              
              {/* Morphing Border */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-lg animate-logo-morph opacity-80"></div>
              
              {/* Main Button Container */}
              <button 
                className="relative w-full overflow-hidden py-4 px-6 rounded-lg text-[15px] sm:text-base font-semibold bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-xl border border-white/50 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 group-hover:animate-jump animate-logo-wobble"
                onMouseEnter={(e) => {
                  e.currentTarget.classList.remove('animate-jump');
                  void e.currentTarget.offsetWidth;
                  e.currentTarget.classList.add('animate-jump');
                }}
              >
                {/* Dynamic Background Pattern */}
                <div className="absolute inset-0 bg-grid-white/[0.1] animate-grid-slide"></div>
                
                {/* Shine Effect Layer */}
                <div className="absolute inset-0 rounded-lg overflow-hidden">
                  <div className="absolute inset-0 animate-logo-shine"></div>
                </div>
                
                <div className="relative flex items-center justify-center space-x-3">
                  {/* Enhanced Live Indicator */}
                  <div className="absolute left-3 flex items-center">
                    <div className="relative">
                      {/* Outer Ring */}
                      <div className="absolute -inset-1 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full blur-sm opacity-40 animate-pulse-fast"></div>
                      {/* Inner Dot */}
                      <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-gradient-to-r from-green-400 to-emerald-500"></span>
                      </span>
                    </div>
                  </div>

                  {/* Animated Icon with Effects */}
                  <div className="relative animate-logo-bounce">
                    <div className="absolute -inset-1 bg-blue-400/30 rounded-full blur-sm group-hover:bg-blue-400/50 transition-colors duration-300"></div>
                    <svg className="w-5 h-5 transform transition-all duration-300 group-hover:rotate-12 group-hover:scale-110 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>

                  {/* Text with Gradient */}
                  <span className="tracking-wider font-bold relative z-10">
                    CONNECT WITH US
                    {/* Text Highlight Effect */}
                    <span className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-300 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                  </span>

                  {/* Particle Effects */}
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/2 left-1/4 h-1 w-1 bg-white rounded-full animate-particle-1"></div>
                    <div className="absolute top-1/2 left-2/4 h-1 w-1 bg-cyan-300 rounded-full animate-particle-2"></div>
                    <div className="absolute top-1/2 left-3/4 h-1 w-1 bg-blue-300 rounded-full animate-particle-3"></div>
                  </div>

                  {/* Energy Field Effect */}
                  <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <div className="absolute inset-0 opacity-30">
                      <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white to-transparent transform -translate-y-1/2 animate-energy-pulse"></div>
                    </div>
                  </div>
                </div>

                {/* Enhanced Shine Effect */}
                <div className="absolute inset-0">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 delay-100"></div>
                </div>
              </button>
            </div>
          </Link>
          
          <Link href="/login" className="block w-full group">
            <button className="relative w-full overflow-hidden py-4 px-6 rounded-lg text-[15px] sm:text-base font-semibold bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
              <div className="relative flex items-center justify-center space-x-2">
                <svg className="w-5 h-5 transform transition-transform group-hover:-rotate-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                <span className="tracking-wider">LOG IN</span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
} 