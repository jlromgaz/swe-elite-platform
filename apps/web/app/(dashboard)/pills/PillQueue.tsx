'use client';

import { useState } from 'react';
import { PillCard } from '@elite/ui';

type PillItem = {
  pillId: string;
  topicId: string;
  content: string;
  topicTitle: string;
};

type PillQueueProps = {
  pills: PillItem[];
};

export default function PillQueue({ pills }: PillQueueProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  if (pills.length === 0 || currentIndex >= pills.length) {
    return (
      <div
        style={{
          textAlign: 'center',
          padding: '60px 24px',
          color: '#6b7280',
          fontSize: 16,
        }}
      >
        All caught up! Check back tomorrow.
      </div>
    );
  }

  const current = pills[currentIndex];

  async function handleScore(score: 1 | 2 | 3) {
    setSubmitting(true);
    try {
      await fetch(`/api/pills/${current.pillId}/review`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ score }),
      });
    } finally {
      setSubmitting(false);
      setCurrentIndex((idx) => idx + 1);
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, padding: '32px 16px' }}>
      <div style={{ fontSize: 13, color: '#6b7280' }}>
        {currentIndex + 1} / {pills.length}
      </div>
      <PillCard
        pillId={current.pillId}
        content={current.content}
        topicTitle={current.topicTitle}
        onScore={handleScore}
        disabled={submitting}
      />
    </div>
  );
}
