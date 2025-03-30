'use client';

import { useEffect, useState } from 'react';
import YouTubePlayer from '@/components/YouTubePlayer';
import { useParams } from 'next/navigation';

interface VideoDetails {
  id: string;
  title: string;
  description: string;
  channelTitle: string;
  publishedAt: string;
}

export default function WatchPage() {
  const params = useParams();
  const videoId = params.videoId as string;
  const [video, setVideo] = useState<VideoDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVideoDetails = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/videos/${videoId}`);
        if (!response.ok) {
          throw new Error('ভিডিও লোড করা যায়নি');
        }
        const data = await response.json();
        setVideo(data.video);
      } catch (error) {
        console.error('Error fetching video:', error);
        setError('ভিডিও লোড করতে সমস্যা হয়েছে');
      } finally {
        setIsLoading(false);
      }
    };

    if (videoId) {
      fetchVideoDetails();
    }
  }, [videoId]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 p-4 sm:p-8">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse">
            <div className="aspect-video bg-gray-800 rounded-xl mb-6"></div>
            <div className="h-8 bg-gray-800 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-800 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 p-4 sm:p-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center text-red-500 p-8 bg-red-500/10 rounded-xl">
            <h2 className="text-xl font-bold mb-2">এরর</h2>
            <p>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-4 sm:p-8">
      <div className="max-w-6xl mx-auto">
        <YouTubePlayer 
          videoId={videoId} 
          title={video?.title}
          className="mb-6"
        />
        
        {video && (
          <div className="text-white">
            <h1 className="text-2xl font-bold mb-4">{video.title}</h1>
            <div className="flex items-center text-gray-400 text-sm mb-6">
              <span>{video.channelTitle}</span>
              <span className="mx-2">•</span>
              <span>{new Date(video.publishedAt).toLocaleDateString()}</span>
            </div>
            <p className="text-gray-300 whitespace-pre-wrap">{video.description}</p>
          </div>
        )}
      </div>
    </div>
  );
} 