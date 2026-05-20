import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@elite/db';

export const dynamic = 'force-dynamic';

export async function GET(_req: NextRequest) {
  const user = await prisma.user.findFirst();

  if (!user) {
    return NextResponse.json([]);
  }

  // Due pills: those whose parent topic is in_progress or mastered for this user,
  // AND either have no review by this user OR have a review with nextReview <= now.
  // SQLite + Prisma nested OR on relations can be tricky, so we use two queries merged in JS.

  const now = new Date();

  // Query 1: pills with no review for this user, for qualifying topics
  const neverReviewed = await prisma.pill.findMany({
    where: {
      topic: {
        progress: {
          some: {
            userId: user.id,
            state: { in: ['in_progress', 'mastered'] },
          },
        },
      },
      reviews: { none: { userId: user.id } },
    },
    include: { topic: { select: { title: true } } },
    orderBy: { id: 'asc' },
  });

  // Query 2: pills with a review whose nextReview <= now, for qualifying topics
  const overdueReviewed = await prisma.pill.findMany({
    where: {
      topic: {
        progress: {
          some: {
            userId: user.id,
            state: { in: ['in_progress', 'mastered'] },
          },
        },
      },
      reviews: { some: { userId: user.id, nextReview: { lte: now } } },
    },
    include: { topic: { select: { title: true } } },
    orderBy: { id: 'asc' },
  });

  // Merge, dedup by pill id
  const seen = new Set<string>();
  const merged = [...neverReviewed, ...overdueReviewed].filter((p) => {
    if (seen.has(p.id)) return false;
    seen.add(p.id);
    return true;
  });

  const result = merged.map((p) => ({
    pillId: p.id,
    topicId: p.topicId,
    content: p.content,
    topicTitle: p.topic.title,
  }));

  return NextResponse.json(result);
}
