'use client';

import { Handle, Position } from '@xyflow/react';

type CustomNodeData = {
  title: string;
  customNodeId?: string;
  dependsOnTitles?: string[];
};

type CustomNodeProps = {
  data: CustomNodeData;
};

export function CustomNode({ data }: CustomNodeProps) {
  const deps = data.dependsOnTitles ?? [];

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
      {deps.length > 0 && (
        <div style={{ marginTop: 6, borderTop: '1px dashed #d1d5db', paddingTop: 4 }}>
          {deps.map((dep) => (
            <div key={dep} style={{ fontSize: 11, color: '#9ca3af' }}>
              ← {dep}
            </div>
          ))}
        </div>
      )}
      <Handle type="source" position={Position.Right} />
    </div>
  );
}