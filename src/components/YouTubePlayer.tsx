'use client';

import { useState, useEffect } from 'react';

interface YouTubePlayerProps {
  videoId: string;
  title?: string;
  className?: string;
}

export default function YouTubePlayer({ videoId, title, className = '' }: YouTubePlayerProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className={`aspect-video bg-gray-900 animate-pulse ${className}`}>
        <div className="w-full h-full flex items-center justify-center">
          <span className="text-white/50">Loading player...</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <iframe
        className="w-full aspect-video rounded-xl"
        src={`https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0`}
        title={title || 'YouTube video player'}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
} 