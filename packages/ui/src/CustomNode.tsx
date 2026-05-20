'use client';

import { Handle, Position } from '@xyflow/react';

type CustomNodeData = {
  title: string;
  customNodeId?: string;
};

type CustomNodeProps = {
  data: CustomNodeData;
};

export function CustomNode({ data }: CustomNodeProps) {
  return (
    <div
      style={{
        border: '2px dashed #9ca3af',
        borderRadius: 8,
        padding: '10px 14px',
        background: '#f9fafb',
        minWidth: 120,
      }}
    >
      <Handle type="target" position={Position.Left} />
      <span style={{ fontSize: 13, color: '#6b7280' }}>⭐ {data.title}</span>
      <Handle type="source" position={Position.Right} />
    </div>
  );
}