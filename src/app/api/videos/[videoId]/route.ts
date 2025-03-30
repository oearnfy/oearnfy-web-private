import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: { videoId: string } }
) {
  try {
    const video = await prisma.video.findFirst({
      where: {
        videoId: params.videoId
      }
    });

    if (!video) {
      return NextResponse.json({
        error: 'ভিডিও পাওয়া যায়নি',
        code: 'VIDEO_NOT_FOUND'
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      video
    });
  } catch (error) {
    console.error('Error fetching video:', error);
    return NextResponse.json({
      error: 'ভিডিও লোড করা যায়নি',
      code: 'FETCH_ERROR'
    }, { status: 500 });
  }
} 