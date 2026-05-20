import { describe, it, expect, beforeEach, afterAll } from 'vitest';
import { prisma } from '@elite/db';
import { NextRequest } from 'next/server';

function makeReq(pillId: string, body: unknown) {
  return new NextRequest(`http://localhost/api/pills/${pillId}/review`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
}

function withinWindow(dateStr: string, nowMs: number, days: number): boolean {
  const expectedMs = nowMs + days * 24 * 60 * 60 * 1000;
  const toleranceMs = 60 * 1000; // 1 minute
  const actual = new Date(dateStr).getTime();
  return actual >= expectedMs - toleranceMs && actual <= expectedMs + toleranceMs;
}

const TEST_TOPIC = {
  id: 'test-topic-review',
  slug: 'test-topic-review',
  title: 'Test Topic Review',
  category: 'fundamentals',
  estimatedHours: 10,
  dependsOn: '[]',
  isRequired: true,
};

const TEST_USER = {
  id: 'user-review-1',
  email: 'review@elite.com',
  targetMonths: 6,
};

const TEST_PILL = {
  id: 'pill-review-test-1',
  topicId: 'test-topic-review',
  content: 'Test pill for review',
  locale: 'en',
};

describe('POST /api/pills/[pillId]/review', () => {
  beforeEach(async () => {
    // Teardown in FK order: PillReview → Pill → NodeProgress → UserProfile → User → Topic
    await prisma.pillReview.deleteMany();
    await prisma.pill.deleteMany();
    await prisma.nodeProgress.deleteMany();
    await prisma.userProfile.deleteMany();
    await prisma.user.deleteMany();
    await prisma.topic.deleteMany();

    await prisma.topic.create({ data: TEST_TOPIC });
    await prisma.user.create({ data: TEST_USER });
    await prisma.pill.create({ data: TEST_PILL });
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('Scenario A: first review score=2 → 200, reviewCount=1, nextReview≈now+3d', async () => {
    const now = Date.now();
    const { POST } = await import('./route');
    const res = await POST(makeReq(TEST_PILL.id, { score: 2 }), {
      params: { pillId: TEST_PILL.id },
    });
    expect(res.status).toBe(200);

    const data = await res.json() as {
      pillId: string;
      reviewCount: number;
      score: number;
      nextReview: string;
    };
    expect(data.pillId).toBe(TEST_PILL.id);
    expect(data.reviewCount).toBe(1);
    expect(data.score).toBe(2);
    expect(withinWindow(data.nextReview, now, 3)).toBe(true);

    const row = await prisma.pillReview.findUnique({
      where: { userId_pillId: { userId: TEST_USER.id, pillId: TEST_PILL.id } },
    });
    expect(row).not.toBeNull();
    expect(row?.reviewCount).toBe(1);
  });

  it('Scenario B: existing review (count=1) score=3 → 200, reviewCount=2, nextReview≈now+7d', async () => {
    // Seed existing PillReview with reviewCount=1
    await prisma.pillReview.create({
      data: {
        userId: TEST_USER.id,
        pillId: TEST_PILL.id,
        reviewCount: 1,
        nextReview: new Date(Date.now() - 24 * 60 * 60 * 1000), // past
        lastScore: 2,
      },
    });

    const now = Date.now();
    const { POST } = await import('./route');
    const res = await POST(makeReq(TEST_PILL.id, { score: 3 }), {
      params: { pillId: TEST_PILL.id },
    });
    expect(res.status).toBe(200);

    const data = await res.json() as {
      pillId: string;
      reviewCount: number;
      score: number;
      nextReview: string;
    };
    expect(data.reviewCount).toBe(2);
    expect(withinWindow(data.nextReview, now, 7)).toBe(true);

    const row = await prisma.pillReview.findUnique({
      where: { userId_pillId: { userId: TEST_USER.id, pillId: TEST_PILL.id } },
    });
    expect(row?.reviewCount).toBe(2);
  });

  it('Scenario C: score=0 → 400, no DB write', async () => {
    const { POST } = await import('./route');
    const res = await POST(makeReq(TEST_PILL.id, { score: 0 }), {
      params: { pillId: TEST_PILL.id },
    });
    expect(res.status).toBe(400);

    const count = await prisma.pillReview.count();
    expect(count).toBe(0);
  });

  it('Scenario D: score="easy" (string) → 400', async () => {
    const { POST } = await import('./route');
    const res = await POST(makeReq(TEST_PILL.id, { score: 'easy' }), {
      params: { pillId: TEST_PILL.id },
    });
    expect(res.status).toBe(400);
  });

  it('Scenario E: unknown pillId → 404', async () => {
    const { POST } = await import('./route');
    const res = await POST(makeReq('pill-does-not-exist', { score: 2 }), {
      params: { pillId: 'pill-does-not-exist' },
    });
    expect(res.status).toBe(404);
  });
});
