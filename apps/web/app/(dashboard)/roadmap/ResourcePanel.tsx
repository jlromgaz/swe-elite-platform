'use client';

import { useEffect, useState } from 'react';
import { groupResources, type ResourceGroup } from './groupResources';

type ResourcePanelProps = {
  topicId: string;
  title?: string;
  estimatedHours?: number;
  nodeState: 'available' | 'in_progress' | 'mastered';
  onClose: () => void;
  onQuiz: (topicId: string) => void;
  onStart: (topicId: string) => void;
};

type ResourceData = {
  id: string;
  type: string;
  title: string;
  url: string;
  locale: string;
  durationMin: number | null;
  quality: number;
};

export default function ResourcePanel({
  topicId,
  title,
  estimatedHours,
  nodeState,
  onClose,
  onQuiz,
  onStart,
}: ResourcePanelProps) {
  const [groups, setGroups] = useState<ResourceGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    fetch(`/api/resources/${topicId}`)
      .then((res) => {
        if (!res.ok) {
          setNotFound(true);
          return null;
        }
        return res.json() as Promise<{ resources: ResourceData[] }>;
      })
      .then((data) => {
        if (data) {
          setGroups(groupResources(data.resources));
        }
        setLoading(false);
      })
      .catch(() => {
        setNotFound(true);
        setLoading(false);
      });
  }, [topicId]);

  function handleStart() {
    onStart(topicId);
  }

  function handleQuiz() {
    onQuiz(topicId);
  }

  function handleClose() {
    onClose();
  }

  function handleBackdropClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  }

  return (
    <div
      onClick={handleBackdropClick}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 40,
      }}
    >
      <div
        style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          padding: '24px',
          maxWidth: '560px',
          width: '100%',
          maxHeight: '80vh',
          overflowY: 'auto',
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        }}
      >
        {title && (
          <div style={{ marginBottom: '16px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#111827', margin: 0 }}>
              {title}
            </h2>
            {estimatedHours != null && (
              <p style={{ fontSize: '13px', color: '#6b7280', margin: '4px 0 0' }}>
                {estimatedHours} estimated hours
              </p>
            )}
          </div>
        )}
        {loading ? (
          <p style={{ textAlign: 'center', color: '#6b7280' }}>Loading resources…</p>
        ) : notFound ? (
          <div style={{ textAlign: 'center' }}>
            <p style={{ color: '#6b7280', marginBottom: '16px' }}>
              Topic not found.
            </p>
            <button
              onClick={handleClose}
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
        ) : groups.length === 0 ? (
          <div style={{ textAlign: 'center' }}>
            <p style={{ color: '#6b7280', marginBottom: '16px' }}>
              No resources yet
            </p>
            {nodeState === 'available' && (
              <button
                onClick={handleStart}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#2563eb',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                Start Topic
              </button>
            )}
            <button
              onClick={handleClose}
              style={{
                padding: '8px 16px',
                backgroundColor: '#f3f4f6',
                color: '#374151',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                marginLeft: nodeState === 'available' ? '8px' : '0',
              }}
            >
              Close
            </button>
          </div>
        ) : (
          <>
            {groups.map((group) => (
              <div key={group.label} style={{ marginBottom: '20px' }}>
                <h3 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '8px', color: '#374151' }}>
                  {group.label}
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {group.resources.map((r) => (
                    <a
                      key={r.id}
                      href={r.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'block',
                        padding: '8px 12px',
                        borderRadius: '4px',
                        border: '1px solid #e5e7eb',
                        textDecoration: 'none',
                        color: '#1f2937',
                      }}
                    >
                      <span style={{ fontWeight: 500 }}>{r.title}</span>
                      {r.durationMin && (
                        <span style={{ color: '#6b7280', marginLeft: '8px' }}>
                          {r.durationMin} min
                        </span>
                      )}
                      <span style={{ color: '#9ca3af', marginLeft: '8px' }}>
                        ★ {r.quality}/10
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            ))}

            <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', marginTop: '16px' }}>
              {nodeState === 'available' && (
                <button
                  onClick={handleStart}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: '#2563eb',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                >
                  Start Topic
                </button>
              )}
              {nodeState === 'in_progress' && (
                <button
                  onClick={handleQuiz}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: '#2563eb',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                >
                  Validate Mastery
                </button>
              )}
              <button
                onClick={handleClose}
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
          </>
        )}
      </div>
    </div>
  );
}