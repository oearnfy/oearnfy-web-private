'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface VideoPlayerProps {
  videoId: string;
  title: string;
  description?: string;
}

export default function VideoPlayer({ videoId, title, description }: VideoPlayerProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load YouTube IFrame API
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

    // Reset loading state when videoId changes
    setIsLoading(true);
    
    return () => {
      // Cleanup if needed
    };
  }, [videoId]);

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-4xl mx-auto bg-white/5 backdrop-blur-lg rounded-xl overflow-hidden"
    >
      <div className="aspect-w-16 aspect-h-9 relative">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
          </div>
        )}
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
          onLoad={handleIframeLoad}
        />
      </div>
      <div className="p-6">
        <h2 className="text-xl font-bold text-white mb-2">{title}</h2>
        {description && (
          <p className="text-white/80 text-sm whitespace-pre-wrap">{description}</p>
        )}
      </div>
    </motion.div>
  );
} 