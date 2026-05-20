import { describe, it, expect } from 'vitest';
import { NextRequest } from 'next/server';
import { middleware } from './middleware';

function makeRequest(pathname: string, sidCookie?: string): NextRequest {
  const url = `http://localhost${pathname}`;
  const req = new NextRequest(url);
  if (sidCookie) {
    req.cookies.set('sid', sidCookie);
  }
  return req;
}

describe('middleware', () => {
  it('request to /roadmap with sid cookie present passes through', () => {
    const req = makeRequest('/roadmap', 'user-abc-123');
    const res = middleware(req);
    // NextResponse.next() does not have a Location header
    expect(res.headers.get('location')).toBeNull();
    expect(res.status).toBe(200);
  });

  it('request to /roadmap without sid cookie redirects to /onboarding', () => {
    const req = makeRequest('/roadmap');
    const res = middleware(req);
    const location = res.headers.get('location');
    expect(location).not.toBeNull();
    expect(location).toContain('/onboarding');
    expect(res.status).toBeGreaterThanOrEqual(300);
    expect(res.status).toBeLessThan(400);
  });

  it('request to /pills without sid cookie redirects to /onboarding', () => {
    const req = makeRequest('/pills');
    const res = middleware(req);
    const location = res.headers.get('location');
    expect(location).not.toBeNull();
    expect(location).toContain('/onboarding');
  });

  it('request to /onboarding without sid cookie passes through (not guarded)', () => {
    const req = makeRequest('/onboarding');
    const res = middleware(req);
    expect(res.headers.get('location')).toBeNull();
    expect(res.status).toBe(200);
  });

  it('request to /api/health without sid cookie passes through (not guarded)', () => {
    const req = makeRequest('/api/health');
    const res = middleware(req);
    expect(res.headers.get('location')).toBeNull();
    expect(res.status).toBe(200);
  });
});
