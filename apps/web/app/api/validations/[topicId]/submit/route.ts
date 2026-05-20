import { NextRequest, NextResponse } from 'next/server';
import { prisma, QUIZ_BANK } from '@elite/db';
import { computeUnlocks } from '../../../../../lib/roadmap-cascade';
import { getSessionUserId } from '@/lib/session';

type NodeState = 'locked' | 'available' | 'in_progress' | 'mastered';

export async function POST(
  req: NextRequest,
  context: { params: { topicId: string } }
) {
  const { topicId } = context.params;

  // Parse and validate body
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const answerIndex = (body as Record<string, unknown>)?.answerIndex;
  if (answerIndex === undefined || answerIndex === null || typeof answerIndex !== 'number') {
    return NextResponse.json({ error: 'answerIndex is required and must be a number' }, { status: 400 });
  }

  // Lookup quiz entry
  const entry = QUIZ_BANK[topicId];
  if (!entry) {
    return NextResponse.json({ error: 'Quiz not found for topic' }, { status: 404 });
  }

  // Get current user from session
  const userId = await getSessionUserId();
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Find node progress
  const nodeProgress = await prisma.nodeProgress.findUnique({
    where: { userId_topicId: { userId, topicId } },
  });

  if (!nodeProgress) {
    return NextResponse.json({ error: 'Topic progress not found' }, { status: 404 });
  }

  // Already mastered short-circuit
  if (nodeProgress.state === 'mastered') {
    return NextResponse.json({ passed: true, alreadyMastered: true });
  }

  const passed = answerIndex === entry.correctIndex;
  const score = passed ? 100 : 0;
  const answer = entry.options[answerIndex] ?? String(answerIndex);

  if (passed) {
    // Fetch all topics and current progress outside the transaction for computeUnlocks
    const allTopics = await prisma.topic.findMany();
    const allProgress = await prisma.nodeProgress.findMany({ where: { userId } });

    const progressMap = new Map<string, NodeState>(
      allProgress.map((p) => [p.topicId, p.state as NodeState])
    );
    // Reflect the mastered state before computing unlocks
    progressMap.set(topicId, 'mastered');

    const toUnlock = computeUnlocks(allTopics, progressMap, topicId);

    // Perform all writes in a transaction
    await prisma.$transaction(async (tx) => {
      // Create Validation row
      await tx.validation.create({
        data: {
          userId,
          topicId,
          type: 'multiple_choice',
          question: entry.question,
          answer,
          score,
          passed: true,
        },
      });

      // Update NodeProgress to mastered
      await tx.nodeProgress.update({
        where: { userId_topicId: { userId, topicId } },
        data: { state: 'mastered', masteredAt: new Date() },
      });

      // Unlock dependents
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
    });

    return NextResponse.json({ passed: true, score: 100, unlocked: toUnlock }, { status: 201 });
  } else {
    // Failed attempt — create Validation row only
    await prisma.validation.create({
      data: {
        userId,
        topicId,
        type: 'multiple_choice',
        question: entry.question,
        answer,
        score,
        passed: false,
      },
    });

    return NextResponse.json({ passed: false, score: 0 });
  }
}
