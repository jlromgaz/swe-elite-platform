import { cookies } from 'next/headers';

const COOKIE_NAME = 'sid';
const MAX_AGE = 60 * 60 * 24 * 30; // 30 days

const COOKIE_OPTIONS = {
  httpOnly: true,
  sameSite: 'lax' as const,
  path: '/',
  secure: process.env.NODE_ENV === 'production',
};

export function setSessionCookie(userId: string): void {
  cookies().set(COOKIE_NAME, userId, { ...COOKIE_OPTIONS, maxAge: MAX_AGE });
}

export function clearSessionCookie(): void {
  cookies().set(COOKIE_NAME, '', { ...COOKIE_OPTIONS, maxAge: 0 });
}

export async function getSessionUserId(): Promise<string | null> {
  return cookies().get(COOKIE_NAME)?.value ?? null;
}
