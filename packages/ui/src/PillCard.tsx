'use client';

export type PillCardProps = {
  pillId: string;
  content: string;
  topicTitle: string;
  onScore: (score: 1 | 2 | 3) => void;
  disabled?: boolean;
};

function PillCard({ content, topicTitle, onScore, disabled = false }: PillCardProps) {
  return (
    <div
      style={{
        border: '1px solid #d1d5db',
        borderRadius: 8,
        padding: '20px 24px',
        background: '#fff',
        maxWidth: 520,
        boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
      }}
    >
      <span
        style={{
          display: 'inline-block',
          background: '#3b82f6',
          color: '#fff',
          fontSize: 11,
          borderRadius: 4,
          padding: '2px 8px',
          marginBottom: 12,
          fontWeight: 600,
        }}
      >
        {topicTitle}
      </span>

      <p style={{ fontSize: 15, lineHeight: 1.6, color: '#111827', margin: '0 0 20px' }}>
        {content}
      </p>

      <div style={{ display: 'flex', gap: 10 }}>
        <button
          disabled={disabled}
          onClick={() => onScore(1)}
          style={{
            flex: 1,
            padding: '8px 0',
            borderRadius: 6,
            border: 'none',
            background: disabled ? '#f3f4f6' : '#ef4444',
            color: disabled ? '#9ca3af' : '#fff',
            fontWeight: 600,
            cursor: disabled ? 'not-allowed' : 'pointer',
            fontSize: 14,
          }}
        >
          Fail
        </button>

        <button
          disabled={disabled}
          onClick={() => onScore(2)}
          style={{
            flex: 1,
            padding: '8px 0',
            borderRadius: 6,
            border: 'none',
            background: disabled ? '#f3f4f6' : '#eab308',
            color: disabled ? '#9ca3af' : '#000',
            fontWeight: 600,
            cursor: disabled ? 'not-allowed' : 'pointer',
            fontSize: 14,
          }}
        >
          Hard
        </button>

        <button
          disabled={disabled}
          onClick={() => onScore(3)}
          style={{
            flex: 1,
            padding: '8px 0',
            borderRadius: 6,
            border: 'none',
            background: disabled ? '#f3f4f6' : '#22c55e',
            color: disabled ? '#9ca3af' : '#fff',
            fontWeight: 600,
            cursor: disabled ? 'not-allowed' : 'pointer',
            fontSize: 14,
          }}
        >
          Easy
        </button>
      </div>
    </div>
  );
}

export default PillCard;
