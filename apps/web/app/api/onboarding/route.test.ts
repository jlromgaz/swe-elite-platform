import { describe, it, expect, beforeEach, afterAll, vi } from 'vitest';
import { prisma } from '@elite/db';
import { NextRequest } from 'next/server';

// Mock next/headers so setSessionCookie doesn't fail in test environment
vi.mock('next/headers', () => ({
  cookies: vi.fn(() => ({
    set: vi.fn(),
    get: vi.fn(),
  })),
}));

const TEST_TOPIC = {
  id: 'fundamentals-1',
  slug: 'data-structures',
  title: 'Data Structures',
  category: 'fundamentals',
  estimatedHours: 10,
  dependsOn: '[]',
  isRequired: true,
};

const makeReq = (body: unknown) =>
  new NextRequest('http://localhost/api/onboarding', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

describe('POST /api/onboarding', () => {
  beforeEach(async () => {
    await prisma.pillReview.deleteMany();
    await prisma.validation.deleteMany();
    await prisma.nodeProgress.deleteMany();
    await prisma.user.deleteMany();
    await prisma.resource.deleteMany();
    await prisma.pill.deleteMany();
    await prisma.topic.deleteMany();
    await prisma.topic.create({ data: TEST_TOPIC });
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('POST with { username: "alice" } (new user) returns 201, creates User, seeds NodeProgress, returns { userId, created: true }', async () => {
    const { POST } = await import('./route');
    const res = await POST(makeReq({ username: 'alice' }));
    const data = await res.json();

    expect(res.status).toBe(201);
    expect(data.userId).toBeDefined();
    expect(data.created).toBe(true);

    const user = await prisma.user.findUnique({ where: { username: 'alice' } });
    expect(user).not.toBeNull();
    expect(user!.username).toBe('alice');

    const nodes = await prisma.nodeProgress.findMany({ where: { userId: user!.id } });
    expect(nodes.length).toBeGreaterThanOrEqual(1);
  });

  it('POST with { username: "alice" } again (existing user) returns 200, no new User created, returns { userId, created: false }', async () => {
    const { POST } = await import('./route');
    // First call - create user
    await POST(makeReq({ username: 'alice' }));
    const countBefore = await prisma.user.count();

    // Second call - find existing user
    const res = await POST(makeReq({ username: 'alice' }));
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data.userId).toBeDefined();
    expect(data.created).toBe(false);

    const countAfter = await prisma.user.count();
    expect(countAfter).toBe(countBefore);
  });

  it('POST with { username: "" } returns 400', async () => {
    const { POST } = await import('./route');
    const res = await POST(makeReq({ username: '' }));
    expect(res.status).toBe(400);
  });

  it('POST with missing body / no username field returns 400', async () => {
    const { POST } = await import('./route');
    const res = await POST(makeReq({}));
    expect(res.status).toBe(400);
  });

  it('NodeProgress is seeded on new user: at least one row exists for that userId', async () => {
    const { POST } = await import('./route');
    const res = await POST(makeReq({ username: 'bob' }));
    expect(res.status).toBe(201);

    const data = await res.json();
    const nodes = await prisma.nodeProgress.findMany({ where: { userId: data.userId } });
    expect(nodes.length).toBeGreaterThanOrEqual(1);
    // Root topics (dependsOn: []) should be available
    const availableNodes = nodes.filter(n => n.state === 'available');
    expect(availableNodes.length).toBeGreaterThanOrEqual(1);
  });
});
