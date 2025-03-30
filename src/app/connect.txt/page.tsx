'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ConnectTxtRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/connect');
  }, [router]);

  return null;
} 