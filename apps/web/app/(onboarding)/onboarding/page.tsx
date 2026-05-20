'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function OnboardingPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const form = e.currentTarget;
    const data = {
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      currentRole: (form.elements.namedItem('currentRole') as HTMLInputElement).value,
      yearsExp: Number((form.elements.namedItem('yearsExp') as HTMLInputElement).value),
      targetRole: (form.elements.namedItem('targetRole') as HTMLInputElement).value,
      goalDeadline: (form.elements.namedItem('goalDeadline') as HTMLInputElement).value,
    };

    try {
      const res = await fetch('/api/onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.status === 201) {
        router.push('/roadmap');
        return;
      }

      const body = await res.json().catch(() => ({}));

      if (res.status === 409) {
        setError('An account with this email already exists.');
      } else if (res.status === 400) {
        setError(body.error ?? 'Invalid request. Please check your inputs.');
      } else {
        setError(body.error ?? 'Something went wrong. Please try again.');
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-md w-full max-w-md p-8">
        <h1 className="text-2xl font-bold text-slate-900 mb-6">Get Started</h1>

        {error && (
          <div className="mb-4 rounded bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-sm font-medium text-slate-700">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-500"
              placeholder="you@example.com"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="currentRole" className="text-sm font-medium text-slate-700">
              Current Role
            </label>
            <input
              id="currentRole"
              name="currentRole"
              type="text"
              required
              className="border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-500"
              placeholder="e.g. Junior Software Engineer"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="yearsExp" className="text-sm font-medium text-slate-700">
              Years of Experience
            </label>
            <input
              id="yearsExp"
              name="yearsExp"
              type="number"
              required
              min="0"
              max="50"
              className="border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-500"
              placeholder="2"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="targetRole" className="text-sm font-medium text-slate-700">
              Target Role
            </label>
            <input
              id="targetRole"
              name="targetRole"
              type="text"
              required
              className="border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-500"
              placeholder="e.g. Senior Software Engineer"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="goalDeadline" className="text-sm font-medium text-slate-700">
              Goal Deadline
            </label>
            <input
              id="goalDeadline"
              name="goalDeadline"
              type="date"
              required
              className="border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-500"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="mt-2 bg-slate-900 text-white text-sm font-semibold rounded px-4 py-2 hover:bg-slate-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? 'Saving…' : 'Start My Journey'}
          </button>
        </form>
      </div>
    </main>
  );
}
