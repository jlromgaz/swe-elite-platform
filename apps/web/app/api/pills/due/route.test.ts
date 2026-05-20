import { describe, it, expect, beforeEach, afterAll } from 'vitest';
import { prisma } from '@elite/db';
import { NextRequest } from 'next/server';

const makeReq = () =>
  new NextRequest('http://localhost/api/pills/due', { method: 'GET' });

const TEST_TOPIC = {
  id: 'test-topic-due',
  slug: 'test-topic-due',
  title: 'Test Topic Due',
  category: 'fundamentals',
  estimatedHours: 10,
  dependsOn: '[]',
  isRequired: true,
};

const TEST_USER = {
  id: 'user-due-1',
  email: 'due@elite.com',
  targetMonths: 6,
};

const TEST_PILL = {
  id: 'pill-due-test-1',
  topicId: 'test-topic-due',
  content: 'Test pill content',
  locale: 'en',
};

describe('GET /api/pills/due', () => {
  beforeEach(async () => {
    // Teardown in FK order: PillReview → Pill → NodeProgress → UserProfile → User → Topic
    await prisma.pillReview.deleteMany();
    await prisma.pill.deleteMany();
    await prisma.nodeProgress.deleteMany();
    await prisma.userProfile.deleteMany();
    await prisma.user.deleteMany();
    await prisma.topic.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('Scenario A: pill with nextReview in the past for in_progress topic → 200, pill in response', async () => {
    await prisma.topic.create({ data: TEST_TOPIC });
    await prisma.user.create({ data: TEST_USER });
    await prisma.pill.create({ data: TEST_PILL });
    await prisma.nodeProgress.create({
      data: {
        userId: TEST_USER.id,
        topicId: TEST_TOPIC.id,
        state: 'in_progress',
      },
    });
    // PillReview with nextReview in the past
    await prisma.pillReview.create({
      data: {
        userId: TEST_USER.id,
        pillId: TEST_PILL.id,
        reviewCount: 1,
        nextReview: new Date(Date.now() - 24 * 60 * 60 * 1000), // yesterday
        lastScore: 2,
      },
    });

    const { GET } = await import('./route');
    const res = await GET(makeReq());
    expect(res.status).toBe(200);
    const data = await res.json() as Array<{ pillId: string }>;
    expect(Array.isArray(data)).toBe(true);
    expect(data.some((p) => p.pillId === TEST_PILL.id)).toBe(true);
  });

  it('Scenario B: pill with no PillReview (never reviewed) for in_progress topic → 200, pill in response', async () => {
    await prisma.topic.create({ data: TEST_TOPIC });
    await prisma.user.create({ data: TEST_USER });
    await prisma.pill.create({ data: TEST_PILL });
    await prisma.nodeProgress.create({
      data: {
        userId: TEST_USER.id,
        topicId: TEST_TOPIC.id,
        state: 'in_progress',
      },
    });
    // No PillReview created

    const { GET } = await import('./route');
    const res = await GET(makeReq());
    expect(res.status).toBe(200);
    const data = await res.json() as Array<{ pillId: string }>;
    expect(Array.isArray(data)).toBe(true);
    expect(data.some((p) => p.pillId === TEST_PILL.id)).toBe(true);
  });

  it('Scenario C: pill has PillReview.nextReview in the future → 200, empty array', async () => {
    await prisma.topic.create({ data: TEST_TOPIC });
    await prisma.user.create({ data: TEST_USER });
    await prisma.pill.create({ data: TEST_PILL });
    await prisma.nodeProgress.create({
      data: {
        userId: TEST_USER.id,
        topicId: TEST_TOPIC.id,
        state: 'in_progress',
      },
    });
    // PillReview with nextReview in the future
    await prisma.pillReview.create({
      data: {
        userId: TEST_USER.id,
        pillId: TEST_PILL.id,
        reviewCount: 1,
        nextReview: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // next week
        lastScore: 3,
      },
    });

    const { GET } = await import('./route');
    const res = await GET(makeReq());
    expect(res.status).toBe(200);
    const data = await res.json() as Array<unknown>;
    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBe(0);
  });

  it('Scenario D: topic in locked state → 200, empty array', async () => {
    await prisma.topic.create({ data: TEST_TOPIC });
    await prisma.user.create({ data: TEST_USER });
    await prisma.pill.create({ data: TEST_PILL });
    await prisma.nodeProgress.create({
      data: {
        userId: TEST_USER.id,
        topicId: TEST_TOPIC.id,
        state: 'locked',
      },
    });

    const { GET } = await import('./route');
    const res = await GET(makeReq());
    expect(res.status).toBe(200);
    const data = await res.json() as Array<unknown>;
    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBe(0);
  });

  it('Scenario E: no User row → 200, empty array', async () => {
    // No user created

    const { GET } = await import('./route');
    const res = await GET(makeReq());
    expect(res.status).toBe(200);
    const data = await res.json() as Array<unknown>;
    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBe(0);
  });
});
