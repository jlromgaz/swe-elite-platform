import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'SWE Elite Platform',
  description: 'Top 1% Software Engineering Learning Platform',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50">{children}</body>
    </html>
  );
}
