import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'OEARNFY - Login',
  description: 'Login to your account and continue your journey',
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 