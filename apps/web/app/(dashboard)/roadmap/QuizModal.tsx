'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type QuizData = {
  topicId: string;
  question: string;
  options: string[];
};

type SubmitStatus = 'idle' | 'submitting' | 'passed' | 'failed';

type QuizModalProps = {
  topicId: string;
  onClose: () => void;
};

export default function QuizModal({ topicId, onClose }: QuizModalProps) {
  const router = useRouter();
  const [quiz, setQuiz] = useState<QuizData | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [status, setStatus] = useState<SubmitStatus>('idle');
  const [unlocked, setUnlocked] = useState<string[]>([]);

  useEffect(() => {
    fetch(`/api/validations/${topicId}`)
      .then((res) => res.json())
      .then((data: QuizData) => setQuiz(data))
      .catch(() => {
        // silently fail — modal stays blank
      });
  }, [topicId]);

  async function handleSubmit() {
    if (selectedIndex === null || !quiz) return;
    setStatus('submitting');

    try {
      const res = await fetch(`/api/validations/${topicId}/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answerIndex: selectedIndex }),
      });
      const data = await res.json() as { passed: boolean; unlocked?: string[]; alreadyMastered?: boolean };

      if (data.passed) {
        setUnlocked(data.unlocked ?? []);
        setStatus('passed');
      } else {
        setStatus('failed');
      }
    } catch {
      setStatus('failed');
    }
  }

  function handleClose() {
    router.refresh();
    onClose();
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
          borderRadius: '8px',
          padding: '24px',
          maxWidth: '480px',
          width: '100%',
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        }}
      >
        {!quiz ? (
          <p style={{ textAlign: 'center', color: '#6b7280' }}>Loading quiz...</p>
        ) : status === 'passed' ? (
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '24px', marginBottom: '8px' }}>Mastered!</p>
            {unlocked.length > 0 && (
              <p style={{ color: '#6b7280', marginBottom: '16px' }}>
                Unlocked: {unlocked.join(', ')}
              </p>
            )}
            <button
              onClick={handleClose}
              style={{
                padding: '8px 16px',
                backgroundColor: '#2563eb',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <h2 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px' }}>
              {quiz.question}
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
              {quiz.options.map((option, idx) => (
                <label
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    cursor: 'pointer',
                    padding: '8px',
                    borderRadius: '4px',
                    border: selectedIndex === idx ? '2px solid #2563eb' : '2px solid #e5e7eb',
                  }}
                >
                  <input
                    type="radio"
                    name="quiz-option"
                    value={idx}
                    checked={selectedIndex === idx}
                    onChange={() => setSelectedIndex(idx)}
                  />
                  {option}
                </label>
              ))}
            </div>

            {status === 'failed' && (
              <p style={{ color: '#dc2626', marginBottom: '12px' }}>
                Incorrect — try again
              </p>
            )}

            <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
              <button
                onClick={onClose}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#f3f4f6',
                  color: '#374151',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={selectedIndex === null || status === 'submitting'}
                style={{
                  padding: '8px 16px',
                  backgroundColor: selectedIndex === null || status === 'submitting' ? '#9ca3af' : '#2563eb',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: selectedIndex === null || status === 'submitting' ? 'not-allowed' : 'pointer',
                }}
              >
                {status === 'submitting' ? 'Submitting...' : 'Submit'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
