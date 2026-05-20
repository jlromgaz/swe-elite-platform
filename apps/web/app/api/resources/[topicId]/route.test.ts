import { describe, it, expect, beforeEach, afterAll } from 'vitest';
import { prisma } from '@elite/db';
import { NextRequest } from 'next/server';

const TOPIC = {
  id: 'topic-res-test',
  slug: 'topic-res-test',
  title: 'Resource Test Topic',
  category: 'fundamentals',
  estimatedHours: 5,
  dependsOn: '[]',
  isRequired: true,
};

const makeGetReq = (topicId: string) =>
  new NextRequest(`http://localhost/api/resources/${topicId}`, {
    method: 'GET',
  });

describe('GET /api/resources/[topicId]', () => {
  beforeEach(async () => {
    await prisma.nodeProgress.deleteMany();
    await prisma.resource.deleteMany();
    await prisma.pill.deleteMany();
    await prisma.validation.deleteMany();
    await prisma.pillReview.deleteMany();
    await prisma.user.deleteMany();
    await prisma.topic.deleteMany();

    await prisma.topic.create({ data: TOPIC });
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('returns { resources: [] } with 200 for topic with no resources', async () => {
    const { GET } = await import('./route');
    const res = await GET(makeGetReq('topic-res-test'), {
      params: { topicId: 'topic-res-test' },
    });

    expect(res.status).toBe(200);
    const data = await res.json() as { resources: unknown[] };
    expect(Array.isArray(data.resources)).toBe(true);
    expect(data.resources).toHaveLength(0);
  });

  it('returns 404 for nonexistent topic', async () => {
    const { GET } = await import('./route');
    const res = await GET(makeGetReq('does-not-exist'), {
      params: { topicId: 'does-not-exist' },
    });

    expect(res.status).toBe(404);
    const data = await res.json() as { error: string };
    expect(data.error).toBeDefined();
  });

  it('returns resources with correct shape for valid topic', async () => {
    await prisma.resource.create({
      data: {
        id: 'res-1',
        topicId: 'topic-res-test',
        type: 'video',
        title: 'Intro Video',
        url: 'https://example.com/video',
        locale: 'en',
        durationMin: 30,
        quality: 8,
      },
    });
    await prisma.resource.create({
      data: {
        id: 'res-2',
        topicId: 'topic-res-test',
        type: 'article',
        title: 'Deep Dive Article',
        url: 'https://example.com/article',
        locale: 'en',
        durationMin: null,
        quality: 5,
      },
    });

    const { GET } = await import('./route');
    const res = await GET(makeGetReq('topic-res-test'), {
      params: { topicId: 'topic-res-test' },
    });

    expect(res.status).toBe(200);
    const data = await res.json() as {
      resources: {
        id: string;
        type: string;
        title: string;
        url: string;
        locale: string;
        durationMin: number | null;
        quality: number;
      }[];
    };

    expect(data.resources).toHaveLength(2);

    const video = data.resources.find((r) => r.type === 'video');
    expect(video).toBeDefined();
    expect(video!.title).toBe('Intro Video');
    expect(video!.url).toBe('https://example.com/video');
    expect(video!.durationMin).toBe(30);
    expect(video!.quality).toBe(8);

    const article = data.resources.find((r) => r.type === 'article');
    expect(article).toBeDefined();
    expect(article!.durationMin).toBeNull();
  });

  it('returns resources ordered by quality descending', async () => {
    await prisma.resource.createMany({
      data: [
        { id: 'res-3', topicId: 'topic-res-test', type: 'video', title: 'Low', url: 'https://x.com/1', locale: 'en', durationMin: 10, quality: 3 },
        { id: 'res-4', topicId: 'topic-res-test', type: 'video', title: 'High', url: 'https://x.com/2', locale: 'en', durationMin: 20, quality: 9 },
        { id: 'res-5', topicId: 'topic-res-test', type: 'video', title: 'Mid', url: 'https://x.com/3', locale: 'en', durationMin: 15, quality: 5 },
      ],
    });

    const { GET } = await import('./route');
    const res = await GET(makeGetReq('topic-res-test'), {
      params: { topicId: 'topic-res-test' },
    });

    expect(res.status).toBe(200);
    const data = await res.json() as { resources: { quality: number }[] };
    expect(data.resources).toHaveLength(3);
    expect(data.resources[0].quality).toBe(9);
    expect(data.resources[1].quality).toBe(5);
    expect(data.resources[2].quality).toBe(3);
  });
});