export const dynamic = 'force-dynamic';

import { redirect } from 'next/navigation';
import dynamicImport from 'next/dynamic';
import type { Node, Edge } from '@xyflow/react';
import { prisma } from '@elite/db';

const ReactFlowCanvas = dynamicImport(() => import('./ReactFlowCanvas'), { ssr: false });

type NodeState = 'locked' | 'available' | 'in_progress' | 'mastered';

export default async function RoadmapPage() {
  const user = await prisma.user.findFirst();

  if (!user) {
    redirect('/onboarding');
  }

  const topics = await prisma.topic.findMany();
  const nodeProgress = await prisma.nodeProgress.findMany({
    where: { userId: user.id },
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

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <ReactFlowCanvas initialNodes={nodes} initialEdges={edges} />
    </div>
  );
}
