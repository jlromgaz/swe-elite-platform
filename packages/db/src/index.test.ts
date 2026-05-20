import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { prisma } from './index';

const TEST_TOPIC = {
  id: 'test-topic-1',
  slug: 'test-topic',
  title: 'Test Topic',
  category: 'fundamentals',
  estimatedHours: 5,
  dependsOn: '[]',
  isRequired: true,
};

describe('packages/db — Prisma client', () => {
  beforeAll(async () => {
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
    await prisma.nodeProgress.deleteMany();
    await prisma.userProfile.deleteMany();
    await prisma.user.deleteMany();
    await prisma.topic.deleteMany();
    await prisma.$disconnect();
  });

  it('creates a User with UUID id and createdAt timestamp', async () => {
    const user = await prisma.user.create({
      data: { email: 'schema-test@elite.com', targetDays: 180 },
    });

    expect(user.id).toBeDefined();
    expect(user.id).toMatch(/^[0-9a-f-]{36}$/);
    expect(user.createdAt).toBeInstanceOf(Date);
    expect(user.email).toBe('schema-test@elite.com');
    expect(user.targetDays).toBe(180);
  });

  it('enforces @@unique([userId, topicId]) on NodeProgress', async () => {
    const user = await prisma.user.create({
      data: { email: 'unique-test@elite.com', targetDays: 90 },
    });

    await prisma.nodeProgress.create({
      data: { userId: user.id, topicId: TEST_TOPIC.id, state: 'locked' },
    });

    await expect(
      prisma.nodeProgress.create({
        data: { userId: user.id, topicId: TEST_TOPIC.id, state: 'locked' },
      }),
    ).rejects.toThrow();
  });
});
