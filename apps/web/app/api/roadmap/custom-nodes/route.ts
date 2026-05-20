import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@elite/db';
import { getSessionUserId } from '@/lib/session';

export async function POST(req: NextRequest) {
  const userId = await getSessionUserId();

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();
  const { title, dependsOn = [] } = body;

  if (!title || typeof title !== 'string' || title.trim().length === 0) {
    return NextResponse.json(
      { error: 'Title is required' },
      { status: 400 }
    );
  }

  if (title.length > 100) {
    return NextResponse.json(
      { error: 'Title too long' },
      { status: 400 }
    );
  }

  const node = await prisma.customNode.create({
    data: {
      userId,
      title: title.trim(),
      dependsOn: JSON.stringify(Array.isArray(dependsOn) ? dependsOn : []),
    },
  });

  return NextResponse.json(node, { status: 201 });
}