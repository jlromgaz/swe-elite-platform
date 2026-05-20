import { describe, it, expect, vi, beforeEach } from 'vitest';

// Unmock @/lib/session so we test the real implementation (global setup mocks it).
vi.unmock('@/lib/session');

// Mock next/headers before importing session helpers
const mockSet = vi.fn();
const mockGet = vi.fn();

vi.mock('next/headers', () => ({
  cookies: vi.fn(() => ({
    set: mockSet,
    get: mockGet,
  })),
}));

// Import after mocks are set up
const { setSessionCookie, getSessionUserId } = await import('./session');

describe('session helpers', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('setSessionCookie', () => {
    it('sets a cookie named "sid" with the userId value', () => {
      const userId = 'user-abc-123';
      setSessionCookie(userId);
      expect(mockSet).toHaveBeenCalledOnce();
      const [name, value, options] = mockSet.mock.calls[0];
      expect(name).toBe('sid');
      expect(value).toBe(userId);
      expect(options.httpOnly).toBe(true);
      expect(options.sameSite).toBe('lax');
      expect(options.path).toBe('/');
      expect(typeof options.maxAge).toBe('number');
    });
  });

  describe('getSessionUserId', () => {
    it('returns the value of the "sid" cookie when present', async () => {
      mockGet.mockReturnValue({ name: 'sid', value: 'user-xyz-456' });
      const result = await getSessionUserId();
      expect(result).toBe('user-xyz-456');
      expect(mockGet).toHaveBeenCalledWith('sid');
    });

    it('returns null when sid cookie is absent', async () => {
      mockGet.mockReturnValue(undefined);
      const result = await getSessionUserId();
      expect(result).toBeNull();
    });
  });
});
