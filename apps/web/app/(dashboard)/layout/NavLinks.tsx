'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/roadmap', label: '🗺 Roadmap' },
  { href: '/pills', label: '🧠 Daily Review' },
];

export default function NavLinks() {
  const pathname = usePathname();
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
    </>
  );
}
