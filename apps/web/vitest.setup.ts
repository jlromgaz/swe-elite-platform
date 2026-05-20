import { vi } from 'vitest';
import { prisma } from '@elite/db';

// Global mock for @/lib/session.
// In tests, getSessionUserId() falls back to prisma.user.findFirst() so that API
// route test files (which seed exactly one user in beforeEach) work without a real
// Next.js request context and without setting a cookie.
// setSessionCookie() is a no-op — no cookie store exists in the test environment.
vi.mock('@/lib/session', () => ({
  getSessionUserId: async () => {
    const user = await prisma.user.findFirst();
    return user?.id ?? null;
  },
  setSessionCookie: vi.fn(),
}));
