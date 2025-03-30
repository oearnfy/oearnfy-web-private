'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

interface Video {
  id: string;
  title: string;
  description: string;
  videoId: string;
  thumbnailUrl: string;
  uploadedBy: string;
  createdAt: string;
}

export default function VideoList() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch('/api/videos');
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'ভিডিও লোড করা যায়নি');
        }

        setVideos(data.videos);
      } catch (error) {
        console.error('Error fetching videos:', error);
        setError(error instanceof Error ? error.message : 'ভিডিও লোড করা যায়নি');
      } finally {
        setIsLoading(false);
      }
    };

    fetchVideos();
  }, []);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="aspect-video bg-white/5 rounded-xl mb-4"></div>
            <div className="h-4 bg-white/5 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-white/5 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
          <p className="text-red-500 text-center">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {videos.map((video) => (
        <motion.div
          key={video.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.02 }}
          className="bg-white/5 backdrop-blur-lg rounded-xl overflow-hidden"
        >
          <Link href={`/watch/${video.id}`}>
            <div className="aspect-video relative">
              <Image
                src={video.thumbnailUrl}
                alt={video.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-white font-semibold mb-2 line-clamp-2">
                {video.title}
              </h3>
              <p className="text-white/60 text-sm">
                {new Date(video.createdAt).toLocaleDateString('bn-BD', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
} 