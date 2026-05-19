import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@elite/db';

const REQUIRED_FIELDS = ['email', 'targetMonths', 'currentRole', 'yearsExp', 'targetRole', 'goalDeadline'] as const;

export async function POST(request: NextRequest) {
  const body = await request.json();

  for (const field of REQUIRED_FIELDS) {
    if (body[field] === undefined || body[field] === null || body[field] === '') {
      return NextResponse.json({ error: `Missing required field: ${field}` }, { status: 400 });
    }
  }

  const existing = await prisma.user.findUnique({ where: { email: body.email } });
  if (existing) {
    return NextResponse.json({ error: 'User already exists' }, { status: 409 });
  }

  let result: { userId: string; profileId: string; nodesSeeded: number };
  try {
    result = await prisma.$transaction(async (tx) => {
    const user = await tx.user.create({
      data: {
        email: body.email,
        targetMonths: Number(body.targetMonths),
      },
    });

    const profile = await tx.userProfile.create({
      data: {
        userId: user.id,
        currentRole: body.currentRole,
        yearsExp: Number(body.yearsExp),
        targetRole: body.targetRole,
        weakAreas: JSON.stringify(body.weakAreas ?? []),
        goalDeadline: new Date(body.goalDeadline),
      },
    });

    const topics = await tx.topic.findMany({
      where: { isRequired: true },
      orderBy: { id: 'asc' },
    });

    const roots = topics.filter(
      (t) => (JSON.parse(t.dependsOn) as string[]).length === 0
    );

    if (roots.length === 0) {
      throw new Error('NO_TOPOLOGICAL_ROOT');
    }

    const rootIds = new Set(roots.map((r) => r.id));

    await tx.nodeProgress.createMany({
      data: topics.map((topic) => ({
        userId: user.id,
        topicId: topic.id,
        state: rootIds.has(topic.id) ? 'available' : 'locked',
      })),
    });

      return { userId: user.id, profileId: profile.id, nodesSeeded: topics.length };
    });
  } catch (err) {
    if (err instanceof Error && err.message === 'NO_TOPOLOGICAL_ROOT') {
      return NextResponse.json(
        { error: 'No topological root found: all topics have dependencies' },
        { status: 422 }
      );
    }
    throw err;
  }

  return NextResponse.json(
    { userId: result.userId, profileId: result.profileId, nodesSeeded: result.nodesSeeded },
    { status: 201 }
  );
}
