import { describe, it, expect } from 'vitest';
import { NextRequest } from 'next/server';

const makeGetReq = (topicId: string) =>
  new NextRequest(`http://localhost/api/validations/${topicId}`, {
    method: 'GET',
  });

describe('GET /api/validations/[topicId]', () => {
  it('Scenario A: known topicId returns 200 with question and options, no correctIndex', async () => {
    const { GET } = await import('./route');
    const res = await GET(makeGetReq('data-structures-fundamentals'), {
      params: { topicId: 'data-structures-fundamentals' },
    });
    expect(res.status).toBe(200);

    const data = await res.json() as Record<string, unknown>;
    expect(data.topicId).toBe('data-structures-fundamentals');
    expect(typeof data.question).toBe('string');
    expect(Array.isArray(data.options)).toBe(true);
    expect((data.options as string[]).length).toBeGreaterThan(0);
    // Must NOT expose the correct answer
    expect(data).not.toHaveProperty('correctIndex');
  });

  it('Scenario B: unknown topicId returns 404', async () => {
    const { GET } = await import('./route');
    const res = await GET(makeGetReq('unknown-topic-xyz'), {
      params: { topicId: 'unknown-topic-xyz' },
    });
    expect(res.status).toBe(404);
  });
});
