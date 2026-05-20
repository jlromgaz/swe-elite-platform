import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@elite/db';
import { getSessionUserId } from '@/lib/session';

export async function POST(
  req: NextRequest,
  context: { params: { topicId: string } }
) {
  const userId = await getSessionUserId();
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { topicId } = context.params;
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const { resourceId, completed } = body as { resourceId?: string; completed?: boolean };

  if (!resourceId || typeof completed !== 'boolean') {
    return NextResponse.json({ error: 'resourceId and completed are required' }, { status: 400 });
  }

  // Verify the resource belongs to the topic
  const resource = await prisma.resource.findUnique({
    where: { id: resourceId },
  });

  if (!resource || resource.topicId !== topicId) {
    return NextResponse.json({ error: 'Resource not found or does not belong to topic' }, { status: 404 });
  }

  if (completed) {
    await prisma.userResourceProgress.upsert({
      where: { userId_resourceId: { userId, resourceId } },
      create: { userId, resourceId },
      update: {},
    });
  } else {
    try {
      await prisma.userResourceProgress.delete({
        where: { userId_resourceId: { userId, resourceId } },
      });
    } catch (e) {
      // Ignore if not found
    }
  }

  return NextResponse.json({ success: true, completed });
}
