type NodeState = 'locked' | 'available' | 'in_progress' | 'mastered';

type TopicDep = {
  id: string;
  dependsOn: string; // JSON string of dep IDs
};

/**
 * Given the full topic list, a map of current progress states, and the id of
 * the topic that was just mastered, returns the list of topicIds that should
 * transition from "locked" → "available".
 *
 * Rules:
 *  - A topic becomes available if and only if:
 *    1. Its current state is "locked"
 *    2. It has at least one dependency (non-empty dependsOn)
 *    3. ALL of its dependencies are in the progressMap with state "mastered"
 *       (including the just-mastered topic, which should already be reflected
 *       in progressMap before calling this function)
 */
export function computeUnlocks(
  topics: TopicDep[],
  progressMap: Map<string, NodeState>,
  _justMasteredId: string
): string[] {
  const result: string[] = [];

  for (const topic of topics) {
    const deps = JSON.parse(topic.dependsOn) as string[];

    if (deps.length === 0) {
      continue;
    }

    const currentState = progressMap.get(topic.id) ?? 'locked';
    if (currentState !== 'locked') {
      continue;
    }

    const allDepsMastered = deps.every(
      (depId) => progressMap.get(depId) === 'mastered'
    );

    if (allDepsMastered) {
      result.push(topic.id);
    }
  }

  return result;
}

/**
 * Inverse cascade: given a reset topic (already set to 'available' in progressMap),
 * returns topic IDs that should transition to "locked" (R4, R5, R6).
 *
 * Rules:
 *  - BFS from resetTopicId through dependents
 *  - A dependent Y should be relocked only if it was EXCLUSIVELY unlocked by
 *    the reset topic (or cascade-relocked topics) — i.e., Y has NO other
 *    mastered dependency outside the cascade (R5)
 *  - Recursive: if Y is relocked, Y's dependents are also checked (R6)
 *  - The reset topic itself is NOT included in the result
 */
export function computeRelock(
  topics: TopicDep[],
  progressMap: Map<string, NodeState>,
  resetTopicId: string
): string[] {
  const dependents = new Map<string, string[]>();
  for (const topic of topics) {
    const deps = JSON.parse(topic.dependsOn) as string[];
    for (const dep of deps) {
      const list = dependents.get(dep) ?? [];
      list.push(topic.id);
      dependents.set(dep, list);
    }
  }

  const relocked = new Set<string>();
  const queue = [resetTopicId];

  while (queue.length > 0) {
    const current = queue.shift()!;
    const children = dependents.get(current) ?? [];

    for (const childId of children) {
      if (relocked.has(childId)) continue;

      const child = topics.find((t) => t.id === childId);
      if (!child) continue;

      const childDeps = JSON.parse(child.dependsOn) as string[];

      const hasOtherMasteredDep = childDeps.some(
        (depId) =>
          depId !== resetTopicId &&
          !relocked.has(depId) &&
          progressMap.get(depId) === 'mastered'
      );

      if (!hasOtherMasteredDep) {
        relocked.add(childId);
        queue.push(childId);
      }
    }
  }

  relocked.delete(resetTopicId);
  return Array.from(relocked);
}

export type { TopicDep, NodeState };
