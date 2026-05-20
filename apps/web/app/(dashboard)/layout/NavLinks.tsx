'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

const links = [
  { href: '/roadmap', label: '🗺 Roadmap' },
  { href: '/pills', label: '🧠 Daily Review' },
];

export default function NavLinks() {
  const pathname = usePathname();
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  async function handleLogout() {
    setLoggingOut(true);
    try {
      await fetch('/api/logout', { method: 'POST' });
    } finally {
      router.push('/onboarding');
      router.refresh();
      setLoggingOut(false);
    }
  }

  return (
    <>
      {links.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          className={`text-sm px-3 py-1 rounded transition-colors ${
            pathname === href
              ? 'bg-slate-700 text-white'
              : 'text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
        >
          {label}
        </Link>
      ))}
      <button
        onClick={handleLogout}
        disabled={loggingOut}
        className="ml-auto text-sm text-slate-400 hover:text-white disabled:opacity-50 transition-colors px-3 py-1"
      >
        {loggingOut ? 'Logging out...' : 'Logout'}
      </button>
    </>
  );
}
