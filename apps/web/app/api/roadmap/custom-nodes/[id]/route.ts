import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@elite/db';
import { getSessionUserId } from '@/lib/session';

export async function DELETE(
  _req: NextRequest,
  context: { params: { id: string } }
) {
  const userId = await getSessionUserId();

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = context.params;

  const node = await prisma.customNode.findFirst({
    where: { id, userId },
  });

  if (!node) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  await prisma.customNode.delete({ where: { id } });

  return NextResponse.json({ deleted: id });
}