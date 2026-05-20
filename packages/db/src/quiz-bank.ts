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
  'advanced-architecture-ddd': {
    question:
      'In DDD, what defines the boundary within which a particular domain model applies?',
    options: [
      'Aggregate Root',
      'Bounded Context',
      'Domain Event',
      'Value Object',
    ],
    correctIndex: 1,
  },
  'distributed-systems-sharding': {
    question:
      'What problem does consistent hashing primarily solve when scaling horizontally?',
    options: [
      'ACID compliance violations',
      'Massive key remapping when nodes are added or removed',
      'Read-after-write consistency',
      'Schema migration downtime',
    ],
    correctIndex: 1,
  },
  'clean-code-solid-patterns': {
    question:
      'Which SOLID principle states that high-level modules should not depend on low-level modules, but both should depend on abstractions?',
    options: [
      'Single Responsibility',
      'Open/Closed',
      'Liskov Substitution',
      'Dependency Inversion',
    ],
    correctIndex: 3,
  },
  'elite-qa-mutation-contract': {
    question:
      'What does Mutation Testing verify that code coverage cannot?',
    options: [
      'That all branches are executed',
      'That tests actually detect introduced faults',
      'That the API contract is satisfied',
      'That the architecture follows clean boundaries',
    ],
    correctIndex: 1,
  },
  'cloud-native-devops-gitops': {
    question:
      'In GitOps, what is the single source of truth for infrastructure state?',
    options: [
      'Container registry',
      'Kubernetes API server',
      'Git repository',
      'etcd database',
    ],
    correctIndex: 2,
  },
  'deep-observability-otel-sre': {
    question:
      'What are the three pillars of observability unified by OpenTelemetry?',
    options: [
      'Latency, Throughput, Errors',
      'Traces, Metrics, Logs',
      'CPU, Memory, Disk I/O',
      'HTTP, gRPC, WebSocket',
    ],
    correctIndex: 1,
  },
};
