import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'OEARNFY',
  description: 'Create your account and join our community',
};

export default function SignUpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 