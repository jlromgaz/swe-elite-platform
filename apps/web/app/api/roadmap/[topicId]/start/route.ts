import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@elite/db';

type NodeState = 'locked' | 'available' | 'in_progress' | 'mastered';

async function getCurrentUserId(): Promise<string | null> {
  const user = await prisma.user.findFirst();
  return user?.id ?? null;
}

export async function POST(
  _req: NextRequest,
  context: { params: { topicId: string } }
) {
  const { topicId } = context.params;
  const userId = await getCurrentUserId();

  if (!userId) {
    return NextResponse.json({ error: 'No user found' }, { status: 404 });
  }

  const topic = await prisma.topic.findUnique({ where: { id: topicId } });
  if (!topic) {
    return NextResponse.json({ error: 'Topic not found' }, { status: 404 });
  }

  const progress = await prisma.nodeProgress.findUnique({
    where: { userId_topicId: { userId, topicId } },
  });

  const currentState: NodeState = (progress?.state as NodeState) ?? 'locked';

  if (currentState !== 'available') {
    return NextResponse.json(
      { error: `Cannot start: current state is "${currentState}"` },
      { status: 400 }
    );
  }

  await prisma.nodeProgress.upsert({
    where: { userId_topicId: { userId, topicId } },
    update: { state: 'in_progress', startedAt: new Date() },
    create: { userId, topicId, state: 'in_progress', startedAt: new Date() },
  });

  return NextResponse.json({ state: 'in_progress' });
}
