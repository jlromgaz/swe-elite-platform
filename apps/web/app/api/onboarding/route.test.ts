import { describe, it, expect, beforeEach, afterAll } from 'vitest';
import { prisma } from '@elite/db';
import { NextRequest } from 'next/server';

const VALID_BODY = {
  email: 'onboard@elite.com',
  targetMonths: 6,
  currentRole: 'junior',
  yearsExp: 2,
  targetRole: 'staff-engineer',
  weakAreas: [],
  goalDeadline: '2027-01-01T00:00:00.000Z',
};

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
    await prisma.nodeProgress.deleteMany();
    await prisma.pillReview.deleteMany();
    await prisma.validation.deleteMany();
    await prisma.userProfile.deleteMany();
    await prisma.user.deleteMany();
    await prisma.resource.deleteMany();
    await prisma.pill.deleteMany();
    await prisma.topic.deleteMany();
    await prisma.topic.create({ data: TEST_TOPIC });
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('Scenario A: returns 201 and creates User + UserProfile + NodeProgress', async () => {
    const { POST } = await import('./route');
    const res = await POST(makeReq(VALID_BODY));
    const data = await res.json();

    expect(res.status).toBe(201);
    expect(data.userId).toBeDefined();
    expect(data.nodesSeeded).toBe(1);

    const user = await prisma.user.findUnique({ where: { email: VALID_BODY.email } });
    expect(user).not.toBeNull();

    const profile = await prisma.userProfile.findUnique({ where: { userId: user!.id } });
    expect(profile).not.toBeNull();
    expect(profile!.currentRole).toBe(VALID_BODY.currentRole);

    const nodes = await prisma.nodeProgress.findMany({ where: { userId: user!.id } });
    expect(nodes).toHaveLength(1);
    expect(nodes[0].state).toBe('available');
  });

  it('Scenario B: returns 409 on duplicate email', async () => {
    const { POST } = await import('./route');
    await POST(makeReq(VALID_BODY));
    const res = await POST(makeReq(VALID_BODY));
    expect(res.status).toBe(409);
  });

  it('Scenario C: returns 400 on missing required field', async () => {
    const { POST } = await import('./route');
    const { email: _, ...bodyWithoutEmail } = VALID_BODY;
    const res = await POST(makeReq(bodyWithoutEmail));
    expect(res.status).toBe(400);
  });
});
