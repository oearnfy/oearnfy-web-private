'use client';

import dynamic from 'next/dynamic';

const EmailVerification = dynamic(() => import('../components/EmailVerification'), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen flex items-center justify-center bg-[#0A0F1E]">
      <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin" />
    </div>
  ),
});

export default function VerifyEmailPage() {
  return <EmailVerification />;
} 