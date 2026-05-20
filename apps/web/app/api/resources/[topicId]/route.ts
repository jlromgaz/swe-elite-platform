import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@elite/db';
import { getSessionUserId } from '@/lib/session';

export async function GET(
  _req: NextRequest,
  context: { params: { topicId: string } }
) {
  const { topicId } = context.params;
  const userId = await getSessionUserId();

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

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

  const progress = await prisma.userResourceProgress.findMany({
    where: { userId, resourceId: { in: resources.map(r => r.id) } }
  });

  const completedSet = new Set(progress.map(p => p.resourceId));

  const resourcesWithProgress = resources.map(r => ({
    ...r,
    completed: completedSet.has(r.id),
  }));

  return NextResponse.json({ resources: resourcesWithProgress });
}