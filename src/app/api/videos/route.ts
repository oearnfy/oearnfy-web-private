import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/auth.config';
import { PrismaClient } from '@prisma/client';

export const dynamic = 'force-dynamic';

const prisma = new PrismaClient();

function isValidYouTubeUrl(url: string): boolean {
  try {
    const parsedUrl = new URL(url);
    const videoId = parsedUrl.hostname === 'youtu.be' 
      ? parsedUrl.pathname.slice(1)
      : parsedUrl.searchParams.get('v');
    return Boolean(videoId);
  } catch {
    return false;
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

export async function GET() {
  console.log('Fetching videos');
  
  try {
    const videos = await prisma.video.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });

    console.log('Found videos:', videos);

    return NextResponse.json({
      success: true,
      videos
    });
  } catch (error) {
    console.error('Error fetching videos:', error);
    return NextResponse.json({
      error: 'ভিডিও লোড করা যায়নি',
      code: 'FETCH_ERROR'
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  console.log('ভিডিও আপলোড রিকোয়েস্ট পাওয়া গেছে');

  try {
    // Validate session
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      console.log('সেশন পাওয়া যায়নি');
      return NextResponse.json({
        error: 'অনুগ্রহ করে আগে লগইন করুন',
        code: 'AUTH_REQUIRED'
      }, { status: 401 });
    }

    if (session.user.email !== 'oearnfycompany@gmail.com') {
      console.log('অননুমোদিত ব্যবহারকারী:', session.user.email);
      return NextResponse.json({
        error: 'আপনার ভিডিও আপলোড করার অনুমতি নেই',
        code: 'UNAUTHORIZED'
      }, { status: 403 });
    }

    // Parse request body
    let body;
    try {
      body = await request.json();
    } catch (error) {
      console.error('রিকোয়েস্ট বডি পার্স করতে এরর:', error);
      return NextResponse.json({
        error: 'অবৈধ JSON ডেটা',
        code: 'INVALID_JSON'
      }, { status: 400 });
    }

    const { videoUrl } = body;

    if (!videoUrl?.trim()) {
      console.log('ভিডিও URL দেওয়া হয়নি');
      return NextResponse.json({
        error: 'ভিডিও URL প্রয়োজন',
        code: 'MISSING_URL'
      }, { status: 400 });
    }

    if (!isValidYouTubeUrl(videoUrl)) {
      console.log('অবৈধ YouTube URL:', videoUrl);
      return NextResponse.json({
        error: 'অবৈধ YouTube URL। সঠিক ফরম্যাট: https://youtu.be/... বা https://www.youtube.com/watch?v=...',
        code: 'INVALID_URL'
      }, { status: 400 });
    }

    const videoId = extractVideoId(videoUrl);
    if (!videoId) {
      console.log('ভিডিও ID পাওয়া যায়নি');
      return NextResponse.json({
        error: 'ভিডিও ID পাওয়া যায়নি',
        code: 'INVALID_URL'
      }, { status: 400 });
    }

    const apiKey = process.env.YOUTUBE_API_KEY;
    if (!apiKey) {
      console.log('YouTube API কী পাওয়া যায়নি');
      return NextResponse.json({
        error: 'YouTube API কী কনফিগার করা হয়নি। অনুগ্রহ করে .env.local ফাইলে YOUTUBE_API_KEY সেট করুন।',
        code: 'MISSING_API_KEY'
      }, { status: 500 });
    }

    console.log('YouTube API থেকে ভিডিও তথ্য আনা হচ্ছে');
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${apiKey}`,
      {
        headers: {
          'Accept': 'application/json'
        },
        cache: 'no-store'
      }
    );

    if (!response.ok) {
      console.error('YouTube API এরর:', await response.text());
      return NextResponse.json({
        error: 'YouTube API থেকে ভিডিও তথ্য আনতে সমস্যা হয়েছে',
        code: 'YOUTUBE_API_ERROR'
      }, { status: 500 });
    }

    const data = await response.json();
    if (!data.items?.length) {
      console.log('ভিডিও পাওয়া যায়নি:', videoId);
      return NextResponse.json({
        error: 'ভিডিও পাওয়া যায়নি',
        code: 'VIDEO_NOT_FOUND'
      }, { status: 404 });
    }

    const videoInfo = data.items[0].snippet;
    const video = await prisma.video.create({
      data: {
        videoId,
        title: videoInfo.title,
        description: videoInfo.description,
        thumbnail: videoInfo.thumbnails.high?.url || videoInfo.thumbnails.default?.url,
        channelTitle: videoInfo.channelTitle,
        publishedAt: new Date(videoInfo.publishedAt)
      }
    });

    console.log('ভিডিও সফলভাবে যোগ করা হয়েছে:', video);
    return NextResponse.json({
      success: true,
      video
    });
  } catch (error) {
    console.error('ভিডিও যোগ করতে এরর:', error);
    return NextResponse.json({
      error: 'ভিডিও যোগ করা যায়নি',
      code: 'INTERNAL_ERROR'
    }, { status: 500 });
  }
} 