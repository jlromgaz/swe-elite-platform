import { describe, it, expect } from 'vitest';

describe('GET /api/health', () => {
  it('returns 200 and { status: "ok" }', async () => {
    const { GET } = await import('./route');
    const response = await GET();
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.status).toBe('ok');
  });
});
