export const dynamic = 'force-dynamic';

import { redirect } from 'next/navigation';
import dynamicImport from 'next/dynamic';
import type { Node, Edge } from '@xyflow/react';
import { prisma } from '@elite/db';
import { getSessionUserId } from '@/lib/session';

const ReactFlowCanvas = dynamicImport(() => import('./ReactFlowCanvas'), { ssr: false });

type NodeState = 'locked' | 'available' | 'in_progress' | 'mastered';

export default async function RoadmapPage() {
  const userId = await getSessionUserId();

  if (!userId) {
    redirect('/onboarding');
  }

  const topics = await prisma.topic.findMany();
  const nodeProgress = await prisma.nodeProgress.findMany({
    where: { userId },
  });
  const customNodes = await prisma.customNode.findMany({
    where: { userId },
  });

  const progressMap = new Map(
    nodeProgress.map((p) => [p.topicId, p.state as NodeState]),
  );

  const nodes: Node[] = topics.map((topic) => {
    const deps = JSON.parse(topic.dependsOn) as string[];
    const isRoot = deps.length === 0;
    const state: NodeState =
      progressMap.get(topic.id) ?? (isRoot ? 'available' : 'locked');

    return {
      id: topic.id,
      type: 'topicNode',
      data: {
        title: topic.title,
        state,
        estimatedHours: topic.estimatedHours,
        topicId: topic.id,
      },
      position: { x: 0, y: 0 },
    };
  });

  const customFlowNodes: Node[] = customNodes.map((cn) => {
    const deps = JSON.parse(cn.dependsOn) as string[];
    const depTitles = deps
      .map((depId) => topics.find((t) => t.id === depId))
      .filter(Boolean)
      .map((t) => t!.title);
    return {
      id: `custom-${cn.id}`,
      type: 'customNode',
      data: { title: cn.title, customNodeId: cn.id, dependsOnTitles: depTitles },
      position: { x: 0, y: 0 },
    };
  });

  const edges: Edge[] = [];
  for (const topic of topics) {
    const deps = JSON.parse(topic.dependsOn) as string[];
    for (const dep of deps) {
      edges.push({
        id: `${dep}->${topic.id}`,
        source: dep,
        target: topic.id,
      });
    }
  }

  for (const cn of customNodes) {
    const deps = JSON.parse(cn.dependsOn) as string[];
    for (const dep of deps) {
      edges.push({
        id: `${dep}->custom-${cn.id}`,
        source: dep,
        target: `custom-${cn.id}`,
        style: { strokeDasharray: '4 2' },
      });
    }
  }

  const topicList = topics.map((t) => ({ id: t.id, title: t.title }));

  return (
    <div style={{ height: 'calc(100vh - 56px)', width: '100%' }}>
      <ReactFlowCanvas
        initialNodes={[...nodes, ...customFlowNodes]}
        initialEdges={[...edges]}
        topics={topicList}
      />
    </div>
  );
}