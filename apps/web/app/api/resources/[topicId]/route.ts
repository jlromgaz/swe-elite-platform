import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@elite/db';

export async function GET(
  _req: NextRequest,
  context: { params: { topicId: string } }
) {
  const { topicId } = context.params;

  const topic = await prisma.topic.findUnique({ where: { id: topicId } });
  if (!topic) {
    return NextResponse.json({ error: 'Topic not found' }, { status: 404 });
  }

  const resources = await prisma.resource.findMany({
    where: { topicId },
    select: {
      id: true,
      type: true,
      title: true,
      url: true,
      locale: true,
      durationMin: true,
      quality: true,
    },
    orderBy: { quality: 'desc' },
  });

  return NextResponse.json({ resources });
}