'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import VideoPlayer from '@/app/components/VideoPlayer';

interface Video {
  id: string;
  title: string;
  description: string;
  videoId: string;
  thumbnailUrl: string;
  uploadedBy: string;
  createdAt: string;
}

export default function WatchPage() {
  const params = useParams();
  const [video, setVideo] = useState<Video | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await fetch(`/api/videos/${params.videoId}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'ভিডিও লোড করা যায়নি');
        }

        setVideo(data.video);
      } catch (error) {
        console.error('Error fetching video:', error);
        setError(error instanceof Error ? error.message : 'ভিডিও লোড করা যায়নি');
      } finally {
        setIsLoading(false);
      }
    };

    if (params.videoId) {
      fetchVideo();
    }
  }, [params.videoId]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black p-6">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
        </div>
      </div>
    );
  }

  if (error || !video) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black p-6">
        <div className="max-w-4xl mx-auto bg-white/5 backdrop-blur-lg rounded-xl p-6">
          <h1 className="text-xl text-red-500">
            {error || 'ভিডিও পাওয়া যায়নি'}
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black p-6">
      <VideoPlayer
        videoId={video.videoId}
        title={video.title}
        description={video.description}
      />
    </div>
  );
} 