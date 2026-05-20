export const dynamic = 'force-dynamic';

import { redirect } from 'next/navigation';
import { getSessionUserId } from '@/lib/session';

export default async function Home() {
  const userId = getSessionUserId();
  redirect(userId ? '/roadmap' : '/onboarding');
}
