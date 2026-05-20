export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { prisma } from '@elite/db';
import { getSessionUserId } from '@/lib/session';

type NodeState = 'locked' | 'available' | 'in_progress' | 'mastered';

type RoadmapNode = {
  id: string;
  type: 'topicNode';
  data: { title: string; state: NodeState; estimatedHours: number };
  position: { x: number; y: number };
};

type RoadmapEdge = {
  id: string;
  source: string;
  target: string;
};

export async function GET() {
  const userId = await getSessionUserId();

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const topics = await prisma.topic.findMany();

  const progressRows = await prisma.nodeProgress.findMany({ where: { userId } });

  const progressMap = new Map(progressRows.map((p) => [p.topicId, p.state as NodeState]));

  const nodes: RoadmapNode[] = topics.map((topic) => {
    const deps = JSON.parse(topic.dependsOn) as string[];
    const isRoot = deps.length === 0;
    const state = progressMap.get(topic.id) ?? (isRoot ? 'available' : 'locked');

    return {
      id: topic.id,
      type: 'topicNode',
      data: {
        title: topic.title,
        state,
        estimatedHours: topic.estimatedHours,
      },
      position: { x: 0, y: 0 },
    };
  });

  const edges: RoadmapEdge[] = [];
  for (const topic of topics) {
    const deps = JSON.parse(topic.dependsOn) as string[];
    for (const dep of deps) {
      edges.push({ id: `${dep}->${topic.id}`, source: dep, target: topic.id });
    }
  }

  return NextResponse.json({ nodes, edges });
}
