import { redirect } from 'next/navigation';
import { prisma } from '@elite/db';

export default async function Home() {
  const user = await prisma.user.findFirst();
  redirect(user ? '/roadmap' : '/onboarding');
}
