export const dynamic = 'force-dynamic';

import { redirect } from 'next/navigation';
import { getSessionUserId } from '@/lib/session';

export default async function Home() {
  const userId = await getSessionUserId();
  redirect(userId ? '/roadmap' : '/onboarding');
}
