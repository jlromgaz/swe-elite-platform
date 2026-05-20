import { describe, it, expect } from 'vitest';
import { QUIZ_BANK } from './quiz-bank';

const SEEDED_TOPIC_IDS = [
  'data-structures-fundamentals',
  'algorithms-complexity',
  'systems-design-basics',
];

describe('QUIZ_BANK coverage invariant', () => {
  it('every seeded topic id has a key in QUIZ_BANK', () => {
    for (const topicId of SEEDED_TOPIC_IDS) {
      expect(QUIZ_BANK).toHaveProperty(topicId);
    }
  });

  it('no QUIZ_BANK entry has correctIndex out of bounds of its options array', () => {
    for (const [topicId, entry] of Object.entries(QUIZ_BANK)) {
      expect(
        entry.correctIndex,
        `${topicId}: correctIndex ${entry.correctIndex} out of bounds (options.length=${entry.options.length})`
      ).toBeGreaterThanOrEqual(0);
      expect(
        entry.correctIndex,
        `${topicId}: correctIndex ${entry.correctIndex} out of bounds (options.length=${entry.options.length})`
      ).toBeLessThan(entry.options.length);
    }
  });
});
