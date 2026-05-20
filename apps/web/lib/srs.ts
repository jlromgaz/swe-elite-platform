const INTERVALS = [3, 7, 30];

/**
 * Computes the next review date and updated review count using a simple
 * spaced-repetition algorithm with a 3-bucket interval table [3, 7, 30] days.
 *
 * - score >= 2: advance; newReviewCount = currentReviewCount + 1, interval = INTERVALS[min(currentReviewCount, 2)]
 * - score = 1:  reset;   newReviewCount = 0, interval = 3 days
 */
export function computeNextReview(
  currentReviewCount: number,
  score: 1 | 2 | 3
): { nextReview: Date; newReviewCount: number } {
  const now = new Date();

  if (score >= 2) {
    const days = INTERVALS[Math.min(currentReviewCount, 2)];
    const nextReview = new Date(now.getTime() + days * 24 * 60 * 60 * 1000);
    return { nextReview, newReviewCount: currentReviewCount + 1 };
  } else {
    const nextReview = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);
    return { nextReview, newReviewCount: 0 };
  }
}
