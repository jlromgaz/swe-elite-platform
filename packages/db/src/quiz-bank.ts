export type QuizEntry = {
  question: string;
  options: string[];
  correctIndex: number;
};

export const QUIZ_BANK: Record<string, QuizEntry> = {
  'data-structures-fundamentals': {
    question: 'What is the time complexity of accessing an element in an array by index?',
    options: ['O(n)', 'O(log n)', 'O(n²)', 'O(1)'],
    correctIndex: 3,
  },
  'algorithms-complexity': {
    question: 'What does Big-O notation primarily describe?',
    options: [
      'best-case performance',
      'average-case growth rate',
      'worst-case growth rate',
      'exact operation count',
    ],
    correctIndex: 2,
  },
  'systems-design-basics': {
    question:
      'Which consistency model guarantees all nodes see the same data at the same time?',
    options: [
      'eventual consistency',
      'strong consistency',
      'causal consistency',
      'monotonic read consistency',
    ],
    correctIndex: 1,
  },
};
