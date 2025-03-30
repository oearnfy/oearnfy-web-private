'use client';

import Link from 'next/link';
import VideoList from './components/VideoList';
import VideoUpload from './components/VideoUpload';

export default function WelcomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 to-black">
      <div className="max-w-7xl mx-auto py-12">
        <VideoUpload onVideoAdded={() => {}} />
        <VideoList />
      </div>
    </main>
  );
} 