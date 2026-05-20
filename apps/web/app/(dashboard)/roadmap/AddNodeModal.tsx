'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

type AddNodeModalProps = {
  topics: { id: string; title: string }[];
  onClose: () => void;
  onCreated: () => void;
};

export default function AddNodeModal({ topics, onClose, onCreated }: AddNodeModalProps) {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [selectedDeps, setSelectedDeps] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleCreate() {
    if (!title.trim()) {
      setError('Title is required');
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch('/api/roadmap/custom-nodes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: title.trim(), dependsOn: selectedDeps }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || 'Failed to create node');
        setSubmitting(false);
        return;
      }

      onCreated();
      router.refresh();
    } catch {
      setError('Network error');
      setSubmitting(false);
    }
  }

  function toggleDep(id: string) {
    setSelectedDeps((prev) =>
      prev.includes(id) ? prev.filter((d) => d !== id) : [...prev, id]
    );
  }

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 50,
      }}
    >
      <div
        style={{
          backgroundColor: 'white',
          borderRadius: 8,
          padding: 24,
          maxWidth: 480,
          width: '100%',
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        }}
      >
        <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>
          Add Custom Node
        </h2>

        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', fontSize: 13, marginBottom: 4, fontWeight: 500 }}>
            Node name *
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Practice LeetCode"
            maxLength={100}
            style={{
              width: '100%',
              padding: '8px 12px',
              border: '1px solid #d1d5db',
              borderRadius: 4,
              fontSize: 14,
              boxSizing: 'border-box',
            }}
          />
        </div>

        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', fontSize: 13, marginBottom: 4, fontWeight: 500 }}>
            Link to topics (optional)
          </label>
          <div style={{ maxHeight: 200, overflowY: 'auto', border: '1px solid #e5e7eb', borderRadius: 4, padding: 8 }}>
            {topics.map((topic) => (
              <label
                key={topic.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  cursor: 'pointer',
                  padding: '4px 0',
                  fontSize: 13,
                }}
              >
                <input
                  type="checkbox"
                  checked={selectedDeps.includes(topic.id)}
                  onChange={() => toggleDep(topic.id)}
                />
                {topic.title}
              </label>
            ))}
          </div>
        </div>

        {error && (
          <p style={{ color: '#dc2626', fontSize: 13, marginBottom: 12 }}>{error}</p>
        )}

        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
          <button
            onClick={onClose}
            style={{
              padding: '8px 16px',
              backgroundColor: '#f3f4f6',
              color: '#374151',
              border: 'none',
              borderRadius: 4,
              cursor: 'pointer',
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleCreate}
            disabled={submitting || !title.trim()}
            style={{
              padding: '8px 16px',
              backgroundColor: submitting || !title.trim() ? '#9ca3af' : '#2563eb',
              color: 'white',
              border: 'none',
              borderRadius: 4,
              cursor: submitting || !title.trim() ? 'not-allowed' : 'pointer',
            }}
          >
            {submitting ? 'Creating...' : 'Create'}
          </button>
        </div>
      </div>
    </div>
  );
}