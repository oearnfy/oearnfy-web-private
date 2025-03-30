import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'OEARNFY - Email Verification',
  description: 'Verify your email address to continue',
};

export default function VerifyEmailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 