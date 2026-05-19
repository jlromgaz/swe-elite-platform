import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@elite/db';
import { computeUnlocks } from '../../../../../lib/roadmap-cascade';

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

  if (currentState !== 'in_progress') {
    return NextResponse.json(
      { error: `Cannot complete: current state is "${currentState}"` },
      { status: 400 }
    );
  }

  const unlocked = await prisma.$transaction(async (tx) => {
    // 1. Mark the current topic as mastered
    await tx.nodeProgress.update({
      where: { userId_topicId: { userId, topicId } },
      data: { state: 'mastered', masteredAt: new Date() },
    });

    // 2. Fetch all topics and current progress
    const allTopics = await tx.topic.findMany();
    const allProgress = await tx.nodeProgress.findMany({ where: { userId } });

    // 3. Build progressMap with the updated state (mastered for this topic)
    const progressMap = new Map<string, NodeState>(
      allProgress.map((p) => [p.topicId, p.state as NodeState])
    );
    // Ensure the just-mastered topic is reflected (update may not be visible in same tx in SQLite)
    progressMap.set(topicId, 'mastered');

    // 4. Compute which topics to unlock
    const toUnlock = computeUnlocks(allTopics, progressMap, topicId);

    // 5. Upsert each unlocked topic to "available" (only if currently "locked")
    for (const unlockId of toUnlock) {
      const existing = progressMap.get(unlockId);
      if (existing === 'locked' || existing === undefined) {
        await tx.nodeProgress.upsert({
          where: { userId_topicId: { userId, topicId: unlockId } },
          update: { state: 'available' },
          create: { userId, topicId: unlockId, state: 'available' },
        });
      }
    }

    return toUnlock;
  });

  return NextResponse.json({ mastered: topicId, unlocked });
}
