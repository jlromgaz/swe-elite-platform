export type QuizEntry = {
  question: string;
  options: string[];
  correctIndex: number;
};

export const QUIZ_BANK: Record<string, QuizEntry[]> = {
  'data-structures-fundamentals': [
    { question: 'Which data structure uses LIFO (Last In First Out)?', options: ['Queue', 'Stack', 'Array', 'Linked List'], correctIndex: 1 },
    { question: 'What is the time complexity of accessing an element in an array by index?', options: ['O(1)', 'O(n)', 'O(log n)', 'O(n^2)'], correctIndex: 0 },
    { question: 'Which data structure uses FIFO (First In First Out)?', options: ['Stack', 'Tree', 'Queue', 'Graph'], correctIndex: 2 },
    { question: 'In a Hash Table, what is a collision?', options: ['Two tables merging', 'Two keys hashing to the same index', 'Two values having different keys', 'An array out of bounds error'], correctIndex: 1 },
    { question: 'Which of these is a non-linear data structure?', options: ['Array', 'Stack', 'Queue', 'Tree'], correctIndex: 3 },
    { question: 'What is the worst-case time complexity of searching in a Binary Search Tree (BST)?', options: ['O(1)', 'O(log n)', 'O(n)', 'O(n^2)'], correctIndex: 2 },
    { question: 'What data structure is typically used to implement a Priority Queue?', options: ['Stack', 'Heap', 'Linked List', 'Hash Table'], correctIndex: 1 },
    { question: 'Which traversal method explores all neighbors at the current depth before moving deeper?', options: ['Depth-First Search', 'Breadth-First Search', 'In-order Traversal', 'Post-order Traversal'], correctIndex: 1 },
    { question: 'What is the main advantage of a Linked List over an Array?', options: ['O(1) random access', 'Dynamic size and O(1) insertions/deletions', 'Less memory usage', 'Better cache locality'], correctIndex: 1 },
    { question: 'A graph without any cycles is called a:', options: ['Cyclic Graph', 'Complete Graph', 'Tree (or Forest)', 'Bipartite Graph'], correctIndex: 2 },
  ],
  'algorithms-complexity': [
    { question: 'What does Big-O notation describe?', options: ['The average-case complexity', 'The best-case complexity', 'The worst-case complexity', 'The exact runtime in seconds'], correctIndex: 2 },
    { question: 'Which sorting algorithm has an average time complexity of O(n log n) and is based on divide and conquer?', options: ['Bubble Sort', 'Insertion Sort', 'Merge Sort', 'Selection Sort'], correctIndex: 2 },
    { question: 'What is the time complexity of Binary Search?', options: ['O(n)', 'O(log n)', 'O(1)', 'O(n log n)'], correctIndex: 1 },
    { question: 'Which technique solves problems by storing the results of overlapping subproblems?', options: ['Greedy Algorithm', 'Dynamic Programming', 'Divide and Conquer', 'Backtracking'], correctIndex: 1 },
    { question: 'What is the time complexity of Bubble Sort in the worst case?', options: ['O(n)', 'O(n log n)', 'O(n^2)', 'O(2^n)'], correctIndex: 2 },
    { question: 'Which graph algorithm finds the shortest path from a single source to all other vertices with non-negative edge weights?', options: ['Kruskal\'s', 'Prim\'s', 'Dijkstra\'s', 'Bellman-Ford'], correctIndex: 2 },
    { question: 'What is a characteristic of Greedy algorithms?', options: ['They always find the globally optimal solution', 'They make locally optimal choices at each step', 'They explore all possible paths', 'They use memoization'], correctIndex: 1 },
    { question: 'O(1) time complexity means:', options: ['The algorithm takes 1 second', 'The runtime grows linearly', 'The runtime is constant regardless of input size', 'The algorithm has no loops'], correctIndex: 2 },
    { question: 'In the Master Theorem, if the work done in splitting and combining is smaller than the recursive calls, the complexity is dominated by:', options: ['The base cases', 'The leaves (recursive calls)', 'The root', 'It cannot be determined'], correctIndex: 1 },
    { question: 'Which search algorithm requires the array to be sorted beforehand?', options: ['Linear Search', 'Binary Search', 'Depth-First Search', 'Breadth-First Search'], correctIndex: 1 },
  ],
  'systems-design-basics': [
    { question: 'What is Horizontal Scaling (Scaling Out)?', options: ['Upgrading CPU and RAM on a single server', 'Adding more servers to handle the load', 'Caching data in memory', 'Optimizing database queries'], correctIndex: 1 },
    { question: 'What is the primary role of a Load Balancer?', options: ['To encrypt traffic', 'To store session data', 'To distribute incoming traffic across multiple servers', 'To execute database transactions'], correctIndex: 2 },
    { question: 'Which of the following is a key-value store commonly used for caching?', options: ['PostgreSQL', 'Redis', 'MongoDB', 'Elasticsearch'], correctIndex: 1 },
    { question: 'What is a Single Point of Failure (SPOF)?', options: ['A slow database query', 'A part of a system that, if it fails, stops the entire system', 'A microservice', 'A load balancer'], correctIndex: 1 },
    { question: 'What does a CDN (Content Delivery Network) primarily do?', options: ['Executes server-side code', 'Hosts databases', 'Caches static content closer to users to reduce latency', 'Provides DNS services'], correctIndex: 2 },
    { question: 'What is the CAP theorem?', options: ['Consistency, Availability, Partition Tolerance', 'Concurrency, Asynchrony, Performance', 'Caching, API, Processing', 'Compute, Access, Persistence'], correctIndex: 0 },
    { question: 'In a relational database, what is ACID?', options: ['Asynchronous, Concurrent, Isolated, Distributed', 'Atomicity, Consistency, Isolation, Durability', 'Active, Cached, Indexed, Dynamic', 'Array, Collection, Iterable, Dictionary'], correctIndex: 1 },
    { question: 'What is database sharding?', options: ['Adding more RAM to a database server', 'Replicating the entire database', 'Partitioning data across multiple databases/servers', 'Creating indexes for faster searches'], correctIndex: 2 },
    { question: 'What is the difference between SQL and NoSQL databases?', options: ['SQL is faster than NoSQL', 'SQL is structured/relational; NoSQL handles unstructured/flexible data', 'NoSQL requires schemas, SQL does not', 'SQL cannot scale horizontally'], correctIndex: 1 },
    { question: 'Which protocol is commonly used for stateless, RESTful APIs?', options: ['FTP', 'SMTP', 'HTTP', 'SSH'], correctIndex: 2 },
  ],
  'advanced-architecture-ddd': [
    {
      question: 'In DDD, what defines the boundary within which a particular domain model applies?',
      options: ['Aggregate Root', 'Bounded Context', 'Domain Event', 'Value Object'],
      correctIndex: 1,
    },
    {
      question: 'What is the primary purpose of CQRS?',
      options: ['To store data in memory', 'To separate read and write models', 'To cache database queries', 'To handle UI routing'],
      correctIndex: 1,
    },
    {
      question: 'Event Sourcing stores data as:',
      options: ['Mutable tables', 'Key-value pairs', 'A sequence of immutable events', 'Document stores'],
      correctIndex: 2,
    },
    {
      question: 'In a hexagonal architecture, the domain logic depends on:',
      options: ['The database layer', 'The UI layer', 'External APIs', 'Nothing (it is isolated)'],
      correctIndex: 3,
    },
    {
      question: 'Which of the following is NOT a characteristic of a Microservices Architecture?',
      options: ['Independent deployability', 'Shared relational database for all services', 'Loose coupling', 'Organized around business capabilities'],
      correctIndex: 1,
    },
    {
      question: 'What does the Saga pattern manage in microservices?',
      options: ['Container orchestration', 'Distributed transactions', 'API rate limiting', 'Service discovery'],
      correctIndex: 1,
    },
    {
      question: 'An Aggregate Root in DDD is responsible for:',
      options: ['Connecting to the database', 'Ensuring consistency of changes within the aggregate', 'Handling HTTP requests', 'Sending emails'],
      correctIndex: 1,
    },
    {
      question: 'What is a Value Object in DDD?',
      options: ['An object identified by its attributes rather than an ID', 'A database row', 'A global variable', 'An API response'],
      correctIndex: 0,
    },
    {
      question: 'Which architecture pattern emphasizes Use Cases as first-class citizens?',
      options: ['MVC', 'Clean Architecture', 'Monolithic', 'Layered Architecture'],
      correctIndex: 1,
    },
    {
      question: 'In Clean Architecture, which layer is at the absolute center?',
      options: ['Entities / Enterprise Business Rules', 'Use Cases', 'Controllers', 'Frameworks'],
      correctIndex: 0,
    }
  ],
  'distributed-systems-sharding': [
    {
      question: 'What problem does consistent hashing primarily solve when scaling horizontally?',
      options: ['ACID compliance violations', 'Massive key remapping when nodes are added or removed', 'Read-after-write consistency', 'Schema migration downtime'],
      correctIndex: 1,
    },
    {
      question: 'According to the CAP theorem, a distributed system can guarantee at most two of the following: Consistency, Availability, and...',
      options: ['Performance', 'Partition Tolerance', 'Persistency', 'Parallelism'],
      correctIndex: 1,
    },
    {
      question: 'Which of the following is a symptom of a poorly chosen Shard Key?',
      options: ['Fast read times', 'Even data distribution', 'Hotspots (uneven write loads)', 'Low latency'],
      correctIndex: 2,
    },
    {
      question: 'What does a Load Balancer do?',
      options: ['Encrypts data', 'Distributes incoming network traffic across multiple servers', 'Compiles code', 'Stores session data permanently'],
      correctIndex: 1,
    },
    {
      question: 'What is a typical use case for a CDN?',
      options: ['Executing background jobs', 'Serving static assets globally with low latency', 'Running complex SQL queries', 'Managing Kubernetes clusters'],
      correctIndex: 1,
    },
    {
      question: 'In a Master-Slave replication setup, the slave nodes are typically used for:',
      options: ['Write-heavy workloads', 'Read-heavy workloads', 'Schema migrations', 'Leader election'],
      correctIndex: 1,
    },
    {
      question: 'What is "Eventual Consistency"?',
      options: ['Data is immediately available to all nodes', 'Given enough time, all nodes will reflect the latest updates', 'Data is never consistent', 'Nodes randomly sync data'],
      correctIndex: 1,
    },
    {
      question: 'What technique is used to prevent the "Thundering Herd" problem in caching?',
      options: ['Cache stampede prevention (e.g. mutex locks)', 'Disabling the cache completely', 'Storing all data in RAM', 'Using a single database node'],
      correctIndex: 0,
    },
    {
      question: 'Which protocol is commonly used for consensus in distributed systems?',
      options: ['HTTP', 'SMTP', 'Raft or Paxos', 'FTP'],
      correctIndex: 2,
    },
    {
      question: 'What is the primary benefit of horizontal scaling over vertical scaling?',
      options: ['It uses a single powerful machine', 'It requires less software changes', 'It has theoretically infinite limits by adding more machines', 'It is always cheaper'],
      correctIndex: 2,
    }
  ],
  'clean-code-solid-patterns': [
    {
      question: 'Which SOLID principle states that high-level modules should not depend on low-level modules, but both should depend on abstractions?',
      options: ['Single Responsibility', 'Open/Closed', 'Liskov Substitution', 'Dependency Inversion'],
      correctIndex: 3,
    },
    {
      question: 'What does the Open/Closed Principle state?',
      options: ['Code should be open for extension but closed for modification', 'Source code should be open source', 'Classes should be open for testing but closed for deployment', 'Databases should be open to reads but closed to writes'],
      correctIndex: 0,
    },
    {
      question: 'Which principle suggests that a class should have one, and only one, reason to change?',
      options: ['Liskov Substitution Principle', 'Interface Segregation Principle', 'Single Responsibility Principle', 'Dependency Inversion Principle'],
      correctIndex: 2,
    },
    {
      question: 'What is the core idea of the Liskov Substitution Principle (LSP)?',
      options: ['Subtypes must be substitutable for their base types without altering program correctness', 'Interfaces should be segregated', 'Code must be tested', 'Classes must be small'],
      correctIndex: 0,
    },
    {
      question: 'What does the DRY principle stand for?',
      options: ['Do Repeat Yourself', 'Don\'t Repeat Yourself', 'Deploy Regularly Yearly', 'Data Rendering Yield'],
      correctIndex: 1,
    },
    {
      question: 'What is a "Code Smell"?',
      options: ['A compilation error', 'A surface indication that usually corresponds to a deeper problem in the system', 'A unit test failure', 'A secure coding practice'],
      correctIndex: 1,
    },
    {
      question: 'Which design pattern is used to ensure a class has only one instance?',
      options: ['Factory', 'Observer', 'Singleton', 'Decorator'],
      correctIndex: 2,
    },
    {
      question: 'What is the primary purpose of the Observer pattern?',
      options: ['To create objects', 'To define a one-to-many dependency between objects so that when one changes state, dependents are notified', 'To iterate over a collection', 'To restrict access to a system'],
      correctIndex: 1,
    },
    {
      question: 'Which refactoring technique involves extracting a long method into smaller, well-named methods?',
      options: ['Extract Class', 'Extract Interface', 'Extract Method', 'Inline Temp'],
      correctIndex: 2,
    },
    {
      question: 'What does YAGNI stand for?',
      options: ['You Are Going Nowhere In-code', 'You Aren\'t Gonna Need It', 'Yet Another Great Node Interface', 'Yield All Generated Null Instances'],
      correctIndex: 1,
    }
  ],
  'elite-qa-mutation-contract': [
    {
      question: 'What does Mutation Testing verify that code coverage cannot?',
      options: ['That all branches are executed', 'That tests actually detect introduced faults', 'That the API contract is satisfied', 'That the architecture follows clean boundaries'],
      correctIndex: 1,
    },
    {
      question: 'In Contract Testing, what does a Consumer-Driven Contract verify?',
      options: ['That the UI looks correct', 'That the provider (API) meets the expectations of the consumer', 'That the database schema is valid', 'That the code compiles'],
      correctIndex: 1,
    },
    {
      question: 'What is the main benefit of TDD (Test-Driven Development)?',
      options: ['Writing code faster initially', 'Ensuring the code is driven by requirements and has high test coverage from the start', 'Avoiding the need for a QA team', 'Generating automatic documentation'],
      correctIndex: 1,
    },
    {
      question: 'What tool can be used to enforce architectural rules in Java/Kotlin tests?',
      options: ['Selenium', 'ArchUnit', 'Jest', 'Cypress'],
      correctIndex: 1,
    },
    {
      question: 'What is a "Flaky Test"?',
      options: ['A test that runs very slowly', 'A test that fails or passes randomly without code changes', 'A test written poorly', 'A test that only runs in production'],
      correctIndex: 1,
    },
    {
      question: 'What does End-to-End (E2E) testing evaluate?',
      options: ['Individual functions', 'The entire application flow from the user\'s perspective', 'Database indexes', 'Code syntax'],
      correctIndex: 1,
    },
    {
      question: 'Which metric indicates the percentage of source code executed by tests?',
      options: ['Code Coverage', 'Cyclomatic Complexity', 'Mutation Score', 'Defect Density'],
      correctIndex: 0,
    },
    {
      question: 'What is a "Mock" in unit testing?',
      options: ['A real database', 'An object pre-programmed with expectations which form a specification of the calls they are expected to receive', 'A slow dependency', 'A type of test runner'],
      correctIndex: 1,
    },
    {
      question: 'What is the purpose of Load Testing?',
      options: ['To test the UI layout', 'To determine how the system behaves under a specific expected load', 'To test unit functions', 'To check for security vulnerabilities'],
      correctIndex: 1,
    },
    {
      question: 'In the Testing Pyramid, which type of tests should form the largest base?',
      options: ['End-to-End Tests', 'Integration Tests', 'Unit Tests', 'Manual Tests'],
      correctIndex: 2,
    }
  ],
  'cloud-native-devops-gitops': [
    {
      question: 'In GitOps, what is the single source of truth for infrastructure state?',
      options: ['Container registry', 'Kubernetes API server', 'Git repository', 'etcd database'],
      correctIndex: 2,
    },
    {
      question: 'What is ArgoCD primarily used for?',
      options: ['Building Docker images', 'Continuous Delivery tool for Kubernetes acting as a GitOps controller', 'Running unit tests', 'Monitoring server CPU'],
      correctIndex: 1,
    },
    {
      question: 'Which distributed key-value store backs Kubernetes cluster state?',
      options: ['Redis', 'Memcached', 'etcd', 'ZooKeeper'],
      correctIndex: 2,
    },
    {
      question: 'What is a Kubernetes Pod?',
      options: ['A physical server', 'The smallest deployable computing unit in Kubernetes, containing one or more containers', 'A load balancer', 'A network policy'],
      correctIndex: 1,
    },
    {
      question: 'What does a Continuous Integration (CI) pipeline typically do?',
      options: ['Deploy code to production', 'Automatically build and test code on every commit', 'Provision hardware servers', 'Manage customer support tickets'],
      correctIndex: 1,
    },
    {
      question: 'What is Infrastructure as Code (IaC)?',
      options: ['Writing application code', 'Managing and provisioning computing infrastructure through machine-readable definition files', 'Compiling code into binaries', 'Manual server configuration'],
      correctIndex: 1,
    },
    {
      question: 'What is Terraform primarily used for?',
      options: ['Running unit tests', 'Provisioning cloud infrastructure using IaC', 'Container orchestration', 'Log aggregation'],
      correctIndex: 1,
    },
    {
      question: 'In Kubernetes, what ensures that a specific number of pod replicas are running?',
      options: ['Ingress', 'Service', 'Deployment / ReplicaSet', 'ConfigMap'],
      correctIndex: 2,
    },
    {
      question: 'What is the primary advantage of immutable infrastructure?',
      options: ['Servers can be updated easily via SSH', 'Infrastructure is never modified after deployment; instead, it is replaced with a new version, reducing configuration drift', 'It requires less storage space', 'It is faster to deploy manually'],
      correctIndex: 1,
    },
    {
      question: 'What does a Readiness Probe do in Kubernetes?',
      options: ['Restarts the pod if it fails', 'Determines if a container is ready to accept HTTP traffic', 'Deletes the pod', 'Scales the cluster'],
      correctIndex: 1,
    }
  ],
  'deep-observability-otel-sre': [
    {
      question: 'What are the three pillars of observability unified by OpenTelemetry?',
      options: ['Latency, Throughput, Errors', 'Traces, Metrics, Logs', 'CPU, Memory, Disk I/O', 'HTTP, gRPC, WebSocket'],
      correctIndex: 1,
    },
    {
      question: 'What is a Trace in distributed systems?',
      options: ['A single log line', 'A representation of an end-to-end request flow through a distributed system', 'A metric counter', 'A database query'],
      correctIndex: 1,
    },
    {
      question: 'What is a Span in the context of OpenTelemetry?',
      options: ['A unit of work or operation within a trace', 'A time window', 'A server node', 'A log aggregation tool'],
      correctIndex: 0,
    },
    {
      question: 'How does Prometheus collect metrics?',
      options: ['Push model (services push to Prometheus)', 'Pull model (Prometheus scrapes endpoints)', 'Email alerts', 'Reading log files'],
      correctIndex: 1,
    },
    {
      question: 'What is an SLI (Service Level Indicator) in SRE?',
      options: ['A business contract', 'A carefully defined quantitative measure of some aspect of the level of service provided', 'The team responsible for uptime', 'A server component'],
      correctIndex: 1,
    },
    {
      question: 'What is an SLO (Service Level Objective)?',
      options: ['A target value or range of values for a service level that is measured by an SLI', 'A penalty for downtime', 'A logging tool', 'A network router'],
      correctIndex: 0,
    },
    {
      question: 'What is an Error Budget?',
      options: ['Money allocated for fixing bugs', 'The amount of error that your service can accumulate over a certain period of time before consequences kick in', 'The number of developers on a team', 'The cost of server infrastructure'],
      correctIndex: 1,
    },
    {
      question: 'What is the purpose of structured logging?',
      options: ['To make logs look pretty in the terminal', 'To format logs as JSON or key-value pairs so they can be easily queried and indexed by machines', 'To reduce log size', 'To encrypt log data'],
      correctIndex: 1,
    },
    {
      question: 'What does the OpenTelemetry Collector do?',
      options: ['It runs the application code', 'It receives, processes, and exports telemetry data in a vendor-agnostic way', 'It provisions Kubernetes clusters', 'It writes unit tests'],
      correctIndex: 1,
    },
    {
      question: 'In Grafana, what is the primary source of data for rendering dashboards?',
      options: ['Hardcoded HTML', 'Data sources like Prometheus, Loki, or Tempo', 'A local CSV file', 'The user\'s browser state'],
      correctIndex: 1,
    }
  ]
};
