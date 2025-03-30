interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  channelTitle: string;
  publishedAt: string;
  viewCount: string;
  duration: string;
}

export async function getVideoDetails(videoUrl: string): Promise<YouTubeVideo | null> {
  try {
    // Extract video ID from URL
    const videoId = extractVideoId(videoUrl);
    if (!videoId) return null;

    const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics,contentDetails&id=${videoId}&key=${apiKey}`
    );

    const data = await response.json();
    
    if (!data.items || data.items.length === 0) {
      throw new Error('Video not found');
    }

    const video = data.items[0];
    const { snippet, statistics, contentDetails } = video;

    return {
      id: videoId,
      title: snippet.title,
      description: snippet.description,
      thumbnail: snippet.thumbnails.maxres?.url || snippet.thumbnails.high?.url || snippet.thumbnails.default.url,
      channelTitle: snippet.channelTitle,
      publishedAt: new Date(snippet.publishedAt).toLocaleDateString(),
      viewCount: formatViewCount(statistics.viewCount),
      duration: formatDuration(contentDetails.duration)
    };
  } catch (error) {
    console.error('Error fetching video details:', error);
    return null;
  }
}

function extractVideoId(url: string): string | null {
  try {
    const urlObj = new URL(url);
    if (urlObj.hostname === 'youtu.be') {
      return urlObj.pathname.slice(1);
    }
    if (urlObj.hostname === 'www.youtube.com' || urlObj.hostname === 'youtube.com') {
      const searchParams = new URLSearchParams(urlObj.search);
      return searchParams.get('v');
    }
    return null;
  } catch {
    return null;
  }
}

function formatViewCount(count: string): string {
  const num = parseInt(count);
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return count;
}

function formatDuration(duration: string): string {
  const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
  if (!match) return '0:00';

  const hours = (match[1] || '').replace('H', '');
  const minutes = (match[2] || '').replace('M', '');
  const seconds = (match[3] || '').replace('S', '');

  let result = '';
  
  if (hours) {
    result += `${hours}:`;
    result += `${minutes.padStart(2, '0')}:`;
  } else if (minutes) {
    result += `${minutes}:`;
  } else {
    result += '0:';
  }
  
  result += seconds.padStart(2, '0');
  
  return result;
} 