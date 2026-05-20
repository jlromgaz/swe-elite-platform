import { NextRequest, NextResponse } from 'next/server';
import { Prisma } from '@prisma/client';
import { prisma } from '@elite/db';
import { setSessionCookie } from '@/lib/session';

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const username = body?.username?.trim();
  if (!username) return NextResponse.json({ error: 'username required' }, { status: 400 });

  let user = await prisma.user.findUnique({ where: { username } });
  if (user) {
    setSessionCookie(user.id);
    return NextResponse.json({ userId: user.id, created: false }, { status: 200 });
  }

  // New user — create + seed NodeProgress
  // P2002 guard: concurrent request may have created the same username between findUnique and create
  try {
    user = await prisma.user.create({ data: { username } });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2002') {
      user = await prisma.user.findUnique({ where: { username } }) as NonNullable<typeof user>;
      setSessionCookie(user.id);
      return NextResponse.json({ userId: user.id, created: false }, { status: 200 });
    }
    throw e;
  }
  const topics = await prisma.topic.findMany({ where: { isRequired: true }, orderBy: { id: 'asc' } });
  if (topics.length > 0) {
    // Find roots (empty dependsOn) → available, rest → locked
    await prisma.$transaction(
      topics.map((t) => {
        const deps = JSON.parse(t.dependsOn || '[]') as string[];
        const state = deps.length === 0 ? 'available' : 'locked';
        return prisma.nodeProgress.create({ data: { userId: user!.id, topicId: t.id, state } });
      })
    );
  }

  setSessionCookie(user.id);
  return NextResponse.json({ userId: user.id, created: true }, { status: 201 });
}
