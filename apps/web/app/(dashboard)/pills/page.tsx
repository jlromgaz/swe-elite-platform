export const dynamic = 'force-dynamic';

import { redirect } from 'next/navigation';
import dynamicImport from 'next/dynamic';
import { prisma } from '@elite/db';
import { getSessionUserId } from '@/lib/session';

const PillQueueClient = dynamicImport(() => import('./PillQueue'), { ssr: false });

export default async function PillsPage() {
  const userId = await getSessionUserId();

  if (!userId) {
    redirect('/onboarding');
  }

  const now = new Date();

  // Due pills: in_progress or mastered topics, never reviewed OR nextReview <= now
  const neverReviewed = await prisma.pill.findMany({
    where: {
      topic: {
        progress: {
          some: {
            userId,
            state: { in: ['in_progress', 'mastered'] },
          },
        },
      },
      reviews: { none: { userId } },
    },
    include: { topic: { select: { title: true } } },
    orderBy: { id: 'asc' },
  });

  const overdueReviewed = await prisma.pill.findMany({
    where: {
      topic: {
        progress: {
          some: {
            userId,
            state: { in: ['in_progress', 'mastered'] },
          },
        },
      },
      reviews: { some: { userId, nextReview: { lte: now } } },
    },
    include: { topic: { select: { title: true } } },
    orderBy: { id: 'asc' },
  });

  // Merge and dedup
  const seen = new Set<string>();
  const merged = [...neverReviewed, ...overdueReviewed].filter((p) => {
    if (seen.has(p.id)) return false;
    seen.add(p.id);
    return true;
  });

  const pills = merged.map((p) => ({
    pillId: p.id,
    topicId: p.topicId,
    content: p.content,
    topicTitle: p.topic.title,
  }));

  return (
    <main style={{ minHeight: '100vh', background: '#f9fafb' }}>
      <div style={{ maxWidth: 600, margin: '0 auto', paddingTop: 40 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8, paddingLeft: 16 }}>
          Daily Review
        </h1>
        <p style={{ color: '#6b7280', marginBottom: 24, paddingLeft: 16, fontSize: 14 }}>
          Reinforce what you have learned with quick spaced-repetition pills.
        </p>
        <PillQueueClient pills={pills} />
      </div>
    </main>
  );
}
