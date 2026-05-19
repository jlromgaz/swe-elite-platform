'use client';

import '@xyflow/react/dist/style.css';

import { useLayoutEffect, useState, useCallback } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  useNodesState,
  useEdgesState,
  type Node,
  type Edge,
  type NodeMouseHandler,
} from '@xyflow/react';
import dagre from '@dagrejs/dagre';
import { useRouter } from 'next/navigation';
import { TopicNode } from '@elite/ui';

const NODE_WIDTH = 172;
const NODE_HEIGHT = 80;

const nodeTypes = { topicNode: TopicNode };

function applyDagreLayout(nodes: Node[], edges: Edge[]): Node[] {
  const g = new dagre.graphlib.Graph();
  g.setGraph({ rankdir: 'LR', marginx: 40, marginy: 40 });
  g.setDefaultEdgeLabel(() => ({}));

  for (const node of nodes) {
    g.setNode(node.id, { width: NODE_WIDTH, height: NODE_HEIGHT });
  }
  for (const edge of edges) {
    g.setEdge(edge.source, edge.target);
  }

  dagre.layout(g);

  return nodes.map((node) => {
    const { x, y } = g.node(node.id);
    return {
      ...node,
      position: {
        x: x - NODE_WIDTH / 2,
        y: y - NODE_HEIGHT / 2,
      },
    };
  });
}

type ReactFlowCanvasProps = {
  initialNodes: Node[];
  initialEdges: Edge[];
};

export default function ReactFlowCanvas({
  initialNodes,
  initialEdges,
}: ReactFlowCanvasProps) {
  const router = useRouter();
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);
  const [ready, setReady] = useState(false);

  useLayoutEffect(() => {
    if (initialNodes.length === 0) {
      setReady(true);
      return;
    }
    const laid = applyDagreLayout(initialNodes, initialEdges);
    setNodes(laid);
    setReady(true);
  }, [initialNodes, initialEdges, setNodes]);

  const onNodeClick: NodeMouseHandler = useCallback(
    async (_event, node) => {
      const data = node.data as {
        state: string;
        topicId?: string;
        title?: string;
        estimatedHours?: number;
      };
      const topicId = (data.topicId as string | undefined) ?? node.id;
      const state = data.state as string;

      if (state === 'available') {
        await fetch(`/api/roadmap/${topicId}/start`, { method: 'POST' });
        router.refresh();
      } else if (state === 'in_progress') {
        await fetch(`/api/roadmap/${topicId}/complete`, { method: 'POST' });
        router.refresh();
      }
    },
    [router],
  );

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        opacity: ready ? 1 : 0,
        transition: 'opacity 0.2s ease',
      }}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        onNodeClick={onNodeClick}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}
