import { NextRequest, NextResponse } from 'next/server';
import { QUIZ_BANK } from '@elite/db';

export async function GET(
  _req: NextRequest,
  context: { params: { topicId: string } }
) {
  const { topicId } = context.params;
  const entry = QUIZ_BANK[topicId];

  if (!entry) {
    return NextResponse.json({ error: 'Quiz not found for topic' }, { status: 404 });
  }

  return NextResponse.json({
    topicId,
    question: entry.question,
    options: entry.options,
  });
}
