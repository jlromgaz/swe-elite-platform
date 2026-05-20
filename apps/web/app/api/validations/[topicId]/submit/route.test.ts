import { describe, it, expect, beforeEach, afterAll } from 'vitest';
import { prisma } from '@elite/db';
import { NextRequest } from 'next/server';

const TOPIC_ID = 'data-structures-fundamentals';
const USER_ID = 'user-validation-1';
const USER_EMAIL = 'validation@elite.com';

// data-structures-fundamentals: correctIndex = 3, options = ['O(n)', 'O(log n)', 'O(n²)', 'O(1)']
const CORRECT_INDEX = 3;
const WRONG_INDEX = 0;

const SEEDED_TOPICS = [
  {
    id: TOPIC_ID,
    slug: TOPIC_ID,
    title: 'Data Structures Fundamentals',
    category: 'fundamentals',
    estimatedHours: 10,
    dependsOn: '[]',
    isRequired: true,
  },
];

function makePostReq(topicId: string, body: unknown) {
  return new NextRequest(
    `http://localhost/api/validations/${topicId}/submit`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    }
  );
}

describe('POST /api/validations/[topicId]/submit', () => {
  beforeEach(async () => {
    await prisma.validation.deleteMany();
    await prisma.nodeProgress.deleteMany();
    await prisma.user.deleteMany();
    await prisma.resource.deleteMany();
    await prisma.pill.deleteMany();
    await prisma.topic.deleteMany();

    await prisma.user.create({
      data: { id: USER_ID, username: 'validation-user', targetDays: 180 },
    });

    for (const t of SEEDED_TOPICS) {
      await prisma.topic.create({ data: t });
    }

    await prisma.nodeProgress.create({
      data: { userId: USER_ID, topicId: TOPIC_ID, state: 'in_progress' },
    });
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('Scenario A: correct answer → 201, passed:true, score:100, Validation created, NodeProgress=mastered', async () => {
    const { POST } = await import('./route');
    const res = await POST(makePostReq(TOPIC_ID, { answerIndex: CORRECT_INDEX }), {
      params: { topicId: TOPIC_ID },
    });
    expect(res.status).toBe(201);

    const data = await res.json() as { passed: boolean; score: number; unlocked: string[] };
    expect(data.passed).toBe(true);
    expect(data.score).toBe(100);
    expect(Array.isArray(data.unlocked)).toBe(true);

    const row = await prisma.validation.findFirst({ where: { userId: USER_ID, topicId: TOPIC_ID } });
    expect(row).not.toBeNull();
    expect(row?.passed).toBe(true);
    expect(row?.score).toBe(100);

    const progress = await prisma.nodeProgress.findUnique({
      where: { userId_topicId: { userId: USER_ID, topicId: TOPIC_ID } },
    });
    expect(progress?.state).toBe('mastered');
  });

  it('Scenario B: wrong answer → 200, passed:false, score:0, NodeProgress still in_progress, Validation created', async () => {
    const { POST } = await import('./route');
    const res = await POST(makePostReq(TOPIC_ID, { answerIndex: WRONG_INDEX }), {
      params: { topicId: TOPIC_ID },
    });
    expect(res.status).toBe(200);

    const data = await res.json() as { passed: boolean; score: number };
    expect(data.passed).toBe(false);
    expect(data.score).toBe(0);

    const row = await prisma.validation.findFirst({ where: { userId: USER_ID, topicId: TOPIC_ID } });
    expect(row).not.toBeNull();
    expect(row?.passed).toBe(false);
    expect(row?.score).toBe(0);

    const progress = await prisma.nodeProgress.findUnique({
      where: { userId_topicId: { userId: USER_ID, topicId: TOPIC_ID } },
    });
    expect(progress?.state).toBe('in_progress');
  });

  it('Scenario C: missing answerIndex → 400', async () => {
    const { POST } = await import('./route');
    const res = await POST(makePostReq(TOPIC_ID, {}), {
      params: { topicId: TOPIC_ID },
    });
    expect(res.status).toBe(400);
  });

  it('Scenario D: unknown topicId → 404', async () => {
    const { POST } = await import('./route');
    const res = await POST(makePostReq('unknown-topic-xyz', { answerIndex: 0 }), {
      params: { topicId: 'unknown-topic-xyz' },
    });
    expect(res.status).toBe(404);
  });

  it('Scenario E: already mastered → 200 { passed:true, alreadyMastered:true }, no new Validation row', async () => {
    // Set state to mastered first
    await prisma.nodeProgress.update({
      where: { userId_topicId: { userId: USER_ID, topicId: TOPIC_ID } },
      data: { state: 'mastered' },
    });

    const { POST } = await import('./route');
    const res = await POST(makePostReq(TOPIC_ID, { answerIndex: CORRECT_INDEX }), {
      params: { topicId: TOPIC_ID },
    });
    expect(res.status).toBe(200);

    const data = await res.json() as { passed: boolean; alreadyMastered: boolean };
    expect(data.passed).toBe(true);
    expect(data.alreadyMastered).toBe(true);

    // No Validation row should have been created
    const count = await prisma.validation.count({ where: { userId: USER_ID, topicId: TOPIC_ID } });
    expect(count).toBe(0);
  });
});
