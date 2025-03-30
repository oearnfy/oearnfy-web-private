'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface VideoUploadProps {
  onVideoAdded: (video: any) => void;
}

export default function VideoUpload({ onVideoAdded }: VideoUploadProps) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [videoUrl, setVideoUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Check session on mount and when status changes
  useEffect(() => {
    const checkSession = async () => {
      if (status === 'unauthenticated') {
        await signIn('google');
      } else if (status === 'authenticated' && session?.user?.email !== 'oearnfycompany@gmail.com') {
        setError('আপনার ভিডিও আপলোড করার অনুমতি নেই');
      }
    };

    checkSession();
  }, [status, session]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      if (!session?.user?.email) {
        setError('অনুগ্রহ করে আগে লগইন করুন');
        await signIn('google');
        return;
      }

      if (session.user.email !== 'oearnfycompany@gmail.com') {
        setError('আপনার ভিডিও আপলোড করার অনুমতি নেই');
        return;
      }

      if (!videoUrl.trim()) {
        setError('অনুগ্রহ করে একটি YouTube ভিডিও লিংক দিন');
        return;
      }

      const response = await fetch('/api/videos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ videoUrl: videoUrl.trim() })
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'ভিডিও আপলোড করা যায়নি');
      }

      onVideoAdded(data.video);
      setVideoUrl('');
      setError(null);
      router.refresh();
    } catch (error) {
      console.error('আপলোড এরর:', error);
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('ভিডিও আপলোড করা যায়নি');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Show loading state while checking session
  if (status === 'loading') {
    return (
      <div className="w-full max-w-2xl mx-auto p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10"
        >
          <div className="text-white text-center">লোড হচ্ছে...</div>
        </motion.div>
      </div>
    );
  }

  // Show unauthorized message if not logged in with correct email
  if (status === 'unauthenticated' || session?.user?.email !== 'oearnfycompany@gmail.com') {
    return (
      <div className="w-full max-w-2xl mx-auto p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10"
        >
          <h2 className="text-xl font-bold text-white mb-4">অননুমোদিত অ্যাক্সেস</h2>
          <p className="text-white/80">
            শুধুমাত্র oearnfycompany@gmail.com ভিডিও আপলোড করতে পারবেন।
          </p>
          <motion.button
            onClick={() => signIn('google')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="mt-4 w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors"
          >
            Google দিয়ে লগইন করুন
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 w-full max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-white mb-6">আপলোড ভিডিও</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="videoUrl" className="block text-sm font-medium text-white/80 mb-2">
            YouTube ভিডিও লিংক
          </label>
          <input
            type="text"
            id="videoUrl"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            placeholder="https://youtu.be/... বা https://www.youtube.com/watch?v=..."
            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            disabled={isLoading}
          />
          <p className="mt-2 text-sm text-white/60">
            উদাহরণ: https://youtu.be/abcd1234 বা https://www.youtube.com/watch?v=abcd1234
          </p>
        </div>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-500 text-sm mt-2 p-3 bg-red-500/10 rounded-lg border border-red-500/20"
          >
            {error}
          </motion.div>
        )}
        <motion.button
          type="submit"
          disabled={isLoading || !videoUrl.trim()}
          whileHover={{ scale: isLoading ? 1 : 1.02 }}
          whileTap={{ scale: isLoading ? 1 : 0.98 }}
          className={`w-full py-3 px-4 rounded-lg font-medium transition-all ${
            isLoading
              ? 'bg-blue-500/50 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600 hover:shadow-lg'
          } text-white`}
        >
          {isLoading ? (
            <div className="flex items-center justify-center space-x-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              <span>আপলোড হচ্ছে...</span>
            </div>
          ) : (
            'আপলোড করুন'
          )}
        </motion.button>
      </form>
    </div>
  );
} 