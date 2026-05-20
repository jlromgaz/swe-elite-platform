import { NextRequest, NextResponse } from 'next/server';
import { QUIZ_BANK } from '@elite/db';

export async function GET(
  _req: NextRequest,
  context: { params: { topicId: string } }
) {
  const { topicId } = context.params;
  const entries = QUIZ_BANK[topicId];

  if (!entries || entries.length === 0) {
    return NextResponse.json({ error: 'Quiz not found for topic' }, { status: 404 });
  }

  return NextResponse.json({
    topicId,
    questions: entries.map(e => ({
      question: e.question,
      options: e.options,
    }))
  });
}
