export const dynamic = 'force-dynamic';

import dynamic from 'next/dynamic';
import { prisma } from '@elite/db';

const PillQueueClient = dynamic(() => import('./PillQueue'), { ssr: false });

export default async function PillsPage() {
  const user = await prisma.user.findFirst();

  if (!user) {
    return (
      <div style={{ padding: '60px 24px', textAlign: 'center', color: '#6b7280' }}>
        No user found. Please complete onboarding first.
      </div>
    );
  }

  const now = new Date();

  // Due pills: in_progress or mastered topics, never reviewed OR nextReview <= now
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
