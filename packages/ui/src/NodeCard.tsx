'use client';

import { Handle, Position, type NodeProps } from '@xyflow/react';

export type NodeState = 'locked' | 'available' | 'in_progress' | 'mastered';

export type TopicNodeData = {
  title: string;
  state: NodeState;
  estimatedHours: number;
  topicId?: string;
  onReset?: (topicId: string) => void;
};

const BADGE_BG: Record<NodeState, string> = {
  locked: '#6b7280',
  available: '#3b82f6',
  in_progress: '#eab308',
  mastered: '#22c55e',
};

const BADGE_COLOR: Record<NodeState, string> = {
  locked: '#fff',
  available: '#fff',
  in_progress: '#000',
  mastered: '#fff',
};

const BADGE_LABEL: Record<NodeState, string> = {
  locked: 'Locked',
  available: 'Available',
  in_progress: 'In Progress',
  mastered: 'Mastered',
};

export type TopicNodeProps = NodeProps & { data: TopicNodeData };

function NodeCard({ data }: TopicNodeProps) {
  const { title, state, estimatedHours, topicId, onReset } = data;

  return (
    <div
      style={{
        border: '1px solid #d1d5db',
        borderRadius: 8,
        padding: '10px 14px',
        background: '#fff',
        minWidth: 160,
        boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
        position: 'relative',
      }}
    >
      <Handle type="target" position={Position.Left} />

      {state === 'mastered' && onReset && topicId && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onReset(topicId);
          }}
          style={{
            position: 'absolute',
            top: 4,
            right: 4,
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: 14,
            color: '#9ca3af',
            padding: '0 4px',
            lineHeight: 1,
          }}
          title="Reset progress"
          onMouseEnter={(e) => { e.currentTarget.style.color = '#ef4444'; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = '#9ca3af'; }}
        >
          ↩
        </button>
      )}

      <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 6 }}>{title}</div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span
          style={{
            background: BADGE_BG[state],
            color: BADGE_COLOR[state],
            fontSize: 11,
            borderRadius: 4,
            padding: '2px 6px',
          }}
        >
          {BADGE_LABEL[state]}
        </span>
        <span style={{ fontSize: 11, color: '#6b7280' }}>{estimatedHours}h</span>
      </div>

      <Handle type="source" position={Position.Right} />
    </div>
  );
}

export default NodeCard;
export { NodeCard as TopicNode };