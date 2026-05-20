import { describe, it, expect, beforeEach, afterAll } from 'vitest';
import { prisma } from '@elite/db';

const TOPICS = [
  {
    id: 'root-1',
    slug: 'data-structures',
    title: 'Data Structures',
    category: 'fundamentals',
    estimatedHours: 10,
    dependsOn: '[]',
    isRequired: true,
  },
  {
    id: 'root-2',
    slug: 'algorithms',
    title: 'Algorithms',
    category: 'fundamentals',
    estimatedHours: 12,
    dependsOn: '[]',
    isRequired: true,
  },
  {
    id: 'advanced-1',
    slug: 'system-design',
    title: 'System Design',
    category: 'advanced',
    estimatedHours: 20,
    dependsOn: '["root-1"]',
    isRequired: true,
  },
];

describe('GET /api/roadmap', () => {
  beforeEach(async () => {
    await prisma.nodeProgress.deleteMany();
    await prisma.pillReview.deleteMany();
    await prisma.validation.deleteMany();
    await prisma.userProfile.deleteMany();
    await prisma.user.deleteMany();
    await prisma.resource.deleteMany();
    await prisma.pill.deleteMany();
    await prisma.topic.deleteMany();

    for (const topic of TOPICS) {
      await prisma.topic.create({ data: topic });
    }

    await prisma.user.create({
      data: {
        id: 'user-1',
        email: 'test@elite.com',
        targetDays: 180,
      },
    });
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('Happy path: GET returns { nodes, edges } for first user with existing NodeProgress', async () => {
    await prisma.nodeProgress.createMany({
      data: [
        { userId: 'user-1', topicId: 'root-1', state: 'available' },
        { userId: 'user-1', topicId: 'root-2', state: 'available' },
        { userId: 'user-1', topicId: 'advanced-1', state: 'locked' },
      ],
    });

    const { GET } = await import('./route');
    const res = await GET();
    expect(res.status).toBe(200);

    const data = await res.json() as { nodes: unknown[]; edges: unknown[] };
    expect(data).toHaveProperty('nodes');
    expect(data).toHaveProperty('edges');
    expect(data.nodes).toHaveLength(3);
    expect(data.edges).toHaveLength(1);

    const nodes = data.nodes as Array<{ id: string; data: { state: string } }>;
    const root1 = nodes.find((n) => n.id === 'root-1');
    const root2 = nodes.find((n) => n.id === 'root-2');
    const adv1 = nodes.find((n) => n.id === 'advanced-1');
    expect(root1?.data.state).toBe('available');
    expect(root2?.data.state).toBe('available');
    expect(adv1?.data.state).toBe('locked');

    const edges = data.edges as Array<{ source: string; target: string }>;
    expect(edges[0].source).toBe('root-1');
    expect(edges[0].target).toBe('advanced-1');
  });

  it('No NodeProgress: roots are "available", rest "locked"', async () => {
    const { GET } = await import('./route');
    const res = await GET();
    expect(res.status).toBe(200);

    const data = await res.json() as { nodes: unknown[]; edges: unknown[] };
    expect(data).toHaveProperty('nodes');
    expect(data).toHaveProperty('edges');

    const nodes = data.nodes as Array<{ id: string; data: { state: string } }>;
    const root1 = nodes.find((n) => n.id === 'root-1');
    const root2 = nodes.find((n) => n.id === 'root-2');
    const adv1 = nodes.find((n) => n.id === 'advanced-1');
    expect(root1?.data.state).toBe('available');
    expect(root2?.data.state).toBe('available');
    expect(adv1?.data.state).toBe('locked');
  });
});
