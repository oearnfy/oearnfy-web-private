'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Handle .txt routes
    if (pathname?.endsWith('.txt')) {
      const newPath = pathname.replace('.txt', '');
      router.replace(newPath);
      return;
    }

    // Default redirect to home after 2 seconds
    const timer = setTimeout(() => {
      router.push('/');
    }, 2000);

    return () => clearTimeout(timer);
  }, [pathname, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0A0F1E]">
      <div className="p-8 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 text-center">
        <h1 className="text-2xl font-bold text-white mb-4">Page Not Found</h1>
        <p className="text-white/60">Redirecting you to a valid page...</p>
      </div>
    </div>
  );
} 