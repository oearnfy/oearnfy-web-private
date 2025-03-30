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
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'অনুগ্রহ করে আগে লগইন করুন' }, { status: 401 });
    }

    if (session.user.email !== 'oearnfycompany@gmail.com') {
      return NextResponse.json({ error: 'আপনার ভিডিও আপলোড করার অনুমতি নেই' }, { status: 403 });
    }

    let body;
    try {
      body = await request.json();
    } catch (error) {
      return NextResponse.json({ error: 'অবৈধ রিকোয়েস্ট ডেটা' }, { status: 400 });
    }
    
    if (!body?.videoUrl) {
      return NextResponse.json({ error: 'ভিডিও URL প্রদান করুন' }, { status: 400 });
    }

    const videoUrl = body.videoUrl;
    const videoId = extractVideoId(videoUrl);

    if (!videoId) {
      return NextResponse.json({ error: 'অবৈধ YouTube ভিডিও URL' }, { status: 400 });
    }

    if (!process.env.YOUTUBE_API_KEY) {
      return NextResponse.json({ error: 'YouTube API কী কনফিগার করা হয়নি' }, { status: 500 });
    }

    const videoData = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${process.env.YOUTUBE_API_KEY}`
    );

    if (!videoData.ok) {
      return NextResponse.json({ error: 'YouTube API থেকে ভিডিও তথ্য পাওয়া যায়নি' }, { status: 500 });
    }

    const youtubeData = await videoData.json();

    if (!youtubeData.items || youtubeData.items.length === 0) {
      return NextResponse.json({ error: 'ভিডিও পাওয়া যায়নি' }, { status: 404 });
    }

    const video = youtubeData.items[0].snippet;
    const thumbnails = video.thumbnails;
    const bestThumbnail = thumbnails.maxres || thumbnails.standard || thumbnails.high || thumbnails.medium || thumbnails.default;

    const newVideo = await prisma.video.create({
      data: {
        title: video.title,
        description: video.description,
        videoId: videoId,
        thumbnailUrl: bestThumbnail.url,
        uploadedBy: session.user.email,
      },
    });

    return NextResponse.json({ video: newVideo }, { status: 201 });

  } catch (error) {
    console.error('Video upload error:', error);
    return NextResponse.json({ error: 'ভিডিও আপলোড করা যায়নি' }, { status: 500 });
  }
} 