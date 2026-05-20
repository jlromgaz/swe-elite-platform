'use client';

import '@xyflow/react/dist/style.css';

import { useLayoutEffect, useState, useCallback, useMemo } from 'react';
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
import { TopicNode, CustomNode } from '@elite/ui';
import QuizModal from './QuizModal';
import AddNodeModal from './AddNodeModal';
import ResourcePanel from './ResourcePanel';

const NODE_WIDTH = 172;
const NODE_HEIGHT = 80;

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
  topics: { id: string; title: string }[];
};

export default function ReactFlowCanvas({
  initialNodes,
  initialEdges,
  topics,
}: ReactFlowCanvasProps) {
  const router = useRouter();
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);
  const [ready, setReady] = useState(false);
  const [quizTopicId, setQuizTopicId] = useState<string | null>(null);
  const [resourceTopicId, setResourceTopicId] = useState<{ id: string; state: string; title?: string; estimatedHours?: number } | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const handleReset = useCallback(
    async (topicId: string) => {
      await fetch(`/api/roadmap/${topicId}/reset`, { method: 'POST' });
      router.refresh();
    },
    [router],
  );

  const TopicNodeWithReset = useCallback(
    (props: any) => {
      const isMastered = props.data?.state === 'mastered';
      return (
        <TopicNode
          {...props}
          data={{
            ...props.data,
            onReset: isMastered ? handleReset : undefined,
          }}
        />
      );
    },
    [handleReset],
  );

  const nodeTypes = useMemo(
    () => ({
      topicNode: TopicNodeWithReset,
      customNode: CustomNode,
    }),
    [TopicNodeWithReset],
  );

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
    (_event, node) => {
      if (node.type === 'customNode') return;

      const data = node.data as {
        state: string;
        topicId?: string;
        title?: string;
        estimatedHours?: number;
      };
      const topicId = (data.topicId as string | undefined) ?? node.id;
      const state = data.state as string;

      if (state === 'locked') return;

      setResourceTopicId({ id: topicId, state, title: data.title, estimatedHours: data.estimatedHours });
    },
    [],
  );

  const handleStart = useCallback(
    async (topicId: string) => {
      await fetch(`/api/roadmap/${topicId}/start`, { method: 'POST' });
      router.refresh();
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
        position: 'relative',
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
      {resourceTopicId && (
        <ResourcePanel
          topicId={resourceTopicId.id}
          title={resourceTopicId.title}
          estimatedHours={resourceTopicId.estimatedHours}
          nodeState={resourceTopicId.state as 'available' | 'in_progress' | 'mastered'}
          onClose={() => {
            setResourceTopicId(null);
            router.refresh();
          }}
          onQuiz={setQuizTopicId}
          onStart={handleStart}
        />
      )}
      {quizTopicId && (
        <QuizModal topicId={quizTopicId} onClose={() => setQuizTopicId(null)} />
      )}
      <button
        onClick={() => setShowAddModal(true)}
        style={{
          position: 'absolute',
          bottom: 16,
          right: 16,
          zIndex: 10,
          backgroundColor: '#2563eb',
          color: 'white',
          padding: '8px 16px',
          borderRadius: 8,
          border: 'none',
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          cursor: 'pointer',
          fontSize: 14,
          fontWeight: 500,
        }}
      >
        + Add Node
      </button>
      {showAddModal && (
        <AddNodeModal
          topics={topics}
          onClose={() => setShowAddModal(false)}
          onCreated={() => {
            setShowAddModal(false);
            router.refresh();
          }}
        />
      )}
    </div>
  );
}