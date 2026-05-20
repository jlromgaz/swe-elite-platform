import { cookies } from 'next/headers';

const COOKIE_NAME = 'sid';
const MAX_AGE = 60 * 60 * 24 * 30; // 30 days

export function setSessionCookie(userId: string): void {
  cookies().set(COOKIE_NAME, userId, {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge: MAX_AGE,
    secure: process.env.NODE_ENV === 'production',
  });
}

export async function getSessionUserId(): Promise<string | null> {
  return cookies().get(COOKIE_NAME)?.value ?? null;
}
