import { describe, it, expect } from 'vitest';
import { computeUnlocks, computeRelock } from './roadmap-cascade';

type NodeState = 'locked' | 'available' | 'in_progress' | 'mastered';

describe('computeUnlocks', () => {
  it('linear chain: mastering A unlocks B', () => {
    const topics = [
      { id: 'a', dependsOn: '[]' },
      { id: 'b', dependsOn: '["a"]' },
      { id: 'c', dependsOn: '["b"]' },
    ];
    const progressMap = new Map<string, NodeState>([
      ['a', 'mastered'],
      ['b', 'locked'],
      ['c', 'locked'],
    ]);
    const result = computeUnlocks(topics, progressMap, 'a');
    expect(result).toContain('b');
    expect(result).not.toContain('c'); // c depends on b which is locked
  });

  it('diamond: last blocker mastered unlocks C', () => {
    const topics = [
      { id: 'a', dependsOn: '[]' },
      { id: 'b', dependsOn: '[]' },
      { id: 'c', dependsOn: '["a", "b"]' },
    ];
    const progressMap = new Map<string, NodeState>([
      ['a', 'mastered'],
      ['b', 'mastered'],
      ['c', 'locked'],
    ]);
    const result = computeUnlocks(topics, progressMap, 'b');
    expect(result).toContain('c');
  });

  it('diamond partial: one parent not mastered → C stays locked', () => {
    const topics = [
      { id: 'a', dependsOn: '[]' },
      { id: 'b', dependsOn: '[]' },
      { id: 'c', dependsOn: '["a", "b"]' },
    ];
    const progressMap = new Map<string, NodeState>([
      ['a', 'mastered'],
      ['b', 'available'], // NOT mastered
      ['c', 'locked'],
    ]);
    const result = computeUnlocks(topics, progressMap, 'a');
    expect(result).not.toContain('c');
  });

  it('fan-out: mastering root unlocks multiple dependents', () => {
    const topics = [
      { id: 'root', dependsOn: '[]' },
      { id: 'dep1', dependsOn: '["root"]' },
      { id: 'dep2', dependsOn: '["root"]' },
      { id: 'dep3', dependsOn: '["root"]' },
    ];
    const progressMap = new Map<string, NodeState>([
      ['root', 'mastered'],
      ['dep1', 'locked'],
      ['dep2', 'locked'],
      ['dep3', 'locked'],
    ]);
    const result = computeUnlocks(topics, progressMap, 'root');
    expect(result).toContain('dep1');
    expect(result).toContain('dep2');
    expect(result).toContain('dep3');
  });

  it('already available dependent → not included in result', () => {
    const topics = [
      { id: 'a', dependsOn: '[]' },
      { id: 'b', dependsOn: '["a"]' },
    ];
    const progressMap = new Map<string, NodeState>([
      ['a', 'mastered'],
      ['b', 'available'], // already available — skip
    ]);
    const result = computeUnlocks(topics, progressMap, 'a');
    expect(result).not.toContain('b');
  });

  it('in_progress dependent → not included in result', () => {
    const topics = [
      { id: 'a', dependsOn: '[]' },
      { id: 'b', dependsOn: '["a"]' },
    ];
    const progressMap = new Map<string, NodeState>([
      ['a', 'mastered'],
      ['b', 'in_progress'],
    ]);
    const result = computeUnlocks(topics, progressMap, 'a');
    expect(result).not.toContain('b');
  });

  it('mastered dependent → not included in result', () => {
    const topics = [
      { id: 'a', dependsOn: '[]' },
      { id: 'b', dependsOn: '["a"]' },
    ];
    const progressMap = new Map<string, NodeState>([
      ['a', 'mastered'],
      ['b', 'mastered'],
    ]);
    const result = computeUnlocks(topics, progressMap, 'a');
    expect(result).not.toContain('b');
  });

  it('root topics are never unlocked by cascade', () => {
    const topics = [
      { id: 'root1', dependsOn: '[]' },
      { id: 'root2', dependsOn: '[]' },
    ];
    const progressMap = new Map<string, NodeState>([
      ['root1', 'mastered'],
      ['root2', 'locked'],
    ]);
    const result = computeUnlocks(topics, progressMap, 'root1');
    expect(result).not.toContain('root2');
  });
});

describe('computeRelock', () => {
  it('SC-1: reset mastered with no downstream → empty result', () => {
    const topics = [
      { id: 'a', dependsOn: '[]' },
    ];
    const progressMap = new Map<string, NodeState>([
      ['a', 'available'],
    ]);
    const result = computeRelock(topics, progressMap, 'a');
    expect(result).toEqual([]);
  });

  it('SC-2: reset mastered with exclusive downstream → downstream relocks', () => {
    const topics = [
      { id: 'a', dependsOn: '[]' },
      { id: 'b', dependsOn: '["a"]' },
    ];
    const progressMap = new Map<string, NodeState>([
      ['a', 'available'],
      ['b', 'available'],
    ]);
    const result = computeRelock(topics, progressMap, 'a');
    expect(result).toContain('b');
  });

  it('SC-3: reset mastered with shared downstream → downstream stays (other dep mastered)', () => {
    const topics = [
      { id: 'a', dependsOn: '[]' },
      { id: 'c', dependsOn: '[]' },
      { id: 'd', dependsOn: '["a", "c"]' },
    ];
    const progressMap = new Map<string, NodeState>([
      ['a', 'available'],
      ['c', 'mastered'],
      ['d', 'available'],
    ]);
    const result = computeRelock(topics, progressMap, 'a');
    expect(result).not.toContain('d');
  });

  it('SC-4: recursive cascade — A reset, B depends only on A, C depends only on B', () => {
    const topics = [
      { id: 'a', dependsOn: '[]' },
      { id: 'b', dependsOn: '["a"]' },
      { id: 'c', dependsOn: '["b"]' },
    ];
    const progressMap = new Map<string, NodeState>([
      ['a', 'available'],
      ['b', 'available'],
      ['c', 'available'],
    ]);
    const result = computeRelock(topics, progressMap, 'a');
    expect(result).toContain('b');
    expect(result).toContain('c');
  });

  it('exclusive downstream that is mastered also gets relocked', () => {
    const topics = [
      { id: 'a', dependsOn: '[]' },
      { id: 'b', dependsOn: '["a"]' },
    ];
    const progressMap = new Map<string, NodeState>([
      ['a', 'available'],
      ['b', 'mastered'],
    ]);
    const result = computeRelock(topics, progressMap, 'a');
    expect(result).toContain('b');
  });

  it('downstream with other mastered dep stays (even if mastered)', () => {
    const topics = [
      { id: 'a', dependsOn: '[]' },
      { id: 'b', dependsOn: '[]' },
      { id: 'c', dependsOn: '["a", "b"]' },
    ];
    const progressMap = new Map<string, NodeState>([
      ['a', 'available'],
      ['b', 'mastered'],
      ['c', 'mastered'],
    ]);
    const result = computeRelock(topics, progressMap, 'a');
    expect(result).not.toContain('c');
  });

  it('reset topic itself is not in the result', () => {
    const topics = [
      { id: 'a', dependsOn: '[]' },
      { id: 'b', dependsOn: '["a"]' },
    ];
    const progressMap = new Map<string, NodeState>([
      ['a', 'available'],
      ['b', 'available'],
    ]);
    const result = computeRelock(topics, progressMap, 'a');
    expect(result).not.toContain('a');
  });
});
