'use client';

import { motion } from 'framer-motion';
import { FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { sendVerificationEmail } from '../../config/email';

const EmailVerification = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';
  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0 && !canResend) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else {
      setCanResend(true);
    }
    return () => clearTimeout(timer);
  }, [countdown, canResend]);

  const handleResendCode = async () => {
    try {
      setCanResend(false);
      setCountdown(60);
      
      // Generate a new verification code
      const newVerificationCode = Math.floor(100000 + Math.random() * 900000);
      
      // Get the pending signup data
      const pendingSignup = sessionStorage.getItem('pendingSignup');
      if (!pendingSignup) {
        setError('No pending signup found. Please try signing up again.');
        return;
      }

      const signupData = JSON.parse(pendingSignup);
      signupData.verificationCode = newVerificationCode;
      
      // Send new verification email using Firebase Functions API
      const response = await fetch('https://us-central1-oearnfy25-web.cloudfunctions.net/api/send-verification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: signupData.email,
          code: String(newVerificationCode),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send verification email');
      }
      
      // Store the updated data
      sessionStorage.setItem('pendingSignup', JSON.stringify(signupData));

    } catch (error) {
      setError('Failed to resend verification code. Please try again.');
      setCanResend(true);
      setCountdown(0);
    }
  };

  const handleCodeChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value[0];
    }
    
    if (value.match(/^[0-9]$/)) {
      const newCode = [...verificationCode];
      newCode[index] = value;
      setVerificationCode(newCode);
      
      // Auto-focus next input
      if (index < 5 && value !== '') {
        const nextInput = document.getElementById(`code-${index + 1}`);
        if (nextInput) {
          nextInput.focus();
        }
      }
    } else if (value === '') {
      const newCode = [...verificationCode];
      newCode[index] = '';
      setVerificationCode(newCode);
      
      // Auto-focus previous input
      if (index > 0) {
        const prevInput = document.getElementById(`code-${index - 1}`);
        if (prevInput) {
          prevInput.focus();
        }
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && index > 0 && verificationCode[index] === '') {
      const prevInput = document.getElementById(`code-${index - 1}`);
      if (prevInput) {
        prevInput.focus();
      }
    }
  };

  const handleVerifyCode = async () => {
    try {
      const enteredCode = verificationCode.join('');
      if (enteredCode.length !== 6) {
        setError('Please enter the complete verification code.');
        return;
      }

      // Get the pending signup data
      const pendingSignup = sessionStorage.getItem('pendingSignup');
      if (!pendingSignup) {
        setError('No pending signup found. Please try signing up again.');
        return;
      }

      const signupData = JSON.parse(pendingSignup);
      
      // Verify the code
      if (enteredCode === String(signupData.verificationCode)) {
        setIsVerified(true);
        setError(null);
        
        // TODO: Create the user account in your backend
        
        // Clear the pending signup data
        sessionStorage.removeItem('pendingSignup');
        
        // Show success message and redirect
        setTimeout(() => {
          router.push('/dashboard');
        }, 2000);
      } else {
        setError('Invalid verification code. Please try again.');
      }
    } catch (error) {
      setError('Failed to verify code. Please try again.');
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
                  Verify Your Email
                </h1>
                <p className="text-gray-400">
                  We've sent a verification code to:
                </p>
                <p className="text-lg font-medium text-blue-400">
                  {email}
                </p>
              </motion.div>
            </div>

            {/* Status section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-center mb-8"
            >
              {isVerified ? (
                <div className="flex items-center justify-center space-x-2 text-green-400">
                  <FaCheckCircle className="text-2xl" />
                  <span>Email verified successfully!</span>
                </div>
              ) : error ? (
                <div className="flex items-center justify-center space-x-2 text-red-400">
                  <FaExclamationCircle className="text-2xl" />
                  <span>{error}</span>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-white/60">
                    Please enter the 6-digit verification code:
                  </p>
                </div>
              )}
            </motion.div>

            {/* Verification code input */}
            <div className="flex justify-center space-x-3 mb-6">
              {verificationCode.map((digit, index) => (
                <input
                  key={index}
                  id={`code-${index}`}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleCodeChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-12 h-12 text-center text-2xl font-bold bg-white/5 border border-white/10 rounded-lg text-white focus:border-blue-400 focus:ring-2 focus:ring-blue-400 focus:ring-opacity-20 transition-all"
                />
              ))}
            </div>

            {/* Action buttons */}
            <div className="space-y-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleVerifyCode}
                className="w-full relative overflow-hidden group bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-lg font-semibold transition-all duration-300 transform hover:shadow-lg"
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative">Verify Code</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleResendCode}
                disabled={!canResend}
                className="w-full relative overflow-hidden group bg-white/5 text-white py-3 rounded-lg font-semibold transition-all duration-300 transform hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="relative">
                  {canResend ? 'Resend Code' : `Resend available in ${countdown}s`}
                </span>
              </motion.button>

              <div className="text-center">
                <Link
                  href="/signup"
                  className="text-blue-400 hover:text-blue-300 text-sm transition-colors"
                >
                  Back to Sign Up
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative bottom line */}
        <div className="absolute -bottom-px left-1/2 transform -translate-x-1/2 w-1/4 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
      </motion.div>
    </div>
  );
};

export default EmailVerification; 