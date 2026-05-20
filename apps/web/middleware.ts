import { NextRequest, NextResponse } from 'next/server';

const PROTECTED_PATHS = ['/roadmap', '/pills'];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isProtected = PROTECTED_PATHS.some(p => pathname.startsWith(p));
  if (!isProtected) return NextResponse.next();
  const sid = req.cookies.get('sid');
  if (!sid?.value) {
    const url = req.nextUrl.clone();
    url.pathname = '/onboarding';
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/roadmap/:path*', '/pills/:path*'],
};
