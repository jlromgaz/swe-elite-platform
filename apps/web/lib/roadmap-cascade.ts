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
      // Root node — never unlocked via cascade
      continue;
    }

    const currentState = progressMap.get(topic.id) ?? 'locked';
    if (currentState !== 'locked') {
      // Already available / in_progress / mastered — skip
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
