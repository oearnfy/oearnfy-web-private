'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FaHome, FaVideo, FaFire } from 'react-icons/fa';
import { SiYoutubeshorts } from 'react-icons/si';
import { IoMdNotifications } from 'react-icons/io';
import { BiSearch } from 'react-icons/bi';
import { RxHamburgerMenu } from 'react-icons/rx';
import VideoUpload from '../components/VideoUpload';
import { useSession } from 'next-auth/react';

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  description: string;
  publishedAt: string;
  duration?: string;
  channel?: string;
  views?: string;
  timestamp?: string;
}

// Mock data for videos
const mockVideos = [
  {
    id: 1,
    title: 'How to Make Money Online',
    thumbnail: '/thumbnails/earn-money.jpg',
    channel: 'OEARNFY Official',
    views: '100K',
    timestamp: '2 days ago',
    duration: '10:30',
  },
  {
    id: 2,
    title: 'Earn Money from Home',
    thumbnail: '/thumbnails/work-from-home.jpg',
    channel: 'OEARNFY Tips',
    views: '50K',
    timestamp: '1 week ago',
    duration: '15:45',
  },
  // Add more mock videos...
];

const Dashboard = () => {
  const { data: session, status } = useSession();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [videos, setVideos] = useState<Video[]>([]);
  const [showUpload, setShowUpload] = useState(false);

  const isAuthorizedToUpload = session?.user?.email === 'oearnfycompany@gmail.com';

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/videos');
        if (!response.ok) {
          throw new Error('Failed to fetch videos');
        }
        const data = await response.json();
        console.log('Fetched videos:', data);
        setVideos(data.videos || []);
      } catch (error) {
        console.error('Error fetching videos:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVideos();
  }, []);

  const handleVideoAdded = (video: Video) => {
    setVideos([video, ...videos]);
    setShowUpload(false);
  };

  const sidebarItems = [
    { 
      icon: <FaHome className="text-2xl" />, 
      label: 'Home', 
      link: '/dashboard',
      isActive: true
    },
    { 
      icon: <FaVideo className="text-2xl" />, 
      label: 'Videos', 
      link: '/videos',
      isActive: false
    },
    { 
      icon: <SiYoutubeshorts className="text-2xl" />, 
      label: 'Shorts', 
      link: '/shorts',
      isActive: false
    },
  ];

  const categories = [
    'All', 'Money Making', 'Business', 'Cryptocurrency', 'Stocks', 'Real Estate',
    'Dropshipping', 'Affiliate Marketing', 'NFTs', 'Web Development'
  ];

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Loading...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0F1E]">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-[#0A0F1E]/95 backdrop-blur-md border-b border-white/10 z-50">
        <div className="flex items-center justify-between h-full px-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <RxHamburgerMenu className="text-white/80 text-xl" />
            </button>
            <Link href="/dashboard" className="flex items-center space-x-2">
              <Image src="/logo.svg" alt="OEARNFY" width={32} height={32} className="w-8 h-8" />
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                OEARNFY
              </span>
            </Link>
          </div>

          <div className="flex-1 max-w-2xl mx-4">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search videos..."
                className="w-full bg-white/5 border border-white/10 rounded-full py-2 px-4 pl-10 text-white placeholder-white/50 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />
              <BiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 text-xl" />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {isAuthorizedToUpload && (
              <button 
                onClick={() => setShowUpload(true)}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors"
              >
                Upload Video
              </button>
            )}
            <button className="p-2 hover:bg-white/10 rounded-full transition-colors relative">
              <IoMdNotifications className="text-white/80 text-xl" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <button className="flex items-center space-x-2 p-1 hover:bg-white/10 rounded-full transition-colors">
              {session?.user?.image ? (
                <Image
                  src={session.user.image}
                  alt="Profile"
                  width={32}
                  height={32}
                  className="w-8 h-8 rounded-full border border-white/20"
                />
              ) : (
                <Image
                  src="/avatar-placeholder.png"
                  alt="Profile"
                  width={32}
                  height={32}
                  className="w-8 h-8 rounded-full border border-white/20"
                />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Video Upload Modal */}
      <AnimatePresence>
        {showUpload && isAuthorizedToUpload && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
            onClick={() => setShowUpload(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-2xl mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <VideoUpload onVideoAdded={handleVideoAdded} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.aside
            initial={{ x: -240 }}
            animate={{ x: 0 }}
            exit={{ x: -240 }}
            className="fixed left-0 top-16 bottom-0 w-60 bg-[#0A0F1E]/95 backdrop-blur-md border-r border-white/10 z-40"
          >
            <nav className="p-2 space-y-1">
              {sidebarItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.link}
                  className={`flex items-center space-x-4 px-4 py-3 rounded-xl transition-colors ${
                    item.isActive 
                      ? 'bg-white/10 text-white' 
                      : 'text-white/70 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {item.icon}
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              ))}
            </nav>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main content */}
      <main className={`pt-24 pb-8 ${isSidebarOpen ? 'ml-60' : 'ml-0'} transition-all duration-300`}>
        {/* Categories */}
        <div className="px-8 mb-8 overflow-x-auto scrollbar-hide">
          <div className="flex space-x-2">
            {categories.map((category, index) => (
              <button
                key={index}
                onClick={() => setSelectedCategory(category.toLowerCase())}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === category.toLowerCase()
                    ? 'bg-blue-500 text-white'
                    : 'bg-white/5 text-white/80 hover:bg-white/10'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Trending section */}
        <section className="px-8 mb-12">
          <div className="flex items-center space-x-2 mb-6">
            <FaFire className="text-red-500 text-xl" />
            <h2 className="text-xl font-bold text-white">Trending</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {videos.map((video) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02 }}
                className="group relative bg-white/5 rounded-xl overflow-hidden"
              >
                <Link href={`/watch/${video.id}`}>
                  <div className="relative aspect-video">
                    <Image
                      src={video.thumbnail}
                      alt={video.title}
                      layout="fill"
                      objectFit="cover"
                      className="group-hover:scale-105 transition-transform duration-300"
                    />
                    {video.duration && (
                      <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/80 rounded text-xs text-white">
                        {video.duration}
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="text-white font-medium line-clamp-2 mb-1 group-hover:text-blue-400 transition-colors">
                      {video.title}
                    </h3>
                    {video.channel && <p className="text-white/60 text-sm">{video.channel}</p>}
                    {(video.views || video.timestamp) && (
                      <div className="flex items-center space-x-2 text-white/60 text-xs mt-2">
                        {video.views && <span>{video.views} views</span>}
                        {video.views && video.timestamp && <span>•</span>}
                        {video.timestamp && <span>{video.timestamp}</span>}
                      </div>
                    )}
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Recent uploads */}
        <section className="px-8">
          <h2 className="text-xl font-bold text-white mb-6">Recent Uploads</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {videos.map((video) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02 }}
                className="group relative bg-white/5 rounded-xl overflow-hidden"
              >
                <Link href={`/watch/${video.id}`}>
                  <div className="relative aspect-video">
                    <Image
                      src={video.thumbnail}
                      alt={video.title}
                      layout="fill"
                      objectFit="cover"
                      className="group-hover:scale-105 transition-transform duration-300"
                    />
                    {video.duration && (
                      <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/80 rounded text-xs text-white">
                        {video.duration}
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="text-white font-medium line-clamp-2 mb-1 group-hover:text-blue-400 transition-colors">
                      {video.title}
                    </h3>
                    {video.channel && <p className="text-white/60 text-sm">{video.channel}</p>}
                    {(video.views || video.timestamp) && (
                      <div className="flex items-center space-x-2 text-white/60 text-xs mt-2">
                        {video.views && <span>{video.views} views</span>}
                        {video.views && video.timestamp && <span>•</span>}
                        {video.timestamp && <span>{video.timestamp}</span>}
                      </div>
                    )}
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard; 