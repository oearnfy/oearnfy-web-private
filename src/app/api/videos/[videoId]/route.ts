import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
  { params }: { params: { videoId: string } }
) {
  try {
    const video = await prisma.video.findFirst({
      where: {
        id: params.videoId
      }
    });

    if (!video) {
      return NextResponse.json(
        { error: 'ভিডিও পাওয়া যায়নি' },
        { status: 404 }
      );
    }

    return NextResponse.json({ video });
  } catch (error) {
    console.error('Error fetching video:', error);
    return NextResponse.json(
      { error: 'ভিডিও লোড করা যায়নি' },
      { status: 500 }
    );
  }
} 