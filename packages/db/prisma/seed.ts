import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  datasourceUrl: process.env.DATABASE_URL ?? 'file:./dev.db',
});

// ──────────────────────────────────────────────────────
// TOPICS — Foundation + Elite Domains
// ──────────────────────────────────────────────────────
const topics = [

  // ── Domain 1: Advanced Software Architecture & DDD ──
  {
    id: 'advanced-architecture-ddd',
    slug: 'advanced-architecture-ddd',
    title: 'Advanced Software Architecture & DDD',
    category: 'architecture',
    estimatedHours: 50,
    dependsOn: '[]',
    isRequired: true,
  },

  // ── Domain 2: Distributed Systems, Sharding & Load Balancing ──
  {
    id: 'distributed-systems-sharding',
    slug: 'distributed-systems-sharding',
    title: 'Distributed Systems, Sharding & Load Balancing at Scale',
    category: 'systems',
    estimatedHours: 45,
    dependsOn: '[]',
    isRequired: true,
  },

  // ── Domain 3: Clean Code, SOLID & Refactoring ──
  {
    id: 'clean-code-solid-patterns',
    slug: 'clean-code-solid-patterns',
    title: 'Clean Code, SOLID Principles & Refactoring',
    category: 'craftsmanship',
    estimatedHours: 35,
    dependsOn: '[]',
    isRequired: true,
  },

  // ── Domain 4: Elite QA: Mutation & Contract Testing ──
  {
    id: 'elite-qa-mutation-contract',
    slug: 'elite-qa-mutation-contract',
    title: 'Elite QA: Mutation Testing, Contract Testing & Architecture',
    category: 'quality',
    estimatedHours: 40,
    dependsOn: '["clean-code-solid-patterns"]',
    isRequired: true,
  },

  // ── Domain 5: Cloud-Native DevOps: GitOps, Kubernetes & CI/CD ──
  {
    id: 'cloud-native-devops-gitops',
    slug: 'cloud-native-devops-gitops',
    title: 'Cloud-Native DevOps: GitOps, Kubernetes & Advanced CI/CD',
    category: 'devops',
    estimatedHours: 50,
    dependsOn: '["distributed-systems-sharding"]',
    isRequired: true,
  },

  // ── Domain 6: Deep Observability: OpenTelemetry, Prometheus & SRE ──
  {
    id: 'deep-observability-otel-sre',
    slug: 'deep-observability-otel-sre',
    title: 'Deep Observability: OpenTelemetry, Prometheus & SRE',
    category: 'observability',
    estimatedHours: 40,
    dependsOn: '["cloud-native-devops-gitops"]',
    isRequired: true,
  },
];

// ──────────────────────────────────────────────────────
// RESOURCES — Free & Open-Source Links per Topic
// ──────────────────────────────────────────────────────
const resources = [
  // ══════════════════════════════════════════════════════
  // Domain 0 — Fundamentals (no additional resources)
  // ══════════════════════════════════════════════════════

  // ══════════════════════════════════════════════════════
  // Domain 1 — Advanced Architecture & DDD
  // ══════════════════════════════════════════════════════

  // ── Videos ──
  { topicId: 'advanced-architecture-ddd', type: 'video', title: 'Refactoring from Anemic Models to DDD (Milan Jovanovic)', url: 'https://www.youtube.com/watch?v=B5oQ0lMjkrI', locale: 'en', durationMin: 45, quality: 5 },
  { topicId: 'advanced-architecture-ddd', type: 'video', title: 'Microservices Patterns: SAGA, CQRS, Event Sourcing', url: 'https://www.youtube.com/watch?v=VoY_cs7-04o', locale: 'en', durationMin: 60, quality: 5 },
  { topicId: 'advanced-architecture-ddd', type: 'video', title: 'Event-Driven Architecture & Sagas (AWS / EventBridge)', url: 'https://www.youtube.com/watch?v=PzzH-1y5yzE', locale: 'en', durationMin: 50, quality: 5 },
  { topicId: 'advanced-architecture-ddd', type: 'video', title: 'Real Case: Migration to Hexagonal Architecture & DDD', url: 'https://www.youtube.com/watch?v=wMj4GuvTwHI', locale: 'en', durationMin: 40, quality: 4 },
  { topicId: 'advanced-architecture-ddd', type: 'video', title: 'Intensive Course on Pragmatic & Clean Architecture', url: 'https://www.youtube.com/watch?v=TQdLgzVk2T8', locale: 'en', durationMin: 55, quality: 5 },
  { topicId: 'advanced-architecture-ddd', type: 'video', title: 'Clean Architecture vs Domain-Driven Design (Differences)', url: 'https://www.youtube.com/watch?v=eUW2CYAT1Nk', locale: 'en', durationMin: 35, quality: 4 },
  { topicId: 'advanced-architecture-ddd', type: 'video', title: 'Hexagonal Architecture Explained in 20 Minutes', url: 'https://www.youtube.com/watch?v=g7cNQB2kCgE', locale: 'en', durationMin: 20, quality: 4 },
  { topicId: 'advanced-architecture-ddd', type: 'video', title: 'CQRS Implementation with Real Examples', url: 'https://www.youtube.com/watch?v=DJCWpUVf5E0', locale: 'en', durationMin: 50, quality: 5 },
  { topicId: 'advanced-architecture-ddd', type: 'video', title: 'Application Layer in Clean Architecture In-Depth', url: 'https://www.youtube.com/watch?v=1OLSE6tX71Y', locale: 'en', durationMin: 40, quality: 4 },
  { topicId: 'advanced-architecture-ddd', type: 'video', title: 'Structuring and Modeling Domains Correctly', url: 'https://www.youtube.com/watch?v=MhoFCy_2-wQ', locale: 'en', durationMin: 45, quality: 5 },
  { topicId: 'advanced-architecture-ddd', type: 'video', title: 'DDD Style Clean Architecture in Go (Conference)', url: 'https://www.youtube.com/watch?v=4LfRdo9WALM', locale: 'en', durationMin: 40, quality: 4 },
  { topicId: 'advanced-architecture-ddd', type: 'video', title: 'Token Generation & the Infrastructure Layer', url: 'https://www.youtube.com/watch?v=fhM0V2N1GpY', locale: 'en', durationMin: 35, quality: 4 },
  { topicId: 'advanced-architecture-ddd', type: 'video', title: 'Pushing Business Logic Toward Domain Events (DDD)', url: 'https://www.youtube.com/watch?v=q74saF54w8I', locale: 'en', durationMin: 40, quality: 5 },
  { topicId: 'advanced-architecture-ddd', type: 'video', title: 'Avoiding Anemic Models & Anti-Patterns in DDD', url: 'https://www.youtube.com/watch?v=1Lcr2c3MVF4', locale: 'en', durationMin: 35, quality: 4 },
  { topicId: 'advanced-architecture-ddd', type: 'video', title: 'Pros and Cons of Implementing Domain-Driven Design', url: 'https://www.youtube.com/watch?v=UgEExav6CeE', locale: 'en', durationMin: 30, quality: 4 },
  { topicId: 'advanced-architecture-ddd', type: 'video', title: 'Decoupling the Frontend with Ports & Adapters', url: 'https://www.youtube.com/watch?v=07JAkHUoSKE', locale: 'en', durationMin: 40, quality: 4 },
  { topicId: 'advanced-architecture-ddd', type: 'video', title: 'Clean Architecture in the Browser & the DOM', url: 'https://www.youtube.com/watch?v=X-fiPnrFFPE', locale: 'en', durationMin: 35, quality: 4 },
  { topicId: 'advanced-architecture-ddd', type: 'video', title: 'ESLint for Hexagonal Architecture Enforcement', url: 'https://www.youtube.com/watch?v=bdnpXzgj1oY', locale: 'en', durationMin: 30, quality: 4 },
  { topicId: 'advanced-architecture-ddd', type: 'video', title: 'When YES and When NO to Use Hexagonal Architecture', url: 'https://www.youtube.com/watch?v=7j3PhEh0KUw', locale: 'en', durationMin: 35, quality: 5 },
  { topicId: 'advanced-architecture-ddd', type: 'video', title: 'SOLID Principles for Software Architecture', url: 'https://www.youtube.com/watch?v=GZ9ic9QSO5U', locale: 'en', durationMin: 50, quality: 4 },

  // ── Articles ──
  { topicId: 'advanced-architecture-ddd', type: 'article', title: 'CQRS Pattern — Martin Fowler', url: 'https://martinfowler.com/bliki/CQRS.html', locale: 'en', durationMin: 15, quality: 5 },
  { topicId: 'advanced-architecture-ddd', type: 'article', title: 'Hexagonal Architecture & Clean Architecture in TypeScript', url: 'https://dev.to/dyarleniber/hexagonal-architecture-and-clean-architecture-with-examples-48oi', locale: 'en', durationMin: 20, quality: 4 },
  { topicId: 'advanced-architecture-ddd', type: 'article', title: 'Clean Architecture: How to Write Clean, Testable & Scalable Code', url: 'https://medium.com/@_sroldan/clean-architecture-la-forma-de-crear-c%C3%B3digo-limpio-testable-y-escalable-9af26ccf2028', locale: 'en', durationMin: 15, quality: 4 },
  { topicId: 'advanced-architecture-ddd', type: 'article', title: 'Ready for Changes with Hexagonal Architecture (Netflix)', url: 'https://netflixtechblog.com/ready-for-changes-with-hexagonal-architecture-b315ec967749', locale: 'en', durationMin: 20, quality: 5 },
  { topicId: 'advanced-architecture-ddd', type: 'article', title: 'Differences Between Hexagonal, Clean & Onion Architectures', url: 'https://medium.com/@diego.coder/introducci%C3%B3n-a-las-clean-architectures-723fe9fe17fa', locale: 'en', durationMin: 15, quality: 4 },
  { topicId: 'advanced-architecture-ddd', type: 'article', title: 'Hexagonal Architecture Part One (Clean Architecture)', url: 'https://medium.com/@edusalguero/arquitectura-hexagonal-59834bb44b7f', locale: 'en', durationMin: 15, quality: 4 },
  { topicId: 'advanced-architecture-ddd', type: 'article', title: 'Complete Guide to System Design & Architectural Styles', url: 'https://dev.to/fahimulhaq/complete-guide-to-system-design-oc7', locale: 'en', durationMin: 30, quality: 5 },
  { topicId: 'advanced-architecture-ddd', type: 'article', title: 'CQRS Architecture: How It Works Internally', url: 'https://medium.com/@90mandalchandan/cqrs-architecture-how-it-works-5f18a36886ea', locale: 'en', durationMin: 20, quality: 4 },
  { topicId: 'advanced-architecture-ddd', type: 'article', title: 'System Design Interview Course (ByteByteGo)', url: 'https://bytebytego.com/courses/system-design-interview', locale: 'en', durationMin: 60, quality: 5 },
  { topicId: 'advanced-architecture-ddd', type: 'article', title: 'How I Learned System Design In-Depth (Senior Reflection)', url: 'https://medium.com/@himanshusingour7/how-i-learned-system-design-d7444d454367', locale: 'en', durationMin: 20, quality: 4 },
  { topicId: 'advanced-architecture-ddd', type: 'article', title: 'CQRS Pattern: Advantages of Separating Commands & Queries', url: 'https://medium.com/learn-agile-practices/cqrs-pattern-advantages-of-command-and-queries-fd83396dd942', locale: 'en', durationMin: 15, quality: 4 },
  { topicId: 'advanced-architecture-ddd', type: 'article', title: 'Simply Order Part 9: CQRS Pattern — Separating Reads from Writes', url: 'https://dev.to/hassan314159/simply-order-part-9-cqrs-pattern-separating-reads-from-writes-for-better-performance-434', locale: 'en', durationMin: 20, quality: 4 },
  { topicId: 'advanced-architecture-ddd', type: 'article', title: 'CQRS & SAGA: Essential Patterns for High-Performance Microservices', url: 'https://medium.com/@ingila185/cqrs-and-saga-the-essential-patterns-for-high-performance-microservice-4f23a09889b4', locale: 'en', durationMin: 20, quality: 4 },
  { topicId: 'advanced-architecture-ddd', type: 'article', title: 'Hexagonal Architecture & DDD in Spring Boot Microservices', url: 'https://dev.to/onepoint/hexagonal-architecture-and-domain-driven-design-fio', locale: 'en', durationMin: 25, quality: 4 },
  { topicId: 'advanced-architecture-ddd', type: 'article', title: 'Hexagonal Architecture: There Are Always Two Sides', url: 'https://medium.com/ssense-tech/hexagonal-architecture-there-are-always-two-sides-to-every-story-bc0780ed7d9c', locale: 'en', durationMin: 15, quality: 4 },
  { topicId: 'advanced-architecture-ddd', type: 'article', title: 'Event-Driven Hexagonal Architecture: RabbitMQ + Clean Arch', url: 'https://medium.com/@ayoubelmaalmi/event-driven-hexagonal-architecture-integrating-rabbitmq-with-clean-architecture-principles-d9a5aaa2cd4e', locale: 'en', durationMin: 25, quality: 4 },
  { topicId: 'advanced-architecture-ddd', type: 'article', title: 'Event-Driven, Event Sourcing & CQRS: How They Converge', url: 'https://dev.to/yasmine_ddec94f4d4/event-driven-architecture-event-sourcing-and-cqrs-how-they-work-together-1bp1', locale: 'en', durationMin: 25, quality: 5 },
  { topicId: 'advanced-architecture-ddd', type: 'article', title: 'Application Architecture — Martin Fowler Repository', url: 'https://martinfowler.com/tags/application%20architecture.html', locale: 'en', durationMin: 30, quality: 5 },
  { topicId: 'advanced-architecture-ddd', type: 'article', title: 'Hexagonal Architecture & Rails Discussion (Martin Fowler)', url: 'https://martinfowler.com/articles/badri-hexagonal/', locale: 'en', durationMin: 20, quality: 5 },
  { topicId: 'advanced-architecture-ddd', type: 'article', title: 'Event Sourcing: Resolving Mutable State Persistence', url: 'https://microservices.io/patterns/data/event-sourcing.html', locale: 'en', durationMin: 15, quality: 5 },

  // ══════════════════════════════════════════════════════
  // Domain 2 — Distributed Systems, Sharding & Load Balancing
  // ══════════════════════════════════════════════════════

  // ── Videos ──
  { topicId: 'distributed-systems-sharding', type: 'video', title: 'Complete System Design Course (Database Concepts)', url: 'https://www.youtube.com/watch?v=C842vFY5kRo', locale: 'en', durationMin: 120, quality: 5 },
  { topicId: 'distributed-systems-sharding', type: 'video', title: 'Advanced Architecture Considerations (Cache & APIs)', url: 'https://www.youtube.com/watch?v=m8Icp_Cid5o', locale: 'en', durationMin: 50, quality: 4 },
  { topicId: 'distributed-systems-sharding', type: 'video', title: 'Consistent Hashing Explained (ByteByteGo)', url: 'https://www.youtube.com/watch?v=UF9Iqmg94tk', locale: 'en', durationMin: 20, quality: 5 },
  { topicId: 'distributed-systems-sharding', type: 'video', title: 'SD2 to SD3 Interview Preparation Guide', url: 'https://www.youtube.com/watch?v=CC-AxHIgBSM', locale: 'en', durationMin: 45, quality: 4 },
  { topicId: 'distributed-systems-sharding', type: 'video', title: 'Load Balancer Topologies & Fault Tolerance', url: 'https://www.youtube.com/watch?v=F2FmTdLtb_4', locale: 'en', durationMin: 40, quality: 5 },
  { topicId: 'distributed-systems-sharding', type: 'video', title: 'Design at Scale: Mitigating Latency in Microservices', url: 'https://www.youtube.com/watch?v=sBDod7Ip19g', locale: 'en', durationMin: 50, quality: 4 },
  { topicId: 'distributed-systems-sharding', type: 'video', title: 'Consistent Hashing: How Ring Replication Works', url: 'https://www.youtube.com/watch?v=NLMZzElM8Z4', locale: 'en', durationMin: 25, quality: 5 },
  { topicId: 'distributed-systems-sharding', type: 'video', title: 'Database Indexes vs Sharding: When to Use Which', url: 'https://www.youtube.com/watch?v=BTjxUS_PylA', locale: 'en', durationMin: 30, quality: 4 },
  { topicId: 'distributed-systems-sharding', type: 'video', title: 'Alerts & Telemetry in Large-Scale Patterns', url: 'https://www.youtube.com/watch?v=Qd9tJ3H_hPE', locale: 'en', durationMin: 35, quality: 4 },
  { topicId: 'distributed-systems-sharding', type: 'video', title: 'When (and Why) to Shard Your Database', url: 'https://www.youtube.com/watch?v=iHNovZUZM3A', locale: 'en', durationMin: 30, quality: 5 },
  { topicId: 'distributed-systems-sharding', type: 'video', title: 'How Indexes Work (B-Trees vs Heaps)', url: 'https://www.youtube.com/watch?v=Jemuod4wKWo', locale: 'en', durationMin: 25, quality: 5 },
  { topicId: 'distributed-systems-sharding', type: 'video', title: 'Optimizing "Select *" & Table Scans', url: 'https://www.youtube.com/watch?v=-qNSXK7s7_w', locale: 'en', durationMin: 20, quality: 4 },
  { topicId: 'distributed-systems-sharding', type: 'video', title: 'The Write Cost of Indexes on SSDs', url: 'https://www.youtube.com/watch?v=YirvKh1jP9k', locale: 'en', durationMin: 20, quality: 4 },
  { topicId: 'distributed-systems-sharding', type: 'video', title: 'System Design in Software Is an Art', url: 'https://www.youtube.com/watch?v=rd1VmW7ItD4', locale: 'en', durationMin: 40, quality: 4 },
  { topicId: 'distributed-systems-sharding', type: 'video', title: 'Sharding vs Partitioning vs Replication Explained', url: 'https://www.youtube.com/watch?v=jLEp1XI_L6Q', locale: 'en', durationMin: 25, quality: 5 },
  { topicId: 'distributed-systems-sharding', type: 'video', title: 'Socket Management in Backend & OS Calls (Epoll)', url: 'https://www.youtube.com/watch?v=x9iHwoAbwiA', locale: 'en', durationMin: 35, quality: 4 },
  { topicId: 'distributed-systems-sharding', type: 'video', title: 'TCP vs UDP: The Cost of Multiplexing in HTTP/2', url: 'https://www.youtube.com/watch?v=ixuSv0k-jWU', locale: 'en', durationMin: 30, quality: 4 },
  { topicId: 'distributed-systems-sharding', type: 'video', title: 'Optimizing Network Headers for High-Load Systems', url: 'https://www.youtube.com/watch?v=o5S0-_vniiM', locale: 'en', durationMin: 25, quality: 4 },
  { topicId: 'distributed-systems-sharding', type: 'video', title: 'Internal Routing & NAT in Infrastructure', url: 'https://www.youtube.com/watch?v=iV5fajdpb7c', locale: 'en', durationMin: 25, quality: 4 },
  { topicId: 'distributed-systems-sharding', type: 'video', title: 'Transaction Locking & Advanced ACID', url: 'https://www.youtube.com/watch?v=HibHalGlIes', locale: 'en', durationMin: 35, quality: 5 },

  // ── Articles ──
  { topicId: 'distributed-systems-sharding', type: 'article', title: 'Scale From Zero to Millions of Users (ByteByteGo)', url: 'https://bytebytego.com/courses/system-design-interview/scale-from-zero-to-millions-of-users', locale: 'en', durationMin: 45, quality: 5 },
  { topicId: 'distributed-systems-sharding', type: 'article', title: 'Master Class: Scaling with Sharding & Consistent Hashing', url: 'https://dev.to/piyush6348/master-class-scaling-databases-with-sharding-partitioning-and-consistent-hashing-44p1', locale: 'en', durationMin: 30, quality: 5 },
  { topicId: 'distributed-systems-sharding', type: 'article', title: 'Database Sharding: Horizontal Scaling Strategies', url: 'https://dev.to/matt_frank_usa/database-sharding-horizontal-scaling-strategies-3b07', locale: 'en', durationMin: 25, quality: 4 },
  { topicId: 'distributed-systems-sharding', type: 'article', title: 'Designing the Consistent Hashing Algorithm (ByteByteGo)', url: 'https://bytebytego.com/courses/system-design-interview/design-consistent-hashing', locale: 'en', durationMin: 20, quality: 5 },
  { topicId: 'distributed-systems-sharding', type: 'article', title: 'Understanding Consistent Hashing for Dummies & Pros', url: 'https://medium.com/@ssshubhamsharma4/understanding-consistent-hashing-the-key-to-scalable-distributed-systems-2a92e833057f', locale: 'en', durationMin: 20, quality: 4 },
  { topicId: 'distributed-systems-sharding', type: 'article', title: 'Sharding vs Consistent Hashing: Clearing the Confusion', url: 'https://medium.com/@mitnitesh1/sharding-vs-consistent-hashing-37c52d570851', locale: 'en', durationMin: 15, quality: 4 },
  { topicId: 'distributed-systems-sharding', type: 'article', title: 'Scaling Time Series Data Storage (Netflix Tech Blog)', url: 'https://netflixtechblog.com/scaling-time-series-data-storage-part-ii-d67939655586', locale: 'en', durationMin: 25, quality: 5 },
  { topicId: 'distributed-systems-sharding', type: 'article', title: 'Dynomite: Making Non-Distributed DBs Distributed (Netflix)', url: 'https://netflixtechblog.com/introducing-dynomite-making-non-distributed-databases-distributed-c7bce3d89404', locale: 'en', durationMin: 20, quality: 5 },
  { topicId: 'distributed-systems-sharding', type: 'article', title: 'Database Indexing at Expert Level — Baeldung', url: 'https://www.baeldung.com/sql/databases-indexing', locale: 'en', durationMin: 25, quality: 5 },
  { topicId: 'distributed-systems-sharding', type: 'article', title: 'Database Sharding vs Partitioning — Baeldung', url: 'https://www.baeldung.com/cs/database-sharding-vs-partitioning', locale: 'en', durationMin: 20, quality: 5 },
  { topicId: 'distributed-systems-sharding', type: 'article', title: 'Apache ShardingSphere for Java & Distributed SQL', url: 'https://www.baeldung.com/java-shardingsphere', locale: 'en', durationMin: 30, quality: 4 },
  { topicId: 'distributed-systems-sharding', type: 'article', title: 'Awesome Low-Level Design (GitHub)', url: 'https://github.com/ashishps1/awesome-low-level-design', locale: 'en', durationMin: 60, quality: 4 },
  { topicId: 'distributed-systems-sharding', type: 'article', title: 'Awesome System Design for Big Data (GitHub)', url: 'https://github.com/madd86/awesome-system-design', locale: 'en', durationMin: 60, quality: 4 },
  { topicId: 'distributed-systems-sharding', type: 'article', title: 'Comprehensive System Design Interview Resources', url: 'https://leetcode.com/discuss/interview-question/5607132/Awesome-System-Design%3A-Resources-and-Insights/', locale: 'en', durationMin: 30, quality: 4 },
  { topicId: 'distributed-systems-sharding', type: 'article', title: 'Awesome System Design Resources (GitHub)', url: 'https://github.com/ashishps1/awesome-system-design-resources', locale: 'en', durationMin: 60, quality: 4 },
  { topicId: 'distributed-systems-sharding', type: 'article', title: 'Introduction to Software Architecture Patterns (FreeCodeCamp)', url: 'https://www.freecodecamp.org/news/an-introduction-to-software-architecture-patterns/', locale: 'en', durationMin: 30, quality: 4 },
  { topicId: 'distributed-systems-sharding', type: 'article', title: 'Learn Software System Design (FreeCodeCamp)', url: 'https://www.freecodecamp.org/news/learn-software-system-design/', locale: 'en', durationMin: 45, quality: 4 },
  { topicId: 'distributed-systems-sharding', type: 'article', title: 'Fundamentals of Software Architecture', url: 'https://dev.to/ipazooki/fundamentals-of-software-architecture-44ia', locale: 'en', durationMin: 20, quality: 4 },
  { topicId: 'distributed-systems-sharding', type: 'article', title: 'Mastering the Art of Software Architecture', url: 'https://dev.to/devcorner/mastering-the-art-of-software-architecture-a-comprehensive-guide-5f5g', locale: 'en', durationMin: 25, quality: 4 },
  { topicId: 'distributed-systems-sharding', type: 'article', title: 'Top Backend Development YouTube Channels', url: 'https://publication.masteringbackend.com/top-5-backend-development-youtube-channels-7d19aeba062b', locale: 'en', durationMin: 15, quality: 3 },

  // ══════════════════════════════════════════════════════
  // Domain 3 — Clean Code, SOLID & Refactoring
  // ══════════════════════════════════════════════════════

  // ── Videos ──
  { topicId: 'clean-code-solid-patterns', type: 'video', title: 'The Scout Rule for Sustainable Code', url: 'https://www.youtube.com/watch?v=4GEM9DzkuXE', locale: 'en', durationMin: 30, quality: 4 },
  { topicId: 'clean-code-solid-patterns', type: 'video', title: 'Frontend Components: The Screaming Architecture', url: 'https://www.youtube.com/watch?v=eNFAJbWCSww', locale: 'en', durationMin: 40, quality: 4 },
  { topicId: 'clean-code-solid-patterns', type: 'video', title: 'Practical Refactoring: Bloaters & Smells', url: 'https://www.youtube.com/watch?v=3n-nkx4s5mw', locale: 'en', durationMin: 45, quality: 5 },
  { topicId: 'clean-code-solid-patterns', type: 'video', title: 'The Observer Pattern & Preventing Callback Hell', url: 'https://www.youtube.com/watch?v=BJatgOiiht4', locale: 'en', durationMin: 30, quality: 4 },
  { topicId: 'clean-code-solid-patterns', type: 'video', title: 'When & Why to Start Refactoring Code (Martin Fowler)', url: 'https://www.youtube.com/watch?v=8PGNAcAO6fs', locale: 'en', durationMin: 40, quality: 5 },
  { topicId: 'clean-code-solid-patterns', type: 'video', title: 'Dependency Inversion Principle in Practice', url: 'https://www.youtube.com/watch?v=Z4VjlfvP80E', locale: 'en', durationMin: 35, quality: 4 },
  { topicId: 'clean-code-solid-patterns', type: 'video', title: 'Replacing Instances with Static Methods (Refactor)', url: 'https://www.youtube.com/watch?v=immGpH8Sgow', locale: 'en', durationMin: 25, quality: 4 },
  { topicId: 'clean-code-solid-patterns', type: 'video', title: 'TDD & Incremental Design (Dave Farley)', url: 'https://www.youtube.com/watch?v=h-3z8i-MwFg', locale: 'en', durationMin: 50, quality: 5 },
  { topicId: 'clean-code-solid-patterns', type: 'video', title: 'The Real Power & Benefits of TDD', url: 'https://www.youtube.com/watch?v=ln4WnxX-wrw', locale: 'en', durationMin: 45, quality: 5 },
  { topicId: 'clean-code-solid-patterns', type: 'video', title: 'Continuous Delivery: The Infallible Development Framework', url: 'https://www.youtube.com/watch?v=tQMrrNo16jo', locale: 'en', durationMin: 50, quality: 5 },
  { topicId: 'clean-code-solid-patterns', type: 'video', title: 'Why Continuous Delivery Ensures Code Quality', url: 'https://www.youtube.com/watch?v=bIolJv_bWtg', locale: 'en', durationMin: 35, quality: 4 },
  { topicId: 'clean-code-solid-patterns', type: 'video', title: 'Continuous Deployment vs Continuous Delivery', url: 'https://www.youtube.com/watch?v=kgYhZOzb6EM', locale: 'en', durationMin: 25, quality: 4 },
  { topicId: 'clean-code-solid-patterns', type: 'video', title: 'SOLID Principles Applied to the Real World (CodelyTV)', url: 'https://www.youtube.com/watch?v=GZ9ic9QSO5U', locale: 'en', durationMin: 50, quality: 5 },
  { topicId: 'clean-code-solid-patterns', type: 'video', title: '7 Vital Design Patterns for Senior Devs', url: 'https://www.youtube.com/watch?v=6g6_nM7vCXc', locale: 'en', durationMin: 40, quality: 5 },
  { topicId: 'clean-code-solid-patterns', type: 'video', title: 'Principles to Not Over-Complicate Your Code (KISS, YAGNI)', url: 'https://www.youtube.com/watch?v=7siybJhBwx4', locale: 'en', durationMin: 30, quality: 4 },
  { topicId: 'clean-code-solid-patterns', type: 'video', title: 'Modular Design in Java & Creational Patterns', url: 'https://www.youtube.com/watch?v=BDsCCtFl8WE', locale: 'en', durationMin: 55, quality: 4 },
  { topicId: 'clean-code-solid-patterns', type: 'video', title: 'Understanding CI/CD & Automation Basics', url: 'https://www.youtube.com/watch?v=9PgZCJNzY9M', locale: 'en', durationMin: 40, quality: 4 },
  { topicId: 'clean-code-solid-patterns', type: 'video', title: 'Sustainable & Clean Code (Book in Action)', url: 'https://www.youtube.com/watch?v=oshQg1uSRvg', locale: 'en', durationMin: 45, quality: 4 },
  { topicId: 'clean-code-solid-patterns', type: 'video', title: 'TDD: Test Driven Development from Scratch', url: 'https://www.youtube.com/watch?v=MtDFK-evWw4', locale: 'en', durationMin: 50, quality: 5 },
  { topicId: 'clean-code-solid-patterns', type: 'video', title: 'Code Smells: Change Preventers', url: 'https://www.youtube.com/watch?v=LzMnsfqjzkA', locale: 'en', durationMin: 25, quality: 4 },

  // ── Articles ──
  { topicId: 'clean-code-solid-patterns', type: 'article', title: 'Design Pattern Catalog (Refactoring.Guru)', url: 'https://refactoring.guru/design-patterns', locale: 'en', durationMin: 60, quality: 5 },
  { topicId: 'clean-code-solid-patterns', type: 'article', title: 'Mastering SOLID, Design Patterns & Refactoring', url: 'https://medium.com/@elrafamaritza/mastering-solid-principles-design-patterns-and-refactoring-a-comprehensive-guide-to-enhancing-fd7df58bc49c', locale: 'en', durationMin: 30, quality: 4 },
  { topicId: 'clean-code-solid-patterns', type: 'article', title: 'Refactoring & Patterns Portal (Refactoring.Guru)', url: 'https://refactoring.guru/', locale: 'en', durationMin: 60, quality: 5 },
  { topicId: 'clean-code-solid-patterns', type: 'article', title: 'Practical Introduction to SOLID Principles (Baeldung)', url: 'https://www.baeldung.com/solid-principles', locale: 'en', durationMin: 25, quality: 5 },
  { topicId: 'clean-code-solid-patterns', type: 'article', title: 'The Art of Clean Code: Mastering SOLID Principles', url: 'https://dev.to/krishna_kumarshakya_848d/the-art-of-clean-code-mastering-the-solid-principles-1n36', locale: 'en', durationMin: 20, quality: 4 },
  { topicId: 'clean-code-solid-patterns', type: 'article', title: 'What Is Clean Code — SOLID & Why We Use It', url: 'https://medium.com/@kadergenc/what-is-clean-code-solid-why-should-we-use-it-fcb52c214bb4', locale: 'en', durationMin: 15, quality: 4 },
  { topicId: 'clean-code-solid-patterns', type: 'article', title: 'KISS, DRY, YAGNI, TDA: Micro-Design Tools', url: 'https://medium.com/@hlfdev/kiss-dry-solid-yagni-a-simple-guide-to-some-principles-of-software-engineering-and-clean-code-05e60233c79f', locale: 'en', durationMin: 15, quality: 4 },
  { topicId: 'clean-code-solid-patterns', type: 'article', title: 'The S.O.L.I.D. Principles for Clean Code (Deep Dive)', url: 'https://sayansingha.medium.com/the-s-o-l-i-d-principles-clean-code-9fcca658dab5', locale: 'en', durationMin: 20, quality: 4 },
  { topicId: 'clean-code-solid-patterns', type: 'article', title: 'What Is Code Refactoring Exactly? (Refactoring.Guru)', url: 'https://refactoring.guru/refactoring/what-is-refactoring', locale: 'en', durationMin: 10, quality: 5 },
  { topicId: 'clean-code-solid-patterns', type: 'article', title: 'Implementing the 5 SOLID Principles with Examples (FreeCodeCamp)', url: 'https://www.freecodecamp.org/news/solid-design-principles-in-software-development/', locale: 'en', durationMin: 30, quality: 5 },
  { topicId: 'clean-code-solid-patterns', type: 'article', title: 'The Clean Code Handbook: 12 Patterns for Agile Projects', url: 'https://www.freecodecamp.org/news/the-clean-code-handbook/', locale: 'en', durationMin: 30, quality: 4 },
  { topicId: 'clean-code-solid-patterns', type: 'article', title: 'Top 17 Must-Have Resources for Refactoring Excellence', url: 'https://dev.to/vaib/top-17-must-have-resources-for-software-refactoring-excellence-3om2', locale: 'en', durationMin: 15, quality: 4 },
  { topicId: 'clean-code-solid-patterns', type: 'article', title: 'Awesome Clean Code (GitHub)', url: 'https://github.com/kkisiele/awesome-clean-code', locale: 'en', durationMin: 30, quality: 4 },
  { topicId: 'clean-code-solid-patterns', type: 'article', title: 'Real-World Clean Code Examples & Smells (CodelyTV)', url: 'https://github.com/CodelyTV/awesome-clean_code-examples', locale: 'en', durationMin: 30, quality: 5 },
  { topicId: 'clean-code-solid-patterns', type: 'article', title: 'Screencasts on Best Practices (CodelyTV GitHub)', url: 'https://github.com/CodelyTV/youtube-code-examples', locale: 'en', durationMin: 45, quality: 4 },
  { topicId: 'clean-code-solid-patterns', type: 'article', title: 'Awesome Clean Code Projects Across Languages', url: 'https://github.com/kavaan/awesome-clean-code-projects-across-languages-and-framework', locale: 'en', durationMin: 30, quality: 4 },
  { topicId: 'clean-code-solid-patterns', type: 'article', title: 'Clean Code JavaScript (GitHub)', url: 'https://github.com/ryanmcdermott/clean-code-javascript', locale: 'en', durationMin: 45, quality: 5 },
  { topicId: 'clean-code-solid-patterns', type: 'article', title: 'Best Repos to See Elegant Code (Reddit)', url: 'https://www.reddit.com/r/learnprogramming/comments/x78ofk/what_are_the_best_repos_that_are_a_display_of/', locale: 'en', durationMin: 15, quality: 3 },
  { topicId: 'clean-code-solid-patterns', type: 'article', title: 'Mathematical Foundations Behind Code Smells', url: 'https://refactoring.guru/', locale: 'en', durationMin: 30, quality: 5 },
  { topicId: 'clean-code-solid-patterns', type: 'article', title: 'Differences Between Common Code Smells (Bloaters, Dispensables)', url: 'https://refactoring.guru/', locale: 'en', durationMin: 20, quality: 5 },

  // ══════════════════════════════════════════════════════
  // Domain 4 — Elite QA: Mutation, Contract & Architecture Testing
  // ══════════════════════════════════════════════════════

  // ── Videos ──
  { topicId: 'elite-qa-mutation-contract', type: 'video', title: 'Mutation Testing: Test Your Own Tests', url: 'https://www.youtube.com/watch?v=9BoKyeZapLs', locale: 'en', durationMin: 40, quality: 5 },
  { topicId: 'elite-qa-mutation-contract', type: 'video', title: 'Java Architecture Testing Using ArchUnit', url: 'https://www.youtube.com/watch?v=sGmhaizFcEA', locale: 'en', durationMin: 45, quality: 4 },
  { topicId: 'elite-qa-mutation-contract', type: 'video', title: 'Defending Business Rules with Architectural TDD', url: 'https://www.youtube.com/watch?v=gp689Jwc1Go', locale: 'en', durationMin: 35, quality: 5 },
  { topicId: 'elite-qa-mutation-contract', type: 'video', title: 'The Danger of Assuming Everything Works Without ArchUnit', url: 'https://www.youtube.com/watch?v=MxP521_i9zM', locale: 'en', durationMin: 40, quality: 4 },
  { topicId: 'elite-qa-mutation-contract', type: 'video', title: 'Introduction to Contract Testing (Pact / Playwright)', url: 'https://www.youtube.com/watch?v=iigciLNbyu8', locale: 'en', durationMin: 50, quality: 5 },
  { topicId: 'elite-qa-mutation-contract', type: 'video', title: 'Freelancing: Maintaining Legacy Code & Mutation Testing', url: 'https://www.youtube.com/watch?v=3frWBFT3CsA', locale: 'en', durationMin: 35, quality: 4 },
  { topicId: 'elite-qa-mutation-contract', type: 'video', title: 'Playwright Automation & Complex UI Testing', url: 'https://www.youtube.com/watch?v=uZGbzP2Y2JY', locale: 'en', durationMin: 60, quality: 4 },
  { topicId: 'elite-qa-mutation-contract', type: 'video', title: 'Full QA Automation Masters Program', url: 'https://www.youtube.com/watch?v=sO8eGL6SFsA', locale: 'en', durationMin: 180, quality: 4 },
  { topicId: 'elite-qa-mutation-contract', type: 'video', title: 'Modern UI Testing Tools: Cypress vs Playwright', url: 'https://www.youtube.com/watch?v=AKLuQaPWcdg', locale: 'en', durationMin: 35, quality: 5 },
  { topicId: 'elite-qa-mutation-contract', type: 'video', title: 'Automated Testing Manual from Scratch', url: 'https://www.youtube.com/watch?v=72nT2AjlS6s', locale: 'en', durationMin: 90, quality: 4 },
  { topicId: 'elite-qa-mutation-contract', type: 'video', title: 'How QA Differs from QC', url: 'https://www.youtube.com/watch?v=XIcOWh_psSI', locale: 'en', durationMin: 20, quality: 3 },
  { topicId: 'elite-qa-mutation-contract', type: 'video', title: 'Traceability & Real Test Case Matrices', url: 'https://www.youtube.com/watch?v=tu2pB6VxRcw', locale: 'en', durationMin: 30, quality: 4 },
  { topicId: 'elite-qa-mutation-contract', type: 'video', title: 'Logs & Test Fails: How to Analyze Failures Quickly', url: 'https://www.youtube.com/watch?v=wv9stsMynC4', locale: 'en', durationMin: 35, quality: 4 },
  { topicId: 'elite-qa-mutation-contract', type: 'video', title: 'Automation & Building Test Environments with Docker', url: 'https://www.youtube.com/watch?v=c5T0UkuD-6g', locale: 'en', durationMin: 45, quality: 4 },
  { topicId: 'elite-qa-mutation-contract', type: 'video', title: 'CircleCI for Testing in Pipelines', url: 'https://www.youtube.com/watch?v=o-ym035R1eY', locale: 'en', durationMin: 30, quality: 4 },
  { topicId: 'elite-qa-mutation-contract', type: 'video', title: 'Full GitOps, Testing & Deployment Integration', url: 'https://www.youtube.com/watch?v=yu2xFcX6nTY', locale: 'en', durationMin: 50, quality: 5 },
  { topicId: 'elite-qa-mutation-contract', type: 'video', title: 'CI Testing in Docker / Node.js', url: 'https://www.youtube.com/watch?v=Tq0vZU7Hp_M', locale: 'en', durationMin: 40, quality: 4 },
  { topicId: 'elite-qa-mutation-contract', type: 'video', title: 'ArgoCD: Continuous Deployment of Tested Artifacts', url: 'https://www.youtube.com/watch?v=AE5xTLV3qMk', locale: 'en', durationMin: 40, quality: 4 },
  { topicId: 'elite-qa-mutation-contract', type: 'video', title: 'The Role of a QA Automation Engineer & Interviews', url: 'https://www.youtube.com/watch?v=cC0V1LRDeLs', locale: 'en', durationMin: 45, quality: 3 },
  { topicId: 'elite-qa-mutation-contract', type: 'video', title: 'JMeter vs Selenium: Integrating Tests in Jenkins', url: 'https://www.youtube.com/watch?v=iV1dSjdFKpg', locale: 'en', durationMin: 50, quality: 4 },

  // ── Articles ──
  { topicId: 'elite-qa-mutation-contract', type: 'article', title: 'Test Your Software Architecture with ArchUnit', url: 'https://medium.com/@erkndmrl/test-your-software-architecture-with-archunit-12acb218f37e', locale: 'en', durationMin: 20, quality: 4 },
  { topicId: 'elite-qa-mutation-contract', type: 'article', title: 'A Complete Guide on Mutation Testing', url: 'https://medium.com/@sylvain.tiset/a-complete-guide-on-mutation-testing-b924563066e6', locale: 'en', durationMin: 25, quality: 5 },
  { topicId: 'elite-qa-mutation-contract', type: 'article', title: 'ArchUnit Introduction — Baeldung', url: 'https://www.baeldung.com/java-archunit-intro', locale: 'en', durationMin: 25, quality: 5 },
  { topicId: 'elite-qa-mutation-contract', type: 'article', title: 'Test Your Integrations at Scale (Contract Testing with Pact)', url: 'https://medium.com/@engineering.blog_40492/test-your-integrations-at-scale-c29e34d3a2a2', locale: 'en', durationMin: 25, quality: 4 },
  { topicId: 'elite-qa-mutation-contract', type: 'article', title: 'Pact.io Official Documentation', url: 'https://docs.pact.io/', locale: 'en', durationMin: 60, quality: 5 },
  { topicId: 'elite-qa-mutation-contract', type: 'article', title: 'Pact.io — Contract Testing Framework', url: 'https://pact.io/', locale: 'en', durationMin: 30, quality: 5 },
  { topicId: 'elite-qa-mutation-contract', type: 'article', title: 'K6: Modern Load Testing Scripts (Grafana)', url: 'https://k6.io/', locale: 'en', durationMin: 45, quality: 5 },
  { topicId: 'elite-qa-mutation-contract', type: 'article', title: 'Playwright Framework for UI & E2E Testing', url: 'https://dev.to/playwright', locale: 'en', durationMin: 30, quality: 5 },
  { topicId: 'elite-qa-mutation-contract', type: 'article', title: 'Preventing Architectural Drift Using LLMs & ArchUnit', url: 'https://dev.to/sasha_podles/from-prompts-to-invariants-re-architecting-systems-with-archunit-and-llms-1n50', locale: 'en', durationMin: 20, quality: 4 },
  { topicId: 'elite-qa-mutation-contract', type: 'article', title: 'When Your Mocks Lie: Contract Testing vs Mocks', url: 'https://dev.to/kevinccbsg/when-your-mocks-lie-contract-testing-with-twd-2e58', locale: 'en', durationMin: 15, quality: 4 },
  { topicId: 'elite-qa-mutation-contract', type: 'article', title: 'Architecture Testing — Complex Examples (Java)', url: 'https://medium.com/@dmitry-ivanov/architecture-testing-d918a3df2ba5', locale: 'en', durationMin: 20, quality: 4 },
  { topicId: 'elite-qa-mutation-contract', type: 'article', title: 'Advanced C# Testing: Property-Based & Mutation Testing', url: 'https://dev.to/chakewitz/advanced-c-testing-property-based-testing-and-mutation-testing-n3e', locale: 'en', durationMin: 25, quality: 4 },
  { topicId: 'elite-qa-mutation-contract', type: 'article', title: 'K6, .NET Aspire & Seamless Load Testing', url: 'https://dev.to/foxminchan/k6-net-aspire-seamless-load-testing-12gm', locale: 'en', durationMin: 20, quality: 4 },
  { topicId: 'elite-qa-mutation-contract', type: 'article', title: 'Modern Load Testing as Code with K6', url: 'https://dev.to/darlangui/k6-modern-load-testing-m6o', locale: 'en', durationMin: 20, quality: 4 },
  { topicId: 'elite-qa-mutation-contract', type: 'article', title: 'Load Testing a Go API Using K6', url: 'https://dev.to/eminetto/load-testing-using-k6-57ph', locale: 'en', durationMin: 20, quality: 4 },
  { topicId: 'elite-qa-mutation-contract', type: 'article', title: 'API Performance Testing with K6 — Quick Start Guide', url: 'https://dev.to/nadirbasalamah/api-performance-testing-with-k6-a-quick-start-guide-2ngc', locale: 'en', durationMin: 15, quality: 4 },
  { topicId: 'elite-qa-mutation-contract', type: 'article', title: 'Enforcing Clean Architecture with ArchUnit', url: 'https://medium.com/@jugurtha.aitoufella/enforcing-and-testing-your-java-clean-architecture-project-with-archunit-56569f3fd547', locale: 'en', durationMin: 20, quality: 4 },
  { topicId: 'elite-qa-mutation-contract', type: 'article', title: 'Mutation Testing with Pitest — Baeldung', url: 'https://www.baeldung.com/java-mutation-testing-with-pitest', locale: 'en', durationMin: 25, quality: 5 },
  { topicId: 'elite-qa-mutation-contract', type: 'article', title: 'Consumer-Driven Contract Testing with Pact Step by Step', url: 'https://dev.to/rogervinas/contract-testing-with-pact-4g2n', locale: 'en', durationMin: 25, quality: 4 },
  { topicId: 'elite-qa-mutation-contract', type: 'article', title: 'Measure Test Quality with Mutation Testing', url: 'https://dev.to/agileactors/measure-the-quality-of-your-tests-with-mutation-testing-1bcd', locale: 'en', durationMin: 15, quality: 4 },

  // ══════════════════════════════════════════════════════
  // Domain 5 — Cloud-Native DevOps: GitOps, K8s & CI/CD
  // ══════════════════════════════════════════════════════

  // ── Videos ──
  { topicId: 'cloud-native-devops-gitops', type: 'video', title: 'Increasing Security & CI/CD Using GitOps', url: 'https://www.youtube.com/watch?v=f5EpcWp0THw', locale: 'en', durationMin: 40, quality: 4 },
  { topicId: 'cloud-native-devops-gitops', type: 'video', title: 'Self-Healing in Kubernetes & ArgoCD Automation', url: 'https://www.youtube.com/watch?v=p-kAqxuJNik', locale: 'en', durationMin: 35, quality: 5 },
  { topicId: 'cloud-native-devops-gitops', type: 'video', title: 'ArgoCD Syncing vs Drift: Manual State Reversions', url: 'https://www.youtube.com/watch?v=MeU5_k9ssrs', locale: 'en', durationMin: 30, quality: 4 },
  { topicId: 'cloud-native-devops-gitops', type: 'video', title: 'The Danger of Altering Helm Manifests Manually', url: 'https://www.youtube.com/watch?v=e6Wmu77HoV8', locale: 'en', durationMin: 20, quality: 4 },
  { topicId: 'cloud-native-devops-gitops', type: 'video', title: 'ArgoCD Bottlenecks & Limits at Scale', url: 'https://www.youtube.com/watch?v=zNGg87RME7I', locale: 'en', durationMin: 40, quality: 5 },
  { topicId: 'cloud-native-devops-gitops', type: 'video', title: 'Azure DevOps Training & Corporate Pipelines', url: 'https://www.youtube.com/watch?v=GrqMXRMkrKQ', locale: 'en', durationMin: 60, quality: 4 },
  { topicId: 'cloud-native-devops-gitops', type: 'video', title: 'CI/CD Step by Step: Best Practices', url: 'https://www.youtube.com/watch?v=yhzdg5loJIA', locale: 'en', durationMin: 55, quality: 5 },
  { topicId: 'cloud-native-devops-gitops', type: 'video', title: 'AWS DevOps Engineer Roadmap & Infrastructure', url: 'https://www.youtube.com/watch?v=Bqdr9gd2Pwc', locale: 'en', durationMin: 50, quality: 4 },
  { topicId: 'cloud-native-devops-gitops', type: 'video', title: 'CI/CD in Kubernetes Local with Docker Desktop', url: 'https://www.youtube.com/watch?v=Zvch_KoyFnQ', locale: 'en', durationMin: 45, quality: 4 },
  { topicId: 'cloud-native-devops-gitops', type: 'video', title: 'Mega DevOps Course (Jenkins, Docker, K8s)', url: 'https://www.youtube.com/watch?v=RwIhQg7Gxz0', locale: 'en', durationMin: 660, quality: 4 },
  { topicId: 'cloud-native-devops-gitops', type: 'video', title: 'Kubernetes Architecture & Docker Networking (Simplilearn)', url: 'https://www.youtube.com/watch?v=cC0V1LRDeLs', locale: 'en', durationMin: 60, quality: 4 },
  { topicId: 'cloud-native-devops-gitops', type: 'video', title: 'Advanced GitOps with FluxCD (Kubernetes)', url: 'https://www.youtube.com/watch?v=PFLimPh5-wo', locale: 'en', durationMin: 45, quality: 4 },
  { topicId: 'cloud-native-devops-gitops', type: 'video', title: 'Continuous Pipelines & GitOps with ArgoCD In-Depth', url: 'https://www.youtube.com/watch?v=AE5xTLV3qMk', locale: 'en', durationMin: 50, quality: 5 },
  { topicId: 'cloud-native-devops-gitops', type: 'video', title: 'Terraform: Infrastructure as Code & Monitoring', url: 'https://www.youtube.com/watch?v=6GQRb4fGvtk', locale: 'en', durationMin: 50, quality: 4 },
  { topicId: 'cloud-native-devops-gitops', type: 'video', title: 'Edureka DevOps 7-Hour Course', url: 'https://www.youtube.com/watch?v=Ou9j73aWgyE', locale: 'en', durationMin: 420, quality: 4 },
  { topicId: 'cloud-native-devops-gitops', type: 'video', title: 'Shell Scripting, AWS EC2 Deploy & GitHub Actions', url: 'https://www.youtube.com/watch?v=Tq0vZU7Hp_M', locale: 'en', durationMin: 45, quality: 4 },
  { topicId: 'cloud-native-devops-gitops', type: 'video', title: 'Deploying Java Oracle on OKE Using GitOps & CircleCI', url: 'https://www.youtube.com/watch?v=yu2xFcX6nTY', locale: 'en', durationMin: 50, quality: 4 },
  { topicId: 'cloud-native-devops-gitops', type: 'video', title: 'GitLab on K8s Automated & Runners', url: 'https://www.youtube.com/watch?v=c5T0UkuD-6g', locale: 'en', durationMin: 45, quality: 4 },
  { topicId: 'cloud-native-devops-gitops', type: 'video', title: 'CI/CD with Terraform, CircleCI & Docker', url: 'https://www.youtube.com/watch?v=o5-QPfh-piM', locale: 'en', durationMin: 40, quality: 4 },
  { topicId: 'cloud-native-devops-gitops', type: 'video', title: 'Jenkins CI/CD Pipeline Integration', url: 'https://www.youtube.com/watch?v=iV1dSjdFKpg', locale: 'en', durationMin: 50, quality: 3 },

  // ── Articles ──
  { topicId: 'cloud-native-devops-gitops', type: 'article', title: 'GitOps: Building & Deploying on K8s with GitLab & ArgoCD', url: 'https://medium.com/@ismaelaguilera_/gitops-construcci%C3%B3n-y-despliegue-de-aplicaciones-en-kubernetes-con-gitlab-ci-cd-y-argocd-81dd6215d032', locale: 'en', durationMin: 35, quality: 4 },
  { topicId: 'cloud-native-devops-gitops', type: 'article', title: 'DevOps Made Simple: CI/CD Pipelines with GitHub Actions', url: 'https://dev.to/yash_sonawane25/devops-made-simple-a-beginners-guide-to-setting-up-cicd-pipelines-with-github-actions--4143', locale: 'en', durationMin: 25, quality: 4 },
  { topicId: 'cloud-native-devops-gitops', type: 'article', title: 'Implement GitOps on Kubernetes Using Argo CD (FreeCodeCamp)', url: 'https://www.freecodecamp.org/news/how-to-implement-gitops-on-kubernetes-using-argo-cd/', locale: 'en', durationMin: 40, quality: 5 },
  { topicId: 'cloud-native-devops-gitops', type: 'article', title: 'Infrastructure Automation with GitOps (Push vs Pull)', url: 'https://medium.com/@blogs4devs/infrastructure-automation-with-gitops-5be9219e7c07', locale: 'en', durationMin: 20, quality: 4 },
  { topicId: 'cloud-native-devops-gitops', type: 'article', title: 'Kubernetes GitOps: A Beginner\'s Guide with Harness', url: 'https://dev.to/pavanbelagatti/kubernetes-gitops-a-beginners-guide-with-a-hands-on-tutorial-56de', locale: 'en', durationMin: 25, quality: 4 },
  { topicId: 'cloud-native-devops-gitops', type: 'article', title: 'Introduction to Gitless-GitOps (OCI-Centric Architecture)', url: 'https://dev.to/t-kikuc/introduction-to-gitless-gitops-a-new-oci-centric-and-secure-architecture-2pgi', locale: 'en', durationMin: 20, quality: 4 },
  { topicId: 'cloud-native-devops-gitops', type: 'article', title: 'Kubernetes Architecture Deep Dive: Etcd & API Server', url: 'https://dev.to/godofgeeks/kubernetes-architecture-deep-dive-etcd-api-server-1995', locale: 'en', durationMin: 25, quality: 5 },
  { topicId: 'cloud-native-devops-gitops', type: 'article', title: 'Complete Guide to Etcd: The Distributed Key-Value Store', url: 'https://dev.to/jimjunior/a-complete-guide-to-etcd-the-distributed-key-value-store-powering-cloud-infrastructure-pif', locale: 'en', durationMin: 30, quality: 5 },
  { topicId: 'cloud-native-devops-gitops', type: 'article', title: 'Kubernetes Architecture Documentation (Official)', url: 'https://kubernetes.io/docs/concepts/overview/components/', locale: 'en', durationMin: 45, quality: 5 },
  { topicId: 'cloud-native-devops-gitops', type: 'article', title: 'Configure & Upgrade Etcd in HA (Kubernetes Docs)', url: 'https://kubernetes.io/docs/tasks/administer-cluster/configure-upgrade-etcd/', locale: 'en', durationMin: 30, quality: 5 },
  { topicId: 'cloud-native-devops-gitops', type: 'article', title: 'HA Topology with Kubeadm (Kubernetes Docs)', url: 'https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/setup-ha-etcd-with-kubeadm/', locale: 'en', durationMin: 25, quality: 5 },
  { topicId: 'cloud-native-devops-gitops', type: 'article', title: 'Learn CI/CD and Deployment (FreeCodeCamp)', url: 'https://www.freecodecamp.org/news/learn-continuous-integration-delivery-and-deployment/', locale: 'en', durationMin: 60, quality: 5 },
  { topicId: 'cloud-native-devops-gitops', type: 'article', title: 'Production-Ready DevOps Pipeline with Free Tools', url: 'https://www.freecodecamp.org/news/how-to-build-a-production-ready-devops-pipeline-with-free-tools/', locale: 'en', durationMin: 45, quality: 5 },
  { topicId: 'cloud-native-devops-gitops', type: 'article', title: 'CI/CD Practical Pipelines for Modern Dev Teams', url: 'https://dev.to/apprecode/cicd-example-practical-pipelines-for-modern-dev-teams-k06', locale: 'en', durationMin: 20, quality: 4 },
  { topicId: 'cloud-native-devops-gitops', type: 'article', title: 'CI/CD Pipeline System Design (GeeksForGeeks)', url: 'https://www.geeksforgeeks.org/system-design/cicd-pipeline-system-design/', locale: 'en', durationMin: 25, quality: 4 },
  { topicId: 'cloud-native-devops-gitops', type: 'article', title: 'Awesome DevOps (WMariuss GitHub)', url: 'https://github.com/wmariuss/awesome-devops', locale: 'en', durationMin: 30, quality: 4 },
  { topicId: 'cloud-native-devops-gitops', type: 'article', title: 'Awesome DevOps Portal Interactive', url: 'http://awesome-devops.xyz/', locale: 'en', durationMin: 30, quality: 4 },
  { topicId: 'cloud-native-devops-gitops', type: 'article', title: 'Awesome DevOps Links (AcalephStorage GitHub)', url: 'https://github.com/AcalephStorage/awesome-devops', locale: 'en', durationMin: 20, quality: 3 },
  { topicId: 'cloud-native-devops-gitops', type: 'article', title: 'Awesome DevOps Software (GitHub)', url: 'https://github.com/awesome-soft/awesome-devops', locale: 'en', durationMin: 20, quality: 3 },
  { topicId: 'cloud-native-devops-gitops', type: 'article', title: 'Reddit: Hands-On DevOps/Cloud Projects', url: 'https://www.reddit.com/r/devops/comments/1p6rote/found_a_great_github_repo_of_hands_on_devopscloud/', locale: 'en', durationMin: 10, quality: 3 },

  // ══════════════════════════════════════════════════════
  // Domain 6 — Deep Observability: OpenTelemetry, Prometheus & SRE
  // ══════════════════════════════════════════════════════

  // ── Videos ──
  { topicId: 'deep-observability-otel-sre', type: 'video', title: 'The Parts of OpenTelemetry: APIs, SDKs & Collectors', url: 'https://www.youtube.com/watch?v=qX1pwf6njX4', locale: 'en', durationMin: 40, quality: 5 },
  { topicId: 'deep-observability-otel-sre', type: 'video', title: 'Mastering OpenTelemetry: Avoiding Vendor Lock-in', url: 'https://www.youtube.com/watch?v=wz1wAtVeeeQ', locale: 'en', durationMin: 45, quality: 5 },
  { topicId: 'deep-observability-otel-sre', type: 'video', title: 'Distributed Tracing with OpenTelemetry in Splunk / Grafana', url: 'https://www.youtube.com/watch?v=BM66TDy5y4I', locale: 'en', durationMin: 40, quality: 4 },
  { topicId: 'deep-observability-otel-sre', type: 'video', title: 'OTel Collector vs Prometheus Server Scraping', url: 'https://www.youtube.com/watch?v=zpDTAZ_yvl4', locale: 'en', durationMin: 30, quality: 5 },
  { topicId: 'deep-observability-otel-sre', type: 'video', title: 'Prometheus Metrics vs OTel: Delta Temporality & Advantages', url: 'https://www.youtube.com/watch?v=39Dx4IocLyI', locale: 'en', durationMin: 35, quality: 4 },
  { topicId: 'deep-observability-otel-sre', type: 'video', title: 'Real-Time Grafana Dashboards', url: 'https://www.youtube.com/watch?v=tLSS2t7Md3w', locale: 'en', durationMin: 35, quality: 4 },
  { topicId: 'deep-observability-otel-sre', type: 'video', title: 'Zipkin Trace Export & Prometheus Configuration', url: 'https://www.youtube.com/watch?v=V8TvJK2hU54', locale: 'en', durationMin: 25, quality: 4 },
  { topicId: 'deep-observability-otel-sre', type: 'video', title: 'Creating Alerts Based on Spikes & Anomalies', url: 'https://www.youtube.com/watch?v=sNk9NkgTOLs', locale: 'en', durationMin: 30, quality: 4 },
  { topicId: 'deep-observability-otel-sre', type: 'video', title: 'Datadog Log Monitoring: Industrial Centralization', url: 'https://www.youtube.com/watch?v=uM9E3jqOYiA', locale: 'en', durationMin: 35, quality: 4 },
  { topicId: 'deep-observability-otel-sre', type: 'video', title: 'DevOps Monitoring: Logz.io vs ELK vs Prometheus', url: 'https://www.youtube.com/watch?v=nD6JfA9nGOg', locale: 'en', durationMin: 40, quality: 4 },
  { topicId: 'deep-observability-otel-sre', type: 'video', title: 'Cybersecurity & Log Analytics for SOC Responders', url: 'https://www.youtube.com/watch?v=wv9stsMynC4', locale: 'en', durationMin: 45, quality: 4 },
  { topicId: 'deep-observability-otel-sre', type: 'video', title: 'Web Incident Response Workshop via Network Logs', url: 'https://www.youtube.com/watch?v=8XuqFwgFYUk', locale: 'en', durationMin: 40, quality: 5 },
  { topicId: 'deep-observability-otel-sre', type: 'video', title: 'Cyberchef & Payload Extraction in Systems', url: 'https://www.youtube.com/watch?v=mRqWtY6boxk', locale: 'en', durationMin: 25, quality: 3 },
  { topicId: 'deep-observability-otel-sre', type: 'video', title: 'Latency & Sharding Impact on Dashboards & Metrics', url: 'https://www.youtube.com/watch?v=tVwEGkQ6idg', locale: 'en', durationMin: 30, quality: 4 },
  { topicId: 'deep-observability-otel-sre', type: 'video', title: 'Advanced Messaging Systems Architecture', url: 'https://www.youtube.com/watch?v=rd1VmW7ItD4', locale: 'en', durationMin: 50, quality: 4 },
  { topicId: 'deep-observability-otel-sre', type: 'video', title: 'Network Threads & the Physical Cost of Continuous Requests', url: 'https://www.youtube.com/watch?v=x9iHwoAbwiA', locale: 'en', durationMin: 35, quality: 4 },
  { topicId: 'deep-observability-otel-sre', type: 'video', title: 'Operational Cost of Custom Headers over HTTP/2', url: 'https://www.youtube.com/watch?v=ixuSv0k-jWU', locale: 'en', durationMin: 25, quality: 4 },
  { topicId: 'deep-observability-otel-sre', type: 'video', title: 'Exotic Network Protocols & Understanding with cURL', url: 'https://www.youtube.com/watch?v=eusHw-mUa8Y', locale: 'en', durationMin: 30, quality: 3 },
  { topicId: 'deep-observability-otel-sre', type: 'video', title: 'NAT & IP Routing for Backend Engineers', url: 'https://www.youtube.com/watch?v=iV5fajdpb7c', locale: 'en', durationMin: 25, quality: 4 },
  { topicId: 'deep-observability-otel-sre', type: 'video', title: 'Configuring & Partitioning NoSQL Clusters & Replication', url: 'https://www.youtube.com/watch?v=jLEp1XI_L6Q', locale: 'en', durationMin: 35, quality: 4 },

  // ── Articles ──
  { topicId: 'deep-observability-otel-sre', type: 'article', title: 'OpenTelemetry — Official Site', url: 'https://opentelemetry.io/', locale: 'en', durationMin: 30, quality: 5 },
  { topicId: 'deep-observability-otel-sre', type: 'article', title: 'OTel & Prometheus in Azure Clusters (MS Docs)', url: 'https://learn.microsoft.com/en-us/azure/api-management/how-to-deploy-self-hosted-gateway-kubernetes-opentelemetry', locale: 'en', durationMin: 40, quality: 5 },
  { topicId: 'deep-observability-otel-sre', type: 'article', title: 'Monitor Kubernetes Clusters with Prometheus, Loki & Grafana', url: 'https://medium.com/@ismaelaguilera_/monitorear-cluster-de-kubernetes-con-prometheus-loki-y-grafana-d6ffb620d265', locale: 'en', durationMin: 35, quality: 4 },
  { topicId: 'deep-observability-otel-sre', type: 'article', title: 'OTel in Action on K8s: Cluster-Level Observability', url: 'https://dev.to/kartikdudeja21/opentelemetry-in-action-on-kubernetes-part-9-cluster-level-observability-with-opentelemetry-3d5p', locale: 'en', durationMin: 30, quality: 4 },
  { topicId: 'deep-observability-otel-sre', type: 'article', title: 'Observability 2.0: The Future of Monitoring (Netflix Case)', url: 'https://dev.to/yash_sonawane25/observability-20-the-future-of-monitoring-with-opentelemetry-1d10', locale: 'en', durationMin: 25, quality: 4 },
  { topicId: 'deep-observability-otel-sre', type: 'article', title: 'Behind the Scenes: How Distributed Tracing Actually Works', url: 'https://medium.com/codex/behind-the-scenes-opentelemetry-how-distributed-tracing-actually-works-c6db84ce287b', locale: 'en', durationMin: 20, quality: 5 },
  { topicId: 'deep-observability-otel-sre', type: 'article', title: 'Observability Platform: Traces & Interconnected Spans', url: 'https://remyasavithry.medium.com/observability-platform-traces-b1ee670f46d3', locale: 'en', durationMin: 15, quality: 4 },
  { topicId: 'deep-observability-otel-sre', type: 'article', title: 'OpenTelemetry on Kubernetes — FreeCodeCamp Collection', url: 'https://www.freecodecamp.org/news/tag/opentelemetry/', locale: 'en', durationMin: 30, quality: 4 },
  { topicId: 'deep-observability-otel-sre', type: 'article', title: 'Effective Logging in Go: Best Practices (Distributed Systems)', url: 'https://dev.to/fazal_mansuri_/effective-logging-in-go-best-practices-and-implementation-guide-23hp', locale: 'en', durationMin: 20, quality: 4 },
  { topicId: 'deep-observability-otel-sre', type: 'article', title: 'Exploring Logging Best Practices & Typologies', url: 'https://dev.to/574n13y/exploring-logging-best-practices-37l7', locale: 'en', durationMin: 15, quality: 4 },
  { topicId: 'deep-observability-otel-sre', type: 'article', title: 'Observability Best Practices: Future-Proofing Your Software', url: 'https://medium.com/eteam/observability-best-practices-how-to-future-proof-your-software-e2604c92fdc8', locale: 'en', durationMin: 20, quality: 4 },
  { topicId: 'deep-observability-otel-sre', type: 'article', title: 'Effective Logging with ISO 8601, Entity IDs & Synchronized Clocks', url: 'https://juliofalbo.medium.com/effective-logging-strategies-for-better-observability-and-debugging-4b90decefdf1', locale: 'en', durationMin: 25, quality: 4 },
  { topicId: 'deep-observability-otel-sre', type: 'article', title: 'GitOps & Deployment Architecture (Full Workshop)', url: 'https://medium.com/@ismaelaguilera_/gitops-construcci%C3%B3n-y-despliegue-de-aplicaciones-en-kubernetes-con-gitlab-ci-cd-y-argocd-81dd6215d032', locale: 'en', durationMin: 45, quality: 4 },
  { topicId: 'deep-observability-otel-sre', type: 'article', title: 'GitHub Actions: Automated Deployments Step by Step', url: 'https://dev.to/yash_sonawane25/devops-made-simple-a-beginners-guide-to-setting-up-cicd-pipelines-with-github-actions--4143', locale: 'en', durationMin: 25, quality: 4 },
  { topicId: 'deep-observability-otel-sre', type: 'article', title: 'ArgoCD Image Updater: Zero-Intervention Container Sync (FreeCodeCamp)', url: 'https://www.freecodecamp.org/news/how-to-implement-gitops-on-kubernetes-using-argo-cd/', locale: 'en', durationMin: 35, quality: 5 },
  { topicId: 'deep-observability-otel-sre', type: 'article', title: 'GitOps PUSH vs PULL Deployment Models', url: 'https://medium.com/@blogs4devs/infrastructure-automation-with-gitops-5be9219e7c07', locale: 'en', durationMin: 20, quality: 4 },
  { topicId: 'deep-observability-otel-sre', type: 'article', title: 'Deploying to Cloud with Harness.io (CD as a Service)', url: 'https://dev.to/pavanbelagatti/kubernetes-gitops-a-beginners-guide-with-a-hands-on-tutorial-56de', locale: 'en', durationMin: 25, quality: 4 },
  { topicId: 'deep-observability-otel-sre', type: 'article', title: 'Gitless-GitOps: OCI Registry Centric Architecture', url: 'https://dev.to/t-kikuc/introduction-to-gitless-gitops-a-new-oci-centric-and-secure-architecture-2pgi', locale: 'en', durationMin: 20, quality: 4 },
  { topicId: 'deep-observability-otel-sre', type: 'article', title: 'Kubernetes Architecture Deep Dive: Etcd & API Server', url: 'https://dev.to/godofgeeks/kubernetes-architecture-deep-dive-etcd-api-server-1995', locale: 'en', durationMin: 30, quality: 5 },
  { topicId: 'deep-observability-otel-sre', type: 'article', title: 'Building Cloud Infrastructure Powered by Etcd', url: 'https://dev.to/jimjunior/a-complete-guide-to-etcd-the-distributed-key-value-store-powering-cloud-infrastructure-pif', locale: 'en', durationMin: 30, quality: 5 },
];

// ──────────────────────────────────────────────────────
// PILLS — Micro-learning per topic
// ──────────────────────────────────────────────────────
const pills = [
  // ── Domain 1: Advanced Architecture & DDD ──
  {
    id: 'pill-arch-1',
    topicId: 'advanced-architecture-ddd',
    content:
      '**Bounded Context**: In DDD, a Bounded Context defines the boundary within which a particular domain model applies. Crossing contexts requires translation — no shared model across boundaries.',
    locale: 'en',
  },
  {
    id: 'pill-arch-2',
    topicId: 'advanced-architecture-ddd',
    content:
      '**CQRS**: Command Query Responsibility Segregation separates read and write models. Writes go through Commands; reads use optimized Queries — enabling independent scaling and evolution.',
    locale: 'en',
  },
  {
    id: 'pill-arch-3',
    topicId: 'advanced-architecture-ddd',
    content:
      '**Event Sourcing**: Instead of storing current state, Event Sourcing persists every state change as an immutable event. The current state is rebuilt by replaying events — audit trail for free.',
    locale: 'en',
  },
  {
    id: 'pill-arch-4',
    topicId: 'advanced-architecture-ddd',
    content:
      '**Saga Pattern**: In microservices, a Saga coordinates distributed transactions through a sequence of local transactions with compensating actions — replacing the monolithic 2PC commit.',
    locale: 'en',
  },

  // ── Domain 2: Distributed Systems ──
  {
    id: 'pill-dist-1',
    topicId: 'distributed-systems-sharding',
    content:
      '**Consistent Hashing**: Instead of modulo-based shard assignment, consistent hashing places keys on a ring. Adding/removing nodes only reassigns K/N keys — eliminating mass remapping.',
    locale: 'en',
  },
  {
    id: 'pill-dist-2',
    topicId: 'distributed-systems-sharding',
    content:
      '**Shard Key Selection**: A poor shard key (e.g., sequential IDs) creates hotspots. Good keys distribute writes evenly: user_id, hashed composite keys, or geo-based partitioning.',
    locale: 'en',
  },
  {
    id: 'pill-dist-3',
    topicId: 'distributed-systems-sharding',
    content:
      '**B-Trees vs Heaps**: B-Tree indexes keep data sorted for fast range queries (O(log n)). Heap tables store data in insert order — fast writes, slow reads without indexes.',
    locale: 'en',
  },

  // ── Domain 3: Clean Code & SOLID ──
  {
    id: 'pill-clean-1',
    topicId: 'clean-code-solid-patterns',
    content:
      '**Single Responsibility Principle**: A class should have one reason to change. God Objects violate SRP by handling UI, data access, and business logic — split them into focused components.',
    locale: 'en',
  },
  {
    id: 'pill-clean-2',
    topicId: 'clean-code-solid-patterns',
    content:
      '**Dependency Inversion**: High-level modules should not depend on low-level modules. Both should depend on abstractions. This is why interfaces are injected, not concrete implementations.',
    locale: 'en',
  },
  {
    id: 'pill-clean-3',
    topicId: 'clean-code-solid-patterns',
    content:
      '**TDD Cycle**: Red → Green → Refactor. Write a failing test first (Red), make it pass with minimal code (Green), then improve the design without changing behavior (Refactor).',
    locale: 'en',
  },

  // ── Domain 4: Elite QA ──
  {
    id: 'pill-qa-1',
    topicId: 'elite-qa-mutation-contract',
    content:
      '**Mutation Testing**: Tools like Stryker or Pitest inject small bugs (mutants) into your code. If tests still pass, your test suite is weak — the mutant survived. Kill all mutants for confidence.',
    locale: 'en',
  },
  {
    id: 'pill-qa-2',
    topicId: 'elite-qa-mutation-contract',
    content:
      '**Contract Testing**: In microservices, Pact defines contracts between Consumer and Provider. If the Provider changes its API, the contract breaks in CI — catching API drift before production.',
    locale: 'en',
  },
  {
    id: 'pill-qa-3',
    topicId: 'elite-qa-mutation-contract',
    content:
      '**ArchUnit**: Write unit tests that enforce architectural rules: "No domain layer imports infrastructure." Fail the build if someone adds a forbidden dependency — TDD for architecture.',
    locale: 'en',
  },

  // ── Domain 5: Cloud-Native DevOps ──
  {
    id: 'pill-devops-1',
    topicId: 'cloud-native-devops-gitops',
    content:
      '**GitOps**: Git is the single source of truth. ArgoCD/FluxCD watch your repo and reconcile cluster state. Manual kubectl edits are automatically reverted — infrastructure as code, enforced.',
    locale: 'en',
  },
  {
    id: 'pill-devops-2',
    topicId: 'cloud-native-devops-gitops',
    content:
      '**etcd**: The distributed key-value store that powers Kubernetes. It uses the Raft consensus algorithm to tolerate node failures. Lose quorum in etcd → lose the entire cluster.',
    locale: 'en',
  },
  {
    id: 'pill-devops-3',
    topicId: 'cloud-native-devops-gitops',
    content:
      '**Zero-Downtime Deployments**: Kubernetes RollingUpdates replace pods incrementally. Readiness probes ensure new pods serve traffic before old ones terminate — users never notice.',
    locale: 'en',
  },

  // ── Domain 6: Deep Observability ──
  {
    id: 'pill-obs-1',
    topicId: 'deep-observability-otel-sre',
    content:
      '**Three Pillars of Observability**: Traces (end-to-end request flow), Metrics (numeric time-series data), Logs (discrete events). OTel unifies all three under one SDK — no vendor lock-in.',
    locale: 'en',
  },
  {
    id: 'pill-obs-2',
    topicId: 'deep-observability-otel-sre',
    content:
      '**OpenTelemetry Collector**: A vendor-agnostic proxy that receives, processes, and exports telemetry data. Configure receivers (OTLP, Prometheus), processors (batching, filtering), and exporters (Grafana, Datadog).',
    locale: 'en',
  },
  {
    id: 'pill-obs-3',
    topicId: 'deep-observability-otel-sre',
    content:
      '**Trace ID Correlation**: Inject a unique Trace ID at the API gateway. Every service passes it along. In Grafana/Jaeger, search by Trace ID to see the full path across hundreds of containers.',
    locale: 'en',
  },
];

async function main() {
  console.log('Seeding foundational topics...');

  for (const topic of topics) {
    await prisma.topic.upsert({
      where: { id: topic.id },
      update: topic,
      create: topic,
    });
  }

  const topicCount = await prisma.topic.count();
  console.log(`Done — ${topicCount} topics in database.`);

  console.log('Seeding resources...');

  for (let i = 0; i < resources.length; i++) {
    const resource = resources[i];
    const resourceId = `res-${i.toString().padStart(3, '0')}`;
    await prisma.resource.upsert({
      where: { id: resourceId },
      update: {
        topicId: resource.topicId,
        type: resource.type,
        title: resource.title,
        url: resource.url,
        locale: resource.locale,
        durationMin: resource.durationMin,
        quality: resource.quality,
      },
      create: {
        id: resourceId,
        topicId: resource.topicId,
        type: resource.type,
        title: resource.title,
        url: resource.url,
        locale: resource.locale,
        durationMin: resource.durationMin,
        quality: resource.quality,
      },
    });
  }

  const resourceCount = await prisma.resource.count();
  console.log(`Done — ${resourceCount} resources in database.`);

  console.log('Seeding pills...');

  for (const pill of pills) {
    await prisma.pill.upsert({
      where: { id: pill.id },
      update: pill,
      create: pill,
    });
  }

  const pillCount = await prisma.pill.count();
  console.log(`Done — ${pillCount} pills in database.`);

  // Reset all user progress so the roadmap can be tested fresh
  console.log('Resetting user progress...');
  const deletedResourceProgress = await prisma.userResourceProgress.deleteMany({});
  console.log(`Deleted ${deletedResourceProgress.count} resource progress records.`);

  const deletedProgress = await prisma.nodeProgress.deleteMany({});
  console.log(`Deleted ${deletedProgress.count} progress records.`);

  const deletedValidations = await prisma.validation.deleteMany({});
  console.log(`Deleted ${deletedValidations.count} validation records.`);

  const deletedPillReviews = await prisma.pillReview.deleteMany({});
  console.log(`Deleted ${deletedPillReviews.count} pill review records.`);

  const deletedCustomNodes = await prisma.customNode.deleteMany({});
  console.log(`Deleted ${deletedCustomNodes.count} custom node records.`);

  const deletedUsers = await prisma.user.deleteMany({});
  console.log(`Deleted ${deletedUsers.count} user records.`);

  console.log('User progress reset complete. Onboarding will be required on next visit.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());