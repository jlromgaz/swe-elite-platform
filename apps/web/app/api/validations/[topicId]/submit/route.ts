import { NextRequest, NextResponse } from 'next/server';
import { prisma, QUIZ_BANK } from '@elite/db';
import { getSessionUserId } from '@/lib/session';

export async function POST(
  req: NextRequest,
  context: { params: { topicId: string } }
) {
  const { topicId } = context.params;

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const answers = (body as Record<string, unknown>)?.answers as number[];
  if (!Array.isArray(answers)) {
    return NextResponse.json({ error: 'answers must be an array of numbers' }, { status: 400 });
  }

  const entries = QUIZ_BANK[topicId];
  if (!entries || entries.length === 0) {
    return NextResponse.json({ error: 'Quiz not found for topic' }, { status: 404 });
  }

  if (answers.length !== entries.length) {
    return NextResponse.json({ error: 'Answers length must match questions length' }, { status: 400 });
  }

  const userId = await getSessionUserId();
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Already mastered short-circuit
  const nodeProgress = await prisma.nodeProgress.findUnique({
    where: { userId_topicId: { userId, topicId } },
  });

  if (nodeProgress?.state === 'mastered') {
    return NextResponse.json({ passed: true, alreadyMastered: true });
  }

  let correctCount = 0;
  for (let i = 0; i < entries.length; i++) {
    if (answers[i] === entries[i].correctIndex) {
      correctCount++;
    }
  }

  const score = (correctCount / entries.length) * 100;
  const passed = score >= 70; // 70% threshold
  // Generate a summary for the answer column
  const answerSummary = `${correctCount}/${entries.length} correct`;

  if (passed) {
    await prisma.$transaction(async (tx) => {
      // Create Validation row
      await tx.validation.create({
        data: {
          userId,
          topicId,
          type: 'multiple_choice',
          question: '10-question final exam',
          answer: answerSummary,
          score,
          passed: true,
        },
      });

      // Update NodeProgress to mastered
      await tx.nodeProgress.upsert({
        where: { userId_topicId: { userId, topicId } },
        update: { state: 'mastered', masteredAt: new Date() },
        create: { userId, topicId, state: 'mastered', masteredAt: new Date() },
      });
    });

    return NextResponse.json({ passed: true, score }, { status: 201 });
  } else {
    // Failed attempt
    await prisma.validation.create({
      data: {
        userId,
        topicId,
        type: 'multiple_choice',
        question: '10-question final exam',
        answer: answerSummary,
        score,
        passed: false,
      },
    });

    return NextResponse.json({ passed: false, score });
  }
}
