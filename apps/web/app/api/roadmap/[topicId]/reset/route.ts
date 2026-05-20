import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@elite/db';
import { computeRelock } from '../../../../../lib/roadmap-cascade';
import { getSessionUserId } from '@/lib/session';

type NodeState = 'locked' | 'available' | 'in_progress' | 'mastered';

export async function POST(
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

  const progress = await prisma.nodeProgress.findUnique({
    where: { userId_topicId: { userId, topicId } },
  });

  const currentState: NodeState = (progress?.state as NodeState) ?? 'locked';

  if (currentState !== 'mastered' && currentState !== 'in_progress') {
    return NextResponse.json(
      { error: `Cannot reset: current state is "${currentState}"` },
      { status: 400 }
    );
  }

  const relocked = await prisma.$transaction(async (tx) => {
    await tx.nodeProgress.update({
      where: { userId_topicId: { userId, topicId } },
      data: { state: 'available', startedAt: null, masteredAt: null },
    });

    if (currentState === 'mastered') {
      const allTopics = await tx.topic.findMany();
      const allProgress = await tx.nodeProgress.findMany({ where: { userId } });
      const progressMap = new Map<string, NodeState>(
        allProgress.map((p) => [p.topicId, p.state as NodeState])
      );
      progressMap.set(topicId, 'available');

      const toRelock = computeRelock(allTopics, progressMap, topicId);

      for (const relockId of toRelock) {
        await tx.nodeProgress.upsert({
          where: { userId_topicId: { userId, topicId: relockId } },
          update: { state: 'locked', startedAt: null, masteredAt: null },
          create: { userId, topicId: relockId, state: 'locked' },
        });
      }

      return toRelock;
    }

    return [];
  });

  return NextResponse.json({ reset: topicId, relocked });
}