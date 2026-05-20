import { describe, it, expect, beforeEach, afterAll } from 'vitest';
import { prisma } from '@elite/db';
import { NextRequest } from 'next/server';

const TOPIC = {
  id: 'topic-start-1',
  slug: 'topic-start-1',
  title: 'Test Topic',
  category: 'fundamentals',
  estimatedHours: 10,
  dependsOn: '[]',
  isRequired: true,
};

const makeReq = (topicId: string) =>
  new NextRequest(`http://localhost/api/roadmap/${topicId}/start`, {
    method: 'POST',
  });

describe('POST /api/roadmap/[topicId]/start', () => {
  beforeEach(async () => {
    await prisma.nodeProgress.deleteMany();
    await prisma.pillReview.deleteMany();
    await prisma.validation.deleteMany();
    await prisma.user.deleteMany();
    await prisma.resource.deleteMany();
    await prisma.pill.deleteMany();
    await prisma.topic.deleteMany();

    await prisma.topic.create({ data: TOPIC });
    await prisma.user.create({
      data: { id: 'user-start-1', username: 'start-user', targetDays: 180 },
    });
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('available → in_progress (200)', async () => {
    await prisma.nodeProgress.create({
      data: { userId: 'user-start-1', topicId: 'topic-start-1', state: 'available' },
    });

    const { POST } = await import('./route');
    const res = await POST(makeReq('topic-start-1'), { params: { topicId: 'topic-start-1' } });
    expect(res.status).toBe(200);

    const data = await res.json() as { state: string };
    expect(data.state).toBe('in_progress');

    const row = await prisma.nodeProgress.findUnique({
      where: { userId_topicId: { userId: 'user-start-1', topicId: 'topic-start-1' } },
    });
    expect(row?.state).toBe('in_progress');
  });

  it('locked → 400', async () => {
    await prisma.nodeProgress.create({
      data: { userId: 'user-start-1', topicId: 'topic-start-1', state: 'locked' },
    });

    const { POST } = await import('./route');
    const res = await POST(makeReq('topic-start-1'), { params: { topicId: 'topic-start-1' } });
    expect(res.status).toBe(400);

    const row = await prisma.nodeProgress.findUnique({
      where: { userId_topicId: { userId: 'user-start-1', topicId: 'topic-start-1' } },
    });
    expect(row?.state).toBe('locked');
  });

  it('in_progress → 400', async () => {
    await prisma.nodeProgress.create({
      data: { userId: 'user-start-1', topicId: 'topic-start-1', state: 'in_progress' },
    });

    const { POST } = await import('./route');
    const res = await POST(makeReq('topic-start-1'), { params: { topicId: 'topic-start-1' } });
    expect(res.status).toBe(400);
  });

  it('mastered → 400', async () => {
    await prisma.nodeProgress.create({
      data: { userId: 'user-start-1', topicId: 'topic-start-1', state: 'mastered' },
    });

    const { POST } = await import('./route');
    const res = await POST(makeReq('topic-start-1'), { params: { topicId: 'topic-start-1' } });
    expect(res.status).toBe(400);
  });

  it('unknown topicId → 404', async () => {
    const { POST } = await import('./route');
    const res = await POST(makeReq('does-not-exist'), { params: { topicId: 'does-not-exist' } });
    expect(res.status).toBe(404);
  });
});
