import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock next/headers before importing the route
const mockSet = vi.fn();
const mockGet = vi.fn();

vi.mock('next/headers', () => ({
  cookies: vi.fn(() => ({ set: mockSet, get: mockGet })),
}));

// Mock @/lib/session so we can spy on clearSessionCookie
const mockClearSessionCookie = vi.fn();

vi.mock('@/lib/session', () => ({
  clearSessionCookie: mockClearSessionCookie,
}));

const { POST, GET } = await import('./route');

describe('POST /api/logout', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns 200 with { ok: true }', async () => {
    const response = await POST();
    expect(response.status).toBe(200);
    const body = await response.json();
    expect(body).toEqual({ ok: true });
  });

  it('calls clearSessionCookie', async () => {
    await POST();
    expect(mockClearSessionCookie).toHaveBeenCalledOnce();
  });

  it('is idempotent — returns 200 even when no sid cookie is present', async () => {
    mockGet.mockReturnValue(undefined);
    const response = await POST();
    expect(response.status).toBe(200);
    const body = await response.json();
    expect(body).toEqual({ ok: true });
  });
});

describe('GET /api/logout', () => {
  it('returns 405 Method Not Allowed', async () => {
    const response = await GET();
    expect(response.status).toBe(405);
    const body = await response.json();
    expect(body).toHaveProperty('error');
  });
});
