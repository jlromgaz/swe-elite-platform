import { describe, it, expect } from 'vitest';
import { computeNextReview } from './srs';

const INTERVALS = [3, 7, 30];

function withinWindow(date: Date, nowMs: number, days: number): boolean {
  const expectedMs = nowMs + days * 24 * 60 * 60 * 1000;
  const toleranceMs = 60 * 1000; // 1 minute
  return (
    date.getTime() >= expectedMs - toleranceMs &&
    date.getTime() <= expectedMs + toleranceMs
  );
}

describe('computeNextReview', () => {
  it('(0, 3): score>=2 → newReviewCount=1, nextReview≈now+3days', () => {
    const now = Date.now();
    const result = computeNextReview(0, 3);
    expect(result.newReviewCount).toBe(1);
    expect(withinWindow(result.nextReview, now, INTERVALS[0])).toBe(true);
  });

  it('(1, 2): score>=2 → newReviewCount=2, nextReview≈now+7days', () => {
    const now = Date.now();
    const result = computeNextReview(1, 2);
    expect(result.newReviewCount).toBe(2);
    expect(withinWindow(result.nextReview, now, INTERVALS[1])).toBe(true);
  });

  it('(5, 2): score>=2, count>=2 → newReviewCount=6, nextReview≈now+30days (capped)', () => {
    const now = Date.now();
    const result = computeNextReview(5, 2);
    expect(result.newReviewCount).toBe(6);
    expect(withinWindow(result.nextReview, now, INTERVALS[2])).toBe(true);
  });

  it('(5, 1): score=1 fail → newReviewCount=0, nextReview≈now+3days', () => {
    const now = Date.now();
    const result = computeNextReview(5, 1);
    expect(result.newReviewCount).toBe(0);
    expect(withinWindow(result.nextReview, now, INTERVALS[0])).toBe(true);
  });

  it('(0, 1): score=1 fail from 0 → newReviewCount=0, nextReview≈now+3days', () => {
    const now = Date.now();
    const result = computeNextReview(0, 1);
    expect(result.newReviewCount).toBe(0);
    expect(withinWindow(result.nextReview, now, INTERVALS[0])).toBe(true);
  });

  it('determinism: same inputs produce same newReviewCount', () => {
    const r1 = computeNextReview(2, 3);
    const r2 = computeNextReview(2, 3);
    expect(r1.newReviewCount).toBe(r2.newReviewCount);
    // nextReview timestamps are nearly identical (wall-clock drift <1ms in test context)
    expect(Math.abs(r1.nextReview.getTime() - r2.nextReview.getTime())).toBeLessThan(100);
  });
});
