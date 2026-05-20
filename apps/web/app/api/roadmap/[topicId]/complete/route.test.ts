import { describe, it, expect, beforeEach, afterAll } from 'vitest';
import { prisma } from '@elite/db';
import { NextRequest } from 'next/server';

const makeReq = (topicId: string) =>
  new NextRequest(`http://localhost/api/roadmap/${topicId}/complete`, {
    method: 'POST',
  });

const BASE_TOPICS = [
  {
    id: 'topic-a',
    slug: 'topic-a',
    title: 'Topic A',
    category: 'fundamentals',
    estimatedHours: 10,
    dependsOn: '[]',
    isRequired: true,
  },
  {
    id: 'topic-b',
    slug: 'topic-b',
    title: 'Topic B',
    category: 'fundamentals',
    estimatedHours: 10,
    dependsOn: '["topic-a"]',
    isRequired: true,
  },
  {
    id: 'topic-c',
    slug: 'topic-c',
    title: 'Topic C',
    category: 'fundamentals',
    estimatedHours: 10,
    dependsOn: '["topic-b"]',
    isRequired: true,
  },
];

describe('POST /api/roadmap/[topicId]/complete', () => {
  beforeEach(async () => {
    await prisma.nodeProgress.deleteMany();
    await prisma.pillReview.deleteMany();
    await prisma.validation.deleteMany();
    await prisma.userProfile.deleteMany();
    await prisma.user.deleteMany();
    await prisma.resource.deleteMany();
    await prisma.pill.deleteMany();
    await prisma.topic.deleteMany();

    await prisma.user.create({
      data: { id: 'user-complete-1', email: 'complete@elite.com', targetDays: 180 },
    });
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('in_progress → mastered (200) + returns unlocked[]', async () => {
    await prisma.topic.create({ data: BASE_TOPICS[0] });
    await prisma.nodeProgress.create({
      data: { userId: 'user-complete-1', topicId: 'topic-a', state: 'in_progress' },
    });

    const { POST } = await import('./route');
    const res = await POST(makeReq('topic-a'), { params: { topicId: 'topic-a' } });
    expect(res.status).toBe(200);

    const data = await res.json() as { mastered: string; unlocked: string[] };
    expect(data.mastered).toBe('topic-a');
    expect(Array.isArray(data.unlocked)).toBe(true);

    const row = await prisma.nodeProgress.findUnique({
      where: { userId_topicId: { userId: 'user-complete-1', topicId: 'topic-a' } },
    });
    expect(row?.state).toBe('mastered');
  });

  it('available → 400', async () => {
    await prisma.topic.create({ data: BASE_TOPICS[0] });
    await prisma.nodeProgress.create({
      data: { userId: 'user-complete-1', topicId: 'topic-a', state: 'available' },
    });

    const { POST } = await import('./route');
    const res = await POST(makeReq('topic-a'), { params: { topicId: 'topic-a' } });
    expect(res.status).toBe(400);
  });

  it('locked → 400', async () => {
    await prisma.topic.create({ data: BASE_TOPICS[0] });
    await prisma.nodeProgress.create({
      data: { userId: 'user-complete-1', topicId: 'topic-a', state: 'locked' },
    });

    const { POST } = await import('./route');
    const res = await POST(makeReq('topic-a'), { params: { topicId: 'topic-a' } });
    expect(res.status).toBe(400);
  });

  it('Linear chain A→B→C: completing B unlocks C', async () => {
    for (const t of BASE_TOPICS) {
      await prisma.topic.create({ data: t });
    }
    await prisma.nodeProgress.createMany({
      data: [
        { userId: 'user-complete-1', topicId: 'topic-a', state: 'mastered' },
        { userId: 'user-complete-1', topicId: 'topic-b', state: 'in_progress' },
        { userId: 'user-complete-1', topicId: 'topic-c', state: 'locked' },
      ],
    });

    const { POST } = await import('./route');
    const res = await POST(makeReq('topic-b'), { params: { topicId: 'topic-b' } });
    expect(res.status).toBe(200);

    const data = await res.json() as { mastered: string; unlocked: string[] };
    expect(data.mastered).toBe('topic-b');
    expect(data.unlocked).toContain('topic-c');

    const cRow = await prisma.nodeProgress.findUnique({
      where: { userId_topicId: { userId: 'user-complete-1', topicId: 'topic-c' } },
    });
    expect(cRow?.state).toBe('available');
  });

  it('Diamond: last blocker mastered unlocks C', async () => {
    await prisma.topic.create({ data: BASE_TOPICS[0] }); // topic-a (no deps)
    await prisma.topic.create({
      data: {
        id: 'diamond-b',
        slug: 'diamond-b',
        title: 'Diamond B',
        category: 'fundamentals',
        estimatedHours: 10,
        dependsOn: '[]',
        isRequired: true,
      },
    });
    await prisma.topic.create({
      data: {
        id: 'diamond-c',
        slug: 'diamond-c',
        title: 'Diamond C',
        category: 'advanced',
        estimatedHours: 10,
        dependsOn: '["topic-a", "diamond-b"]',
        isRequired: true,
      },
    });

    await prisma.nodeProgress.createMany({
      data: [
        { userId: 'user-complete-1', topicId: 'topic-a', state: 'mastered' },
        { userId: 'user-complete-1', topicId: 'diamond-b', state: 'in_progress' },
        { userId: 'user-complete-1', topicId: 'diamond-c', state: 'locked' },
      ],
    });

    const { POST } = await import('./route');
    const res = await POST(makeReq('diamond-b'), { params: { topicId: 'diamond-b' } });
    expect(res.status).toBe(200);

    const data = await res.json() as { mastered: string; unlocked: string[] };
    expect(data.unlocked).toContain('diamond-c');

    const cRow = await prisma.nodeProgress.findUnique({
      where: { userId_topicId: { userId: 'user-complete-1', topicId: 'diamond-c' } },
    });
    expect(cRow?.state).toBe('available');
  });

  it('Diamond partial: C stays locked when one parent not mastered', async () => {
    // Scenario: A is mastered, B is in_progress (NOT mastered yet), C depends on [A, B]
    // When A gets completed (mastered), C should still be locked because B is not mastered
    await prisma.topic.create({
      data: {
        id: 'partial-a',
        slug: 'partial-a',
        title: 'Partial A',
        category: 'fundamentals',
        estimatedHours: 10,
        dependsOn: '[]',
        isRequired: true,
      },
    });
    await prisma.topic.create({
      data: {
        id: 'partial-b',
        slug: 'partial-b',
        title: 'Partial B',
        category: 'fundamentals',
        estimatedHours: 10,
        dependsOn: '[]',
        isRequired: true,
      },
    });
    await prisma.topic.create({
      data: {
        id: 'partial-c',
        slug: 'partial-c',
        title: 'Partial C',
        category: 'advanced',
        estimatedHours: 10,
        dependsOn: '["partial-a", "partial-b"]',
        isRequired: true,
      },
    });

    await prisma.nodeProgress.createMany({
      data: [
        { userId: 'user-complete-1', topicId: 'partial-a', state: 'in_progress' },
        { userId: 'user-complete-1', topicId: 'partial-b', state: 'available' }, // NOT mastered
        { userId: 'user-complete-1', topicId: 'partial-c', state: 'locked' },
      ],
    });

    const { POST } = await import('./route');
    // Complete partial-a; partial-b is still NOT mastered (available), so partial-c stays locked
    const res = await POST(makeReq('partial-a'), { params: { topicId: 'partial-a' } });
    expect(res.status).toBe(200);

    const data = await res.json() as { mastered: string; unlocked: string[] };
    expect(data.mastered).toBe('partial-a');
    // partial-c should NOT be unlocked since partial-b is not mastered
    expect(data.unlocked).not.toContain('partial-c');

    const cRow = await prisma.nodeProgress.findUnique({
      where: { userId_topicId: { userId: 'user-complete-1', topicId: 'partial-c' } },
    });
    expect(cRow?.state).toBe('locked');
  });

  it('Dependent already available → no regression (stays available, not duplicated)', async () => {
    await prisma.topic.create({ data: BASE_TOPICS[0] }); // topic-a root
    await prisma.topic.create({ data: BASE_TOPICS[1] }); // topic-b depends on topic-a

    await prisma.nodeProgress.createMany({
      data: [
        { userId: 'user-complete-1', topicId: 'topic-a', state: 'in_progress' },
        { userId: 'user-complete-1', topicId: 'topic-b', state: 'available' }, // already available
      ],
    });

    const { POST } = await import('./route');
    const res = await POST(makeReq('topic-a'), { params: { topicId: 'topic-a' } });
    expect(res.status).toBe(200);

    const data = await res.json() as { mastered: string; unlocked: string[] };
    // topic-b was already available — cascade should not re-unlock or duplicate
    expect(data.unlocked).not.toContain('topic-b');

    const bRow = await prisma.nodeProgress.findUnique({
      where: { userId_topicId: { userId: 'user-complete-1', topicId: 'topic-b' } },
    });
    expect(bRow?.state).toBe('available'); // remains available, not changed
  });
});
