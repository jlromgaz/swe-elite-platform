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
  // Free navigation enabled: nodes don't unlock each other anymore.
  // All nodes are available by default if not mastered/in_progress.
  return [];
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
  // Free navigation enabled: nodes never relock.
  return [];
}

export type { TopicDep, NodeState };
