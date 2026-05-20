import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@elite/db';
import { computeNextReview } from '../../../../../lib/srs';
import { getSessionUserId } from '@/lib/session';

export const dynamic = 'force-dynamic';

export async function POST(
  req: NextRequest,
  context: { params: { pillId: string } }
) {
  const { pillId } = context.params;

  // Parse and validate score
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const rawScore = (body as Record<string, unknown>)?.score;
  if (
    typeof rawScore !== 'number' ||
    !Number.isInteger(rawScore) ||
    rawScore < 1 ||
    rawScore > 3
  ) {
    return NextResponse.json(
      { error: 'score must be an integer in [1, 2, 3]' },
      { status: 400 }
    );
  }
  const score = rawScore as 1 | 2 | 3;

  // Verify pill exists
  const pill = await prisma.pill.findUnique({ where: { id: pillId } });
  if (!pill) {
    return NextResponse.json({ error: 'Pill not found' }, { status: 404 });
  }

  // Get current user from session
  const userId = await getSessionUserId();
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Get existing review if any
  const existing = await prisma.pillReview.findUnique({
    where: { userId_pillId: { userId, pillId } },
  });

  const currentReviewCount = existing?.reviewCount ?? 0;
  const { nextReview, newReviewCount } = computeNextReview(currentReviewCount, score);

  // Upsert PillReview
  await prisma.pillReview.upsert({
    where: { userId_pillId: { userId, pillId } },
    update: { reviewCount: newReviewCount, nextReview, lastScore: score },
    create: {
      userId,
      pillId,
      reviewCount: newReviewCount,
      nextReview,
      lastScore: score,
    },
  });

  return NextResponse.json({
    pillId,
    reviewCount: newReviewCount,
    score,
    nextReview,
  });
}
