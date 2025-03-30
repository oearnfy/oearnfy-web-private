'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEye, FaEyeSlash, FaUser, FaLock } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import Image from 'next/image';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../../firebase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface FormData {
  username: string;
  password: string;
}

interface FormErrors {
  username?: string;
  password?: string;
}

const Login = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    username: '',
    password: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Background animation elements
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleGoogleSignIn = async () => {
    try {
      setIsGoogleLoading(true);
      setError(null);
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      
      // TODO: Check if this Google account has a registered user account
      // For now, simulate an error for non-existing accounts
      const accountExists = false; // This should be replaced with actual check
      
      if (!accountExists) {
        setError('No account found with this Google account. Please sign up first.');
        return;
      }

      if (result.user) {
        router.push('/dashboard');
      }
    } catch (error: any) {
      console.error('Google sign-in error:', error);
      setError(error.message || 'Failed to sign in with Google');
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    const newErrors = { ...errors };
    
    switch (name) {
      case 'username':
        if (!value) {
          newErrors.username = 'Username is required';
        } else {
          delete newErrors.username;
        }
        break;
      case 'password':
        if (!value) {
          newErrors.password = 'Password is required';
        } else if (value.length < 8) {
          newErrors.password = 'Password must be at least 8 characters';
        } else {
          delete newErrors.password;
        }
        break;
    }

    setErrors(newErrors);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      setError(null);

      // Validate form
      const newErrors: FormErrors = {};
      if (!formData.username) newErrors.username = 'Username is required';
      if (!formData.password) newErrors.password = 'Password is required';

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }

      // TODO: Implement login logic here
      // For now, just show an error
      setError('Invalid username or password');

    } catch (error: any) {
      console.error('Login error:', error);
      setError(error.message || 'Failed to log in');
    } finally {
      setIsLoading(false);
    }
  };

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

      {/* Animated background shapes */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full filter blur-3xl animate-blob opacity-20 mix-blend-screen" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-r from-cyan-600/20 to-blue-600/20 rounded-full filter blur-3xl animate-blob animation-delay-2000 opacity-20 mix-blend-screen" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-full filter blur-3xl animate-blob animation-delay-4000 opacity-20 mix-blend-screen" />

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
                <h1 className="text-3xl font-bold text-white">
                  Welcome Back
                </h1>
                <p className="text-gray-400">
                  Log in to your account
                </p>
              </motion.div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg"
              >
                <p className="text-red-400 text-sm text-center">{error}</p>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="relative group"
              >
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUser className="text-white/60 group-focus-within:text-blue-400 transition-colors" />
                </div>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/50 focus:border-blue-400 focus:ring-2 focus:ring-blue-400 focus:ring-opacity-20 transition-all"
                  placeholder="Enter your username"
                />
                <AnimatePresence>
                  {errors.username && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-red-400 text-sm mt-1"
                    >
                      {errors.username}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="relative group"
              >
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="text-white/60 group-focus-within:text-blue-400 transition-colors" />
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-12 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/50 focus:border-blue-400 focus:ring-2 focus:ring-blue-400 focus:ring-opacity-20 transition-all"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-1 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
                    >
                      {showPassword ? (
                        <FaEyeSlash className="text-white/60 hover:text-white/90 transition-colors" />
                      ) : (
                        <FaEye className="text-white/60 hover:text-white/90 transition-colors" />
                      )}
                    </motion.div>
                  </button>
                </div>
                <AnimatePresence>
                  {errors.password && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-red-400 text-sm mt-1"
                    >
                      {errors.password}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center space-x-2 text-white/60">
                  <input
                    type="checkbox"
                    className="form-checkbox h-4 w-4 text-blue-400 rounded border-white/10 bg-white/5 focus:ring-blue-400 focus:ring-opacity-20"
                  />
                  <span>Remember me</span>
                </label>
                <Link
                  href="/forgot-password"
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  Forgot password?
                </Link>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isLoading}
                className="w-full relative overflow-hidden group bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-lg font-semibold transition-all duration-300 transform hover:shadow-lg disabled:opacity-70"
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative">
                  {isLoading ? (
                    <svg className="animate-spin h-5 w-5 mx-auto" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                  ) : (
                    'Log In'
                  )}
                </span>
              </motion.button>
            </form>

            {/* Enhanced divider */}
            <div className="relative flex items-center justify-center my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10" />
              </div>
              <div className="relative bg-[#0A0F1E]/50 backdrop-blur-sm px-4">
                <span className="text-white/40 text-sm">or</span>
              </div>
            </div>

            {/* Google Sign-in button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <button
                onClick={handleGoogleSignIn}
                disabled={isGoogleLoading}
                className="w-full relative group bg-white/5 hover:bg-white/10 text-white py-3 px-4 rounded-lg font-medium transition-all duration-300 border border-white/10 flex items-center justify-center space-x-3 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                {isGoogleLoading ? (
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                ) : (
                  <>
                    <FcGoogle className="text-2xl" />
                    <span className="relative z-10">Continue with Google</span>
                  </>
                )}
              </button>
            </motion.div>

            {/* Footer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-6 text-center"
            >
              <p className="text-white/40">
                Don't have an account?{' '}
                <Link 
                  href="/signup" 
                  className="text-blue-400 hover:text-blue-300 font-medium transition-colors relative inline-block group"
                >
                  <span className="relative z-10">Sign up</span>
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-400/30 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                </Link>
              </p>
            </motion.div>
          </div>
        </div>

        {/* Decorative bottom line */}
        <div className="absolute -bottom-px left-1/2 transform -translate-x-1/2 w-1/4 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
      </motion.div>
    </div>
  );
};

export default Login; 