'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type QuizQuestion = {
  question: string;
  options: string[];
};

type QuizData = {
  topicId: string;
  questions: QuizQuestion[];
};

type SubmitStatus = 'idle' | 'submitting' | 'passed' | 'failed';

type QuizModalProps = {
  topicId: string;
  onClose: () => void;
};

export default function QuizModal({ topicId, onClose }: QuizModalProps) {
  const router = useRouter();
  const [quiz, setQuiz] = useState<QuizData | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [status, setStatus] = useState<SubmitStatus>('idle');
  const [notFound, setNotFound] = useState(false);
  const [finalScore, setFinalScore] = useState<number | null>(null);

  useEffect(() => {
    fetch(`/api/validations/${topicId}`)
      .then((res) => {
        if (!res.ok) {
          setNotFound(true);
          return null;
        }
        return res.json();
      })
      .then((data: QuizData | null) => {
        if (data && data.questions && data.questions.length > 0) {
          setQuiz(data);
          setAnswers(new Array(data.questions.length).fill(-1));
        } else {
          setNotFound(true);
        }
      })
      .catch(() => {
        setNotFound(true);
      });
  }, [topicId]);

  async function handleSubmit() {
    if (!quiz || answers.includes(-1)) return;
    setStatus('submitting');

    try {
      const res = await fetch(`/api/validations/${topicId}/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers }),
      });
      const data = await res.json() as { passed: boolean; score?: number; alreadyMastered?: boolean };

      setFinalScore(data.score ?? 0);
      if (data.passed) {
        setStatus('passed');
      } else {
        setStatus('failed');
      }
    } catch {
      setStatus('failed');
      setFinalScore(0);
    }
  }

  function handleClose() {
    router.refresh();
    onClose();
  }

  function selectAnswer(optionIdx: number) {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIdx] = optionIdx;
    setAnswers(newAnswers);
  }

  function handleNext() {
    if (currentQuestionIdx < (quiz?.questions.length ?? 0) - 1) {
      setCurrentQuestionIdx(prev => prev + 1);
    }
  }

  function handlePrev() {
    if (currentQuestionIdx > 0) {
      setCurrentQuestionIdx(prev => prev - 1);
    }
  }

  const currentQ = quiz?.questions[currentQuestionIdx];
  const isLastQuestion = currentQuestionIdx === (quiz?.questions.length ?? 0) - 1;
  const hasAnsweredCurrent = answers[currentQuestionIdx] !== -1;
  const hasAnsweredAll = answers.every(a => a !== -1);

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
          maxWidth: '560px',
          width: '100%',
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        }}
      >
        {!quiz ? (
          notFound ? (
            <div style={{ textAlign: 'center' }}>
              <p style={{ color: '#6b7280', marginBottom: '16px' }}>
                Validation quiz not yet available for this topic.
              </p>
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
                Close
              </button>
            </div>
          ) : (
            <p style={{ textAlign: 'center', color: '#6b7280' }}>Loading quiz...</p>
          )
        ) : status === 'passed' || status === 'failed' ? (
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '24px', marginBottom: '8px' }}>
              {status === 'passed' ? '🎉 Mastered!' : '❌ Failed'}
            </p>
            <p style={{ fontSize: '18px', color: status === 'passed' ? '#16a34a' : '#dc2626', marginBottom: '16px' }}>
              Score: {finalScore}%
            </p>
            {status === 'failed' && (
              <p style={{ color: '#6b7280', marginBottom: '16px', fontSize: '14px' }}>
                You need 70% to pass. Review the materials and try again!
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
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
              <span style={{ color: '#6b7280', fontSize: '14px' }}>
                Question {currentQuestionIdx + 1} of {quiz.questions.length}
              </span>
              <span style={{ color: '#6b7280', fontSize: '14px' }}>
                Passing: 70%
              </span>
            </div>
            
            <h2 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '20px' }}>
              {currentQ?.question}
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
              {currentQ?.options.map((option, idx) => {
                const isSelected = answers[currentQuestionIdx] === idx;
                return (
                  <label
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      cursor: 'pointer',
                      padding: '12px',
                      borderRadius: '4px',
                      border: isSelected ? '2px solid #2563eb' : '2px solid #e5e7eb',
                      backgroundColor: isSelected ? '#eff6ff' : 'transparent',
                    }}
                  >
                    <input
                      type="radio"
                      name={`quiz-option-${currentQuestionIdx}`}
                      value={idx}
                      checked={isSelected}
                      onChange={() => selectAnswer(idx)}
                    />
                    {option}
                  </label>
                );
              })}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button
                onClick={handlePrev}
                disabled={currentQuestionIdx === 0}
                style={{
                  padding: '8px 16px',
                  backgroundColor: currentQuestionIdx === 0 ? 'transparent' : '#f3f4f6',
                  color: currentQuestionIdx === 0 ? 'transparent' : '#374151',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: currentQuestionIdx === 0 ? 'default' : 'pointer',
                }}
              >
                Previous
              </button>
              
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={onClose}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: 'transparent',
                    color: '#6b7280',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                >
                  Cancel
                </button>
                
                {isLastQuestion ? (
                  <button
                    onClick={handleSubmit}
                    disabled={!hasAnsweredAll || status === 'submitting'}
                    style={{
                      padding: '8px 16px',
                      backgroundColor: !hasAnsweredAll || status === 'submitting' ? '#9ca3af' : '#2563eb',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: !hasAnsweredAll || status === 'submitting' ? 'not-allowed' : 'pointer',
                    }}
                  >
                    {status === 'submitting' ? 'Submitting...' : 'Submit Exam'}
                  </button>
                ) : (
                  <button
                    onClick={handleNext}
                    disabled={!hasAnsweredCurrent}
                    style={{
                      padding: '8px 16px',
                      backgroundColor: !hasAnsweredCurrent ? '#9ca3af' : '#2563eb',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: !hasAnsweredCurrent ? 'not-allowed' : 'pointer',
                    }}
                  >
                    Next
                  </button>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
