import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  datasourceUrl: process.env.DATABASE_URL ?? 'file:./dev.db',
});

// ──────────────────────────────────────────────────────
// TOPICS — Foundation + Elite Domains
// ──────────────────────────────────────────────────────
const topics = [
  // ── Domain 0: Fundamentals (original) ──
  {
    id: 'data-structures-fundamentals',
    slug: 'data-structures-fundamentals',
    title: 'Data Structures Fundamentals',
    category: 'fundamentals',
    estimatedHours: 20,
    dependsOn: '[]',
    isRequired: true,
  },
  {
    id: 'algorithms-complexity',
    slug: 'algorithms-complexity',
    title: 'Algorithms & Complexity',
    category: 'fundamentals',
    estimatedHours: 25,
    dependsOn: '["data-structures-fundamentals"]',
    isRequired: true,
  },
  {
    id: 'systems-design-basics',
    slug: 'systems-design-basics',
    title: 'Systems Design Basics',
    category: 'systems',
    estimatedHours: 30,
    dependsOn: '["algorithms-complexity"]',
    isRequired: true,
  },

  // ── Domain 1: Arquitectura de Software Avanzada y DDD ──
  {
    id: 'advanced-architecture-ddd',
    slug: 'advanced-architecture-ddd',
    title: 'Arquitectura de Software Avanzada y DDD',
    category: 'architecture',
    estimatedHours: 50,
    dependsOn: '["systems-design-basics"]',
    isRequired: true,
  },

  // ── Domain 2: Diseño de Sistemas Distribuidos, Sharding y Balanceo ──
  {
    id: 'distributed-systems-sharding',
    slug: 'distributed-systems-sharding',
    title: 'Sistemas Distribuidos, Sharding y Balanceo a Gran Escala',
    category: 'systems',
    estimatedHours: 45,
    dependsOn: '["systems-design-basics"]',
    isRequired: true,
  },

  // ── Domain 3: Maestría en Código Limpio, SOLID y Refactorización ──
  {
    id: 'clean-code-solid-patterns',
    slug: 'clean-code-solid-patterns',
    title: 'Código Limpio, Principios SOLID y Refactorización',
    category: 'craftsmanship',
    estimatedHours: 35,
    dependsOn: '["algorithms-complexity"]',
    isRequired: true,
  },

  // ── Domain 4: Quality Assurance de Élite ──
  {
    id: 'elite-qa-mutation-contract',
    slug: 'elite-qa-mutation-contract',
    title: 'QA de Élite: Mutation Testing, Contract Testing y Arquitectura',
    category: 'quality',
    estimatedHours: 40,
    dependsOn: '["clean-code-solid-patterns"]',
    isRequired: true,
  },

  // ── Domain 5: DevOps Nativo de la Nube — GitOps ──
  {
    id: 'cloud-native-devops-gitops',
    slug: 'cloud-native-devops-gitops',
    title: 'DevOps Nativo de la Nube: GitOps, Kubernetes y CI/CD Avanzado',
    category: 'devops',
    estimatedHours: 50,
    dependsOn: '["distributed-systems-sharding"]',
    isRequired: true,
  },

  // ── Domain 6: Observabilidad Profunda ──
  {
    id: 'deep-observability-otel-sre',
    slug: 'deep-observability-otel-sre',
    title: 'Observabilidad Profunda: OpenTelemetry, Prometheus y SRE',
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
  // Domain 0 — Fundamentals (original topics, no new resources)
  // ══════════════════════════════════════════════════════

  // ══════════════════════════════════════════════════════
  // Domain 1 — Advanced Architecture & DDD
  // ══════════════════════════════════════════════════════

  // ── Videos ──
  { topicId: 'advanced-architecture-ddd', type: 'video', title: 'Refactor de Modelos Anémicos a DDD (Milan Jovanovic)', url: 'https://www.youtube.com/watch?v=B5oQ0lMjkrI', locale: 'es', durationMin: 45, quality: 5 },
  { topicId: 'advanced-architecture-ddd', type: 'video', title: 'Patrones de Microservicios: SAGA, CQRS, Event Sourcing', url: 'https://www.youtube.com/watch?v=VoY_cs7-04o', locale: 'es', durationMin: 60, quality: 5 },
  { topicId: 'advanced-architecture-ddd', type: 'video', title: 'Event-Driven Architecture y Sagas (AWS / EventBridge)', url: 'https://www.youtube.com/watch?v=PzzH-1y5yzE', locale: 'es', durationMin: 50, quality: 5 },
  { topicId: 'advanced-architecture-ddd', type: 'video', title: 'Caso Real: Migración a Arquitectura Hexagonal y DDD', url: 'https://www.youtube.com/watch?v=wMj4GuvTwHI', locale: 'es', durationMin: 40, quality: 4 },
  { topicId: 'advanced-architecture-ddd', type: 'video', title: 'Curso Intensivo Arquitectura Pragmática y Limpia', url: 'https://www.youtube.com/watch?v=TQdLgzVk2T8', locale: 'es', durationMin: 55, quality: 5 },
  { topicId: 'advanced-architecture-ddd', type: 'video', title: 'Clean Architecture vs Domain-Driven Design (Diferencias)', url: 'https://www.youtube.com/watch?v=eUW2CYAT1Nk', locale: 'es', durationMin: 35, quality: 4 },
  { topicId: 'advanced-architecture-ddd', type: 'video', title: 'Arquitectura Hexagonal explicada en 20 minutos', url: 'https://www.youtube.com/watch?v=g7cNQB2kCgE', locale: 'es', durationMin: 20, quality: 4 },
  { topicId: 'advanced-architecture-ddd', type: 'video', title: 'Implementación de CQRS con ejemplos reales', url: 'https://www.youtube.com/watch?v=DJCWpUVf5E0', locale: 'es', durationMin: 50, quality: 5 },
  { topicId: 'advanced-architecture-ddd', type: 'video', title: 'Capa de Aplicación en Clean Architecture a fondo', url: 'https://www.youtube.com/watch?v=1OLSE6tX71Y', locale: 'es', durationMin: 40, quality: 4 },
  { topicId: 'advanced-architecture-ddd', type: 'video', title: 'Estructuración y Modelado de Dominios Correctos', url: 'https://www.youtube.com/watch?v=MhoFCy_2-wQ', locale: 'es', durationMin: 45, quality: 5 },
  { topicId: 'advanced-architecture-ddd', type: 'video', title: 'DDD Style Clean Architecture in Go (Conferencia)', url: 'https://www.youtube.com/watch?v=4LfRdo9WALM', locale: 'en', durationMin: 40, quality: 4 },
  { topicId: 'advanced-architecture-ddd', type: 'video', title: 'Generación de Tokens y la Capa de Infraestructura', url: 'https://www.youtube.com/watch?v=fhM0V2N1GpY', locale: 'es', durationMin: 35, quality: 4 },
  { topicId: 'advanced-architecture-ddd', type: 'video', title: 'Empujando lógica de negocio hacia Domain Events (DDD)', url: 'https://www.youtube.com/watch?v=q74saF54w8I', locale: 'es', durationMin: 40, quality: 5 },
  { topicId: 'advanced-architecture-ddd', type: 'video', title: 'Evitando modelos anémicos y Anti-Patrones en DDD', url: 'https://www.youtube.com/watch?v=1Lcr2c3MVF4', locale: 'es', durationMin: 35, quality: 4 },
  { topicId: 'advanced-architecture-ddd', type: 'video', title: 'Pros y Contras de implementar Domain Driven Design', url: 'https://www.youtube.com/watch?v=UgEExav6CeE', locale: 'es', durationMin: 30, quality: 4 },
  { topicId: 'advanced-architecture-ddd', type: 'video', title: 'Desacoplamiento del Frontend con Puertos y Adaptadores', url: 'https://www.youtube.com/watch?v=07JAkHUoSKE', locale: 'es', durationMin: 40, quality: 4 },
  { topicId: 'advanced-architecture-ddd', type: 'video', title: 'Clean Architecture en el navegador y el DOM', url: 'https://www.youtube.com/watch?v=X-fiPnrFFPE', locale: 'es', durationMin: 35, quality: 4 },
  { topicId: 'advanced-architecture-ddd', type: 'video', title: 'ESLint para Arquitectura Hexagonal', url: 'https://www.youtube.com/watch?v=bdnpXzgj1oY', locale: 'es', durationMin: 30, quality: 4 },
  { topicId: 'advanced-architecture-ddd', type: 'video', title: '¿Cuándo SÍ y cuándo NO utilizar Hexagonal Architecture?', url: 'https://www.youtube.com/watch?v=7j3PhEh0KUw', locale: 'es', durationMin: 35, quality: 5 },
  { topicId: 'advanced-architecture-ddd', type: 'video', title: 'Principios sólidos para Arquitectura de Software', url: 'https://www.youtube.com/watch?v=GZ9ic9QSO5U', locale: 'es', durationMin: 50, quality: 4 },

  // ── Articles ──
  { topicId: 'advanced-architecture-ddd', type: 'article', title: 'CQRS Pattern — Martin Fowler', url: 'https://martinfowler.com/bliki/CQRS.html', locale: 'en', durationMin: 15, quality: 5 },
  { topicId: 'advanced-architecture-ddd', type: 'article', title: 'Arquitectura Hexagonal y Clean Architecture en TypeScript', url: 'https://dev.to/dyarleniber/hexagonal-architecture-and-clean-architecture-with-examples-48oi', locale: 'en', durationMin: 20, quality: 4 },
  { topicId: 'advanced-architecture-ddd', type: 'article', title: 'Clean Architecture: Crear código limpio y escalable', url: 'https://medium.com/@_sroldan/clean-architecture-la-forma-de-crear-c%C3%B3digo-limpio-testable-y-escalable-9af26ccf2028', locale: 'es', durationMin: 15, quality: 4 },
  { topicId: 'advanced-architecture-ddd', type: 'article', title: 'Ready for Changes with Hexagonal Architecture (Netflix)', url: 'https://netflixtechblog.com/ready-for-changes-with-hexagonal-architecture-b315ec967749', locale: 'en', durationMin: 20, quality: 5 },
  { topicId: 'advanced-architecture-ddd', type: 'article', title: 'Diferencias entre Hexagonal, Clean y Onion Architectures', url: 'https://medium.com/@diego.coder/introducci%C3%B3n-a-las-clean-architectures-723fe9fe17fa', locale: 'es', durationMin: 15, quality: 4 },
  { topicId: 'advanced-architecture-ddd', type: 'article', title: 'Arquitectura Hexagonal Part One (Clean Architecture)', url: 'https://medium.com/@edusalguero/arquitectura-hexagonal-59834bb44b7f', locale: 'es', durationMin: 15, quality: 4 },
  { topicId: 'advanced-architecture-ddd', type: 'article', title: 'Complete Guide to System Design and Architectural Styles', url: 'https://dev.to/fahimulhaq/complete-guide-to-system-design-oc7', locale: 'en', durationMin: 30, quality: 5 },
  { topicId: 'advanced-architecture-ddd', type: 'article', title: 'CQRS Architecture: Cómo funciona internamente', url: 'https://medium.com/@90mandalchandan/cqrs-architecture-how-it-works-5f18a36886ea', locale: 'es', durationMin: 20, quality: 4 },
  { topicId: 'advanced-architecture-ddd', type: 'article', title: 'System Design Interview Course (ByteByteGo)', url: 'https://bytebytego.com/courses/system-design-interview', locale: 'en', durationMin: 60, quality: 5 },
  { topicId: 'advanced-architecture-ddd', type: 'article', title: 'How I Learned System Design at Depth', url: 'https://medium.com/@himanshusingour7/how-i-learned-system-design-d7444d454367', locale: 'en', durationMin: 20, quality: 4 },
  { topicId: 'advanced-architecture-ddd', type: 'article', title: 'CQRS Pattern: Ventajas de separar Commands y Queries', url: 'https://medium.com/learn-agile-practices/cqrs-pattern-advantages-of-command-and-queries-fd83396dd942', locale: 'es', durationMin: 15, quality: 4 },
  { topicId: 'advanced-architecture-ddd', type: 'article', title: 'Simply Order Parte 9: CQRS Pattern y separación de lecturas', url: 'https://dev.to/hassan314159/simply-order-part-9-cqrs-pattern-separating-reads-from-writes-for-better-performance-434', locale: 'en', durationMin: 20, quality: 4 },
  { topicId: 'advanced-architecture-ddd', type: 'article', title: 'CQRS y SAGA: Patrones esenciales para microservicios', url: 'https://medium.com/@ingila185/cqrs-and-saga-the-essential-patterns-for-high-performance-microservice-4f23a09889b4', locale: 'es', durationMin: 20, quality: 4 },
  { topicId: 'advanced-architecture-ddd', type: 'article', title: 'Hexagonal Architecture y DDD en Microservicios Spring Boot', url: 'https://dev.to/onepoint/hexagonal-architecture-and-domain-driven-design-fio', locale: 'en', durationMin: 25, quality: 4 },
  { topicId: 'advanced-architecture-ddd', type: 'article', title: 'Hexagonal Architecture: Siempre hay dos lados', url: 'https://medium.com/ssense-tech/hexagonal-architecture-there-are-always-two-sides-to-every-story-bc0780ed7d9c', locale: 'en', durationMin: 15, quality: 4 },
  { topicId: 'advanced-architecture-ddd', type: 'article', title: 'Event-Driven Hexagonal Architecture con RabbitMQ y Clean Arch', url: 'https://medium.com/@ayoubelmaalmi/event-driven-hexagonal-architecture-integrating-rabbitmq-with-clean-architecture-principles-d9a5aaa2cd4e', locale: 'en', durationMin: 25, quality: 4 },
  { topicId: 'advanced-architecture-ddd', type: 'article', title: 'Event-Driven, Event Sourcing y CQRS: Cómo convergen', url: 'https://dev.to/yasmine_ddec94f4d4/event-driven-architecture-event-sourcing-and-cqrs-how-they-work-together-1bp1', locale: 'en', durationMin: 25, quality: 5 },
  { topicId: 'advanced-architecture-ddd', type: 'article', title: 'Application Architecture — Martin Fowler Repository', url: 'https://martinfowler.com/tags/application%20architecture.html', locale: 'en', durationMin: 30, quality: 5 },
  { topicId: 'advanced-architecture-ddd', type: 'article', title: 'Hexagonal Architecture y Rails (Martin Fowler)', url: 'https://martinfowler.com/articles/badri-hexagonal/', locale: 'en', durationMin: 20, quality: 5 },
  { topicId: 'advanced-architecture-ddd', type: 'article', title: 'Event Sourcing: Resolviendo la persistencia de estados mutables', url: 'https://microservices.io/patterns/data/event-sourcing.html', locale: 'en', durationMin: 15, quality: 5 },

  // ══════════════════════════════════════════════════════
  // Domain 2 — Distributed Systems, Sharding & Load Balancing
  // ══════════════════════════════════════════════════════

  // ── Videos ──
  { topicId: 'distributed-systems-sharding', type: 'video', title: 'Curso Completo de System Design (Conceptos de BD)', url: 'https://www.youtube.com/watch?v=C842vFY5kRo', locale: 'es', durationMin: 120, quality: 5 },
  { topicId: 'distributed-systems-sharding', type: 'video', title: 'Consideraciones Avanzadas de Arquitectura (Caché y APIs)', url: 'https://www.youtube.com/watch?v=m8Icp_Cid5o', locale: 'es', durationMin: 50, quality: 4 },
  { topicId: 'distributed-systems-sharding', type: 'video', title: 'Consistent Hashing Explicado (ByteByteGo)', url: 'https://www.youtube.com/watch?v=UF9Iqmg94tk', locale: 'en', durationMin: 20, quality: 5 },
  { topicId: 'distributed-systems-sharding', type: 'video', title: 'Guía de Preparación SD2 a SD3 para Entrevistas', url: 'https://www.youtube.com/watch?v=CC-AxHIgBSM', locale: 'es', durationMin: 45, quality: 4 },
  { topicId: 'distributed-systems-sharding', type: 'video', title: 'Topología de Balanceadores de Carga y Tolerancia a Fallos', url: 'https://www.youtube.com/watch?v=F2FmTdLtb_4', locale: 'es', durationMin: 40, quality: 5 },
  { topicId: 'distributed-systems-sharding', type: 'video', title: 'Diseño a Gran Escala: Mitigando latencia en Microservicios', url: 'https://www.youtube.com/watch?v=sBDod7Ip19g', locale: 'es', durationMin: 50, quality: 4 },
  { topicId: 'distributed-systems-sharding', type: 'video', title: 'Consistent Hashing: Replicación en anillo', url: 'https://www.youtube.com/watch?v=NLMZzElM8Z4', locale: 'es', durationMin: 25, quality: 5 },
  { topicId: 'distributed-systems-sharding', type: 'video', title: 'Índices de BD vs Sharding: Cuándo usar cuál', url: 'https://www.youtube.com/watch?v=BTjxUS_PylA', locale: 'es', durationMin: 30, quality: 4 },
  { topicId: 'distributed-systems-sharding', type: 'video', title: 'Alertas y Telemetría en Patrones a Gran Escala', url: 'https://www.youtube.com/watch?v=Qd9tJ3H_hPE', locale: 'es', durationMin: 35, quality: 4 },
  { topicId: 'distributed-systems-sharding', type: 'video', title: 'Cuándo (y por qué) hacer Shard de tu Base de Datos', url: 'https://www.youtube.com/watch?v=iHNovZUZM3A', locale: 'es', durationMin: 30, quality: 5 },
  { topicId: 'distributed-systems-sharding', type: 'video', title: 'Cómo funcionan los Índices (B-Trees vs Heaps)', url: 'https://www.youtube.com/watch?v=Jemuod4wKWo', locale: 'es', durationMin: 25, quality: 5 },
  { topicId: 'distributed-systems-sharding', type: 'video', title: 'Optimizando "Select *" y escaneo de tablas', url: 'https://www.youtube.com/watch?v=-qNSXK7s7_w', locale: 'es', durationMin: 20, quality: 4 },
  { topicId: 'distributed-systems-sharding', type: 'video', title: 'El Costo en Escritura de los Índices en SSDs', url: 'https://www.youtube.com/watch?v=YirvKh1jP9k', locale: 'es', durationMin: 20, quality: 4 },
  { topicId: 'distributed-systems-sharding', type: 'video', title: 'El Diseño de Sistemas en Software es un Arte', url: 'https://www.youtube.com/watch?v=rd1VmW7ItD4', locale: 'es', durationMin: 40, quality: 4 },
  { topicId: 'distributed-systems-sharding', type: 'video', title: 'Sharding vs Particionamiento vs Replicación', url: 'https://www.youtube.com/watch?v=jLEp1XI_L6Q', locale: 'es', durationMin: 25, quality: 5 },
  { topicId: 'distributed-systems-sharding', type: 'video', title: 'Socket Management en Backend (Epoll)', url: 'https://www.youtube.com/watch?v=x9iHwoAbwiA', locale: 'es', durationMin: 35, quality: 4 },
  { topicId: 'distributed-systems-sharding', type: 'video', title: 'TCP vs UDP: El costo del Multiplexing en HTTP/2', url: 'https://www.youtube.com/watch?v=ixuSv0k-jWU', locale: 'es', durationMin: 30, quality: 4 },
  { topicId: 'distributed-systems-sharding', type: 'video', title: 'Optimizando cabeceras de red para alta carga', url: 'https://www.youtube.com/watch?v=o5S0-_vniiM', locale: 'es', durationMin: 25, quality: 4 },
  { topicId: 'distributed-systems-sharding', type: 'video', title: 'Routing Interno y NAT en infraestructuras', url: 'https://www.youtube.com/watch?v=iV5fajdpb7c', locale: 'es', durationMin: 25, quality: 4 },
  { topicId: 'distributed-systems-sharding', type: 'video', title: 'Lockeo en transacciones y ACID avanzado', url: 'https://www.youtube.com/watch?v=HibHalGlIes', locale: 'es', durationMin: 35, quality: 5 },

  // ── Articles ──
  { topicId: 'distributed-systems-sharding', type: 'article', title: 'Scale From Zero to Millions of Users (ByteByteGo)', url: 'https://bytebytego.com/courses/system-design-interview/scale-from-zero-to-millions-of-users', locale: 'en', durationMin: 45, quality: 5 },
  { topicId: 'distributed-systems-sharding', type: 'article', title: 'Master Class: Sharding y Consistent Hashing', url: 'https://dev.to/piyush6348/master-class-scaling-databases-with-sharding-partitioning-and-consistent-hashing-44p1', locale: 'en', durationMin: 30, quality: 5 },
  { topicId: 'distributed-systems-sharding', type: 'article', title: 'Database Sharding: Estrategias de Escalamiento Horizontal', url: 'https://dev.to/matt_frank_usa/database-sharding-horizontal-scaling-strategies-3b07', locale: 'en', durationMin: 25, quality: 4 },
  { topicId: 'distributed-systems-sharding', type: 'article', title: 'Consistent Hashing — ByteByteGo', url: 'https://bytebytego.com/courses/system-design-interview/design-consistent-hashing', locale: 'en', durationMin: 20, quality: 5 },
  { topicId: 'distributed-systems-sharding', type: 'article', title: 'Understanding Consistent Hashing for Dummies and Pros', url: 'https://medium.com/@ssshubhamsharma4/understanding-consistent-hashing-the-key-to-scalable-distributed-systems-2a92e833057f', locale: 'en', durationMin: 20, quality: 4 },
  { topicId: 'distributed-systems-sharding', type: 'article', title: 'Sharding vs Consistent Hashing: Aclarando la confusión', url: 'https://medium.com/@mitnitesh1/sharding-vs-consistent-hashing-37c52d570851', locale: 'es', durationMin: 15, quality: 4 },
  { topicId: 'distributed-systems-sharding', type: 'article', title: 'Scaling Time Series Data Storage (Netflix Tech Blog)', url: 'https://netflixtechblog.com/scaling-time-series-data-storage-part-ii-d67939655586', locale: 'en', durationMin: 25, quality: 5 },
  { topicId: 'distributed-systems-sharding', type: 'article', title: 'Dynomite: Non-distributed DBs made distributed (Netflix)', url: 'https://netflixtechblog.com/introducing-dynomite-making-non-distributed-databases-distributed-c7bce3d89404', locale: 'en', durationMin: 20, quality: 5 },
  { topicId: 'distributed-systems-sharding', type: 'article', title: 'Database Indexing a Nivel Experto — Baeldung', url: 'https://www.baeldung.com/sql/databases-indexing', locale: 'en', durationMin: 25, quality: 5 },
  { topicId: 'distributed-systems-sharding', type: 'article', title: 'Database Sharding vs Partitioning — Baeldung', url: 'https://www.baeldung.com/cs/database-sharding-vs-partitioning', locale: 'en', durationMin: 20, quality: 5 },
  { topicId: 'distributed-systems-sharding', type: 'article', title: 'Apache ShardingSphere para Java y SQL Distribuidos', url: 'https://www.baeldung.com/java-shardingsphere', locale: 'en', durationMin: 30, quality: 4 },
  { topicId: 'distributed-systems-sharding', type: 'article', title: 'Awesome Low-Level Design (GitHub)', url: 'https://github.com/ashishps1/awesome-low-level-design', locale: 'en', durationMin: 60, quality: 4 },
  { topicId: 'distributed-systems-sharding', type: 'article', title: 'Awesome System Design para Big Data (GitHub)', url: 'https://github.com/madd86/awesome-system-design', locale: 'en', durationMin: 60, quality: 4 },
  { topicId: 'distributed-systems-sharding', type: 'article', title: 'Recursos Comprensivos para Entrevistas de System Design', url: 'https://leetcode.com/discuss/interview-question/5607132/Awesome-System-Design%3A-Resources-and-Insights/', locale: 'en', durationMin: 30, quality: 4 },
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
  { topicId: 'clean-code-solid-patterns', type: 'video', title: 'La Regla del Scout para Código Sostenible', url: 'https://www.youtube.com/watch?v=4GEM9DzkuXE', locale: 'es', durationMin: 30, quality: 4 },
  { topicId: 'clean-code-solid-patterns', type: 'video', title: 'Componentes Frontend: El Screaming Architecture', url: 'https://www.youtube.com/watch?v=eNFAJbWCSww', locale: 'es', durationMin: 40, quality: 4 },
  { topicId: 'clean-code-solid-patterns', type: 'video', title: 'Refactorización Práctica: Bloaters y Smells', url: 'https://www.youtube.com/watch?v=3n-nkx4s5mw', locale: 'es', durationMin: 45, quality: 5 },
  { topicId: 'clean-code-solid-patterns', type: 'video', title: 'El Patrón Observer y previniendo el Callback Hell', url: 'https://www.youtube.com/watch?v=BJatgOiiht4', locale: 'es', durationMin: 30, quality: 4 },
  { topicId: 'clean-code-solid-patterns', type: 'video', title: 'Cuándo y Por Qué Empezar a Refactorizar Código (Martin Fowler)', url: 'https://www.youtube.com/watch?v=8PGNAcAO6fs', locale: 'es', durationMin: 40, quality: 5 },
  { topicId: 'clean-code-solid-patterns', type: 'video', title: 'Principio Inversión de Dependencias en la Práctica', url: 'https://www.youtube.com/watch?v=Z4VjlfvP80E', locale: 'es', durationMin: 35, quality: 4 },
  { topicId: 'clean-code-solid-patterns', type: 'video', title: 'Reemplazando Instancias por Métodos Estáticos (Refactor)', url: 'https://www.youtube.com/watch?v=immGpH8Sgow', locale: 'es', durationMin: 25, quality: 4 },
  { topicId: 'clean-code-solid-patterns', type: 'video', title: 'TDD y Diseño Incremental (Dave Farley)', url: 'https://www.youtube.com/watch?v=h-3z8i-MwFg', locale: 'en', durationMin: 50, quality: 5 },
  { topicId: 'clean-code-solid-patterns', type: 'video', title: 'El Verdadero Poder y los Beneficios de TDD', url: 'https://www.youtube.com/watch?v=ln4WnxX-wrw', locale: 'es', durationMin: 45, quality: 5 },
  { topicId: 'clean-code-solid-patterns', type: 'video', title: 'Continuous Delivery: El Framework de Desarrollo Infalible', url: 'https://www.youtube.com/watch?v=tQMrrNo16jo', locale: 'es', durationMin: 50, quality: 5 },
  { topicId: 'clean-code-solid-patterns', type: 'video', title: '¿Por qué el Delivery Continuo asegura Calidad del Código?', url: 'https://www.youtube.com/watch?v=bIolJv_bWtg', locale: 'es', durationMin: 35, quality: 4 },
  { topicId: 'clean-code-solid-patterns', type: 'video', title: 'Despliegue Continuo Vs Delivery Continuo', url: 'https://www.youtube.com/watch?v=kgYhZOzb6EM', locale: 'es', durationMin: 25, quality: 4 },
  { topicId: 'clean-code-solid-patterns', type: 'video', title: 'Principios SOLID aplicados al Mundo Real (CodelyTV)', url: 'https://www.youtube.com/watch?v=GZ9ic9QSO5U', locale: 'es', durationMin: 50, quality: 5 },
  { topicId: 'clean-code-solid-patterns', type: 'video', title: '7 Patrones de Diseño Vitales para Senior Devs', url: 'https://www.youtube.com/watch?v=6g6_nM7vCXc', locale: 'es', durationMin: 40, quality: 5 },
  { topicId: 'clean-code-solid-patterns', type: 'video', title: 'Principios para no sobre-complicar tu código (KISS, YAGNI)', url: 'https://www.youtube.com/watch?v=7siybJhBwx4', locale: 'es', durationMin: 30, quality: 4 },
  { topicId: 'clean-code-solid-patterns', type: 'video', title: 'Diseño Modular en Java y Patrones Creacionales', url: 'https://www.youtube.com/watch?v=BDsCCtFl8WE', locale: 'es', durationMin: 55, quality: 4 },
  { topicId: 'clean-code-solid-patterns', type: 'video', title: 'Entendiendo CI/CD y automatización (Bases)', url: 'https://www.youtube.com/watch?v=9PgZCJNzY9M', locale: 'es', durationMin: 40, quality: 4 },
  { topicId: 'clean-code-solid-patterns', type: 'video', title: 'Código Sostenible y Limpio (Libro en Acción)', url: 'https://www.youtube.com/watch?v=oshQg1uSRvg', locale: 'es', durationMin: 45, quality: 4 },
  { topicId: 'clean-code-solid-patterns', type: 'video', title: 'TDD: Test Driven Development desde cero', url: 'https://www.youtube.com/watch?v=MtDFK-evWw4', locale: 'es', durationMin: 50, quality: 5 },
  { topicId: 'clean-code-solid-patterns', type: 'video', title: 'Code Smells: Change Preventers', url: 'https://www.youtube.com/watch?v=LzMnsfqjzkA', locale: 'en', durationMin: 25, quality: 4 },

  // ── Articles ──
  { topicId: 'clean-code-solid-patterns', type: 'article', title: 'Catálogo de Patrones de Diseño (Refactoring.Guru)', url: 'https://refactoring.guru/es/design-patterns', locale: 'es', durationMin: 60, quality: 5 },
  { topicId: 'clean-code-solid-patterns', type: 'article', title: 'Mastering SOLID, Design Patterns and Refactoring', url: 'https://medium.com/@elrafamaritza/mastering-solid-principles-design-patterns-and-refactoring-a-comprehensive-guide-to-enhancing-fd7df58bc49c', locale: 'en', durationMin: 30, quality: 4 },
  { topicId: 'clean-code-solid-patterns', type: 'article', title: 'Portal de Refactorización y Patrones (Refactoring.Guru)', url: 'https://refactoring.guru/', locale: 'en', durationMin: 60, quality: 5 },
  { topicId: 'clean-code-solid-patterns', type: 'article', title: 'Introducción Práctica a SOLID (Baeldung)', url: 'https://www.baeldung.com/solid-principles', locale: 'en', durationMin: 25, quality: 5 },
  { topicId: 'clean-code-solid-patterns', type: 'article', title: 'The Art of Clean Code: Mastering SOLID Principles', url: 'https://dev.to/krishna_kumarshakya_848d/the-art-of-clean-code-mastering-the-solid-principles-1n36', locale: 'en', durationMin: 20, quality: 4 },
  { topicId: 'clean-code-solid-patterns', type: 'article', title: 'Clean Code — SOLID y Por qué lo Usamos', url: 'https://medium.com/@kadergenc/what-is-clean-code-solid-why-should-we-use-it-fcb52c214bb4', locale: 'es', durationMin: 15, quality: 4 },
  { topicId: 'clean-code-solid-patterns', type: 'article', title: 'KISS, DRY, YAGNI, TDA: Herramientas del Micro-Diseño', url: 'https://medium.com/@hlfdev/kiss-dry-solid-yagni-a-simple-guide-to-some-principles-of-software-engineering-and-clean-code-05e60233c79f', locale: 'en', durationMin: 15, quality: 4 },
  { topicId: 'clean-code-solid-patterns', type: 'article', title: 'The S.O.L.I.D. Principles for Clean Code (Profundo)', url: 'https://sayansingha.medium.com/the-s-o-l-i-d-principles-clean-code-9fcca658dab5', locale: 'en', durationMin: 20, quality: 4 },
  { topicId: 'clean-code-solid-patterns', type: 'article', title: 'What is Code Refactoring? (Refactoring.Guru)', url: 'https://refactoring.guru/refactoring/what-is-refactoring', locale: 'en', durationMin: 10, quality: 5 },
  { topicId: 'clean-code-solid-patterns', type: 'article', title: 'Implementing the 5 SOLID Principles with Examples (FreeCodeCamp)', url: 'https://www.freecodecamp.org/news/solid-design-principles-in-software-development/', locale: 'en', durationMin: 30, quality: 5 },
  { topicId: 'clean-code-solid-patterns', type: 'article', title: 'Clean Code Handbook: 12 Patterns for Agile Projects', url: 'https://www.freecodecamp.org/news/the-clean-code-handbook/', locale: 'en', durationMin: 30, quality: 4 },
  { topicId: 'clean-code-solid-patterns', type: 'article', title: 'Top 17 Must-Have Resources for Refactoring Excellence', url: 'https://dev.to/vaib/top-17-must-have-resources-for-software-refactoring-excellence-3om2', locale: 'en', durationMin: 15, quality: 4 },
  { topicId: 'clean-code-solid-patterns', type: 'article', title: 'Awesome Clean Code (GitHub)', url: 'https://github.com/kkisiele/awesome-clean-code', locale: 'en', durationMin: 30, quality: 4 },
  { topicId: 'clean-code-solid-patterns', type: 'article', title: 'Ejemplos Reales de Código Limpio y Code Smells (CodelyTV)', url: 'https://github.com/CodelyTV/awesome-clean_code-examples', locale: 'es', durationMin: 30, quality: 5 },
  { topicId: 'clean-code-solid-patterns', type: 'article', title: 'Screencasts sobre Buenas Prácticas (CodelyTV GitHub)', url: 'https://github.com/CodelyTV/youtube-code-examples', locale: 'es', durationMin: 45, quality: 4 },
  { topicId: 'clean-code-solid-patterns', type: 'article', title: 'Awesome Clean Code Projects Across Languages', url: 'https://github.com/kavaan/awesome-clean-code-projects-across-languages-and-framework', locale: 'en', durationMin: 30, quality: 4 },
  { topicId: 'clean-code-solid-patterns', type: 'article', title: 'Clean Code JavaScript (GitHub)', url: 'https://github.com/ryanmcdermott/clean-code-javascript', locale: 'en', durationMin: 45, quality: 5 },
  { topicId: 'clean-code-solid-patterns', type: 'article', title: 'Mejores Repositorios para Ver Código Elegante (Reddit)', url: 'https://www.reddit.com/r/learnprogramming/comments/x78ofk/what_are_the_best_repos_that_are_a_display_of/', locale: 'en', durationMin: 15, quality: 3 },
  { topicId: 'clean-code-solid-patterns', type: 'article', title: 'Las bases matemáticas detrás de los olores del código', url: 'https://refactoring.guru/es', locale: 'es', durationMin: 30, quality: 5 },
  { topicId: 'clean-code-solid-patterns', type: 'article', title: 'Diferencias entre Code Smells comunes (Bloaters, Dispensables)', url: 'https://refactoring.guru/', locale: 'en', durationMin: 20, quality: 5 },

  // ══════════════════════════════════════════════════════
  // Domain 4 — Elite QA: Mutation, Contract & Architecture Testing
  // ══════════════════════════════════════════════════════

  // ── Videos ──
  { topicId: 'elite-qa-mutation-contract', type: 'video', title: 'Mutation Testing: Pon a prueba tus propias Pruebas', url: 'https://www.youtube.com/watch?v=9BoKyeZapLs', locale: 'es', durationMin: 40, quality: 5 },
  { topicId: 'elite-qa-mutation-contract', type: 'video', title: 'Pruebas de Arquitectura Java usando ArchUnit', url: 'https://www.youtube.com/watch?v=sGmhaizFcEA', locale: 'es', durationMin: 45, quality: 4 },
  { topicId: 'elite-qa-mutation-contract', type: 'video', title: 'Defendiendo reglas de negocio con TDD Arquitectónico', url: 'https://www.youtube.com/watch?v=gp689Jwc1Go', locale: 'es', durationMin: 35, quality: 5 },
  { topicId: 'elite-qa-mutation-contract', type: 'video', title: 'El peligro de asumir que todo funciona sin ArchUnit', url: 'https://www.youtube.com/watch?v=MxP521_i9zM', locale: 'es', durationMin: 40, quality: 4 },
  { topicId: 'elite-qa-mutation-contract', type: 'video', title: 'Introducción al Contract Testing (Pact / Playwright)', url: 'https://www.youtube.com/watch?v=iigciLNbyu8', locale: 'es', durationMin: 50, quality: 5 },
  { topicId: 'elite-qa-mutation-contract', type: 'video', title: 'Manteniendo Legacy Code y Mutation Testing', url: 'https://www.youtube.com/watch?v=3frWBFT3CsA', locale: 'es', durationMin: 35, quality: 4 },
  { topicId: 'elite-qa-mutation-contract', type: 'video', title: 'Automatización Playwright y Testing Complejo de UI', url: 'https://www.youtube.com/watch?v=uZGbzP2Y2JY', locale: 'es', durationMin: 60, quality: 4 },
  { topicId: 'elite-qa-mutation-contract', type: 'video', title: 'Full QA Automation Masters Program', url: 'https://www.youtube.com/watch?v=sO8eGL6SFsA', locale: 'en', durationMin: 180, quality: 4 },
  { topicId: 'elite-qa-mutation-contract', type: 'video', title: 'Herramientas Modernas de UI Testing: Cypress vs Playwright', url: 'https://www.youtube.com/watch?v=AKLuQaPWcdg', locale: 'es', durationMin: 35, quality: 5 },
  { topicId: 'elite-qa-mutation-contract', type: 'video', title: 'Manual de Pruebas Automatizadas desde Cero', url: 'https://www.youtube.com/watch?v=72nT2AjlS6s', locale: 'es', durationMin: 90, quality: 4 },
  { topicId: 'elite-qa-mutation-contract', type: 'video', title: '¿En qué difiere QA (Quality Assurance) de QC (Control)?', url: 'https://www.youtube.com/watch?v=XIcOWh_psSI', locale: 'es', durationMin: 20, quality: 3 },
  { topicId: 'elite-qa-mutation-contract', type: 'video', title: 'Trazabilidad y Matrices Reales de Casos de Prueba', url: 'https://www.youtube.com/watch?v=tu2pB6VxRcw', locale: 'es', durationMin: 30, quality: 4 },
  { topicId: 'elite-qa-mutation-contract', type: 'video', title: 'Logs y Test Fails: Cómo Analizar las Fallas Rápidamente', url: 'https://www.youtube.com/watch?v=wv9stsMynC4', locale: 'es', durationMin: 35, quality: 4 },
  { topicId: 'elite-qa-mutation-contract', type: 'video', title: 'Automatización y Construcción de Entornos de Pruebas (Docker)', url: 'https://www.youtube.com/watch?v=c5T0UkuD-6g', locale: 'es', durationMin: 45, quality: 4 },
  { topicId: 'elite-qa-mutation-contract', type: 'video', title: 'CircleCI para Testing en Pipelines', url: 'https://www.youtube.com/watch?v=o-ym035R1eY', locale: 'en', durationMin: 30, quality: 4 },
  { topicId: 'elite-qa-mutation-contract', type: 'video', title: 'Integración Completa de GitOps, Pruebas y Despliegue', url: 'https://www.youtube.com/watch?v=yu2xFcX6nTY', locale: 'es', durationMin: 50, quality: 5 },
  { topicId: 'elite-qa-mutation-contract', type: 'video', title: 'Pruebas de CI en Docker / Node.js', url: 'https://www.youtube.com/watch?v=Tq0vZU7Hp_M', locale: 'es', durationMin: 40, quality: 4 },
  { topicId: 'elite-qa-mutation-contract', type: 'video', title: 'ArgoCD: Despliegue Continuo de Artefactos Testeados', url: 'https://www.youtube.com/watch?v=AE5xTLV3qMk', locale: 'es', durationMin: 40, quality: 4 },
  { topicId: 'elite-qa-mutation-contract', type: 'video', title: 'El Rol de QA Automation Engineer y Entrevistas', url: 'https://www.youtube.com/watch?v=cC0V1LRDeLs', locale: 'es', durationMin: 45, quality: 3 },
  { topicId: 'elite-qa-mutation-contract', type: 'video', title: 'Jmeter vs Selenium: Integrando Pruebas en Jenkins', url: 'https://www.youtube.com/watch?v=iV1dSjdFKpg', locale: 'es', durationMin: 50, quality: 4 },

  // ── Articles ──
  { topicId: 'elite-qa-mutation-contract', type: 'article', title: 'Test Your Software Architecture with ArchUnit', url: 'https://medium.com/@erkndmrl/test-your-software-architecture-with-archunit-12acb218f37e', locale: 'en', durationMin: 20, quality: 4 },
  { topicId: 'elite-qa-mutation-contract', type: 'article', title: 'A Complete Guide on Mutation Testing', url: 'https://medium.com/@sylvain.tiset/a-complete-guide-on-mutation-testing-b924563066e6', locale: 'en', durationMin: 25, quality: 5 },
  { topicId: 'elite-qa-mutation-contract', type: 'article', title: 'ArchUnit Introduction — Baeldung', url: 'https://www.baeldung.com/java-archunit-intro', locale: 'en', durationMin: 25, quality: 5 },
  { topicId: 'elite-qa-mutation-contract', type: 'article', title: 'Test Your Integrations at Scale (Contract Testing con Pact)', url: 'https://medium.com/@engineering.blog_40492/test-your-integrations-at-scale-c29e34d3a2a2', locale: 'en', durationMin: 25, quality: 4 },
  { topicId: 'elite-qa-mutation-contract', type: 'article', title: 'Documentación Oficial de Pact.io', url: 'https://docs.pact.io/', locale: 'en', durationMin: 60, quality: 5 },
  { topicId: 'elite-qa-mutation-contract', type: 'article', title: 'Pact.io — Contract Testing Framework', url: 'https://pact.io/', locale: 'en', durationMin: 30, quality: 5 },
  { topicId: 'elite-qa-mutation-contract', type: 'article', title: 'K6: Load Testing Modernos (Grafana)', url: 'https://k6.io/', locale: 'en', durationMin: 45, quality: 5 },
  { topicId: 'elite-qa-mutation-contract', type: 'article', title: 'Playwright Framework para UI y E2E Testing', url: 'https://dev.to/playwright', locale: 'en', durationMin: 30, quality: 5 },
  { topicId: 'elite-qa-mutation-contract', type: 'article', title: 'Evitando Drift Arquitectónico con ArchUnit y LLMs', url: 'https://dev.to/sasha_podles/from-prompts-to-invariants-re-architecting-systems-with-archunit-and-llms-1n50', locale: 'en', durationMin: 20, quality: 4 },
  { topicId: 'elite-qa-mutation-contract', type: 'article', title: 'When Your Mocks Lie: Contract Testing vs Mocks', url: 'https://dev.to/kevinccbsg/when-your-mocks-lie-contract-testing-with-twd-2e58', locale: 'en', durationMin: 15, quality: 4 },
  { topicId: 'elite-qa-mutation-contract', type: 'article', title: 'Architecture Testing — Complex Examples (Java)', url: 'https://medium.com/@dmitry-ivanov/architecture-testing-d918a3df2ba5', locale: 'en', durationMin: 20, quality: 4 },
  { topicId: 'elite-qa-mutation-contract', type: 'article', title: 'Advanced C# Testing: Property Based Testing y Mutation Testing', url: 'https://dev.to/chakewitz/advanced-c-testing-property-based-testing-and-mutation-testing-n3e', locale: 'en', durationMin: 25, quality: 4 },
  { topicId: 'elite-qa-mutation-contract', type: 'article', title: 'K6, .NET Aspire y Load Testing Seamless', url: 'https://dev.to/foxminchan/k6-net-aspire-seamless-load-testing-12gm', locale: 'en', durationMin: 20, quality: 4 },
  { topicId: 'elite-qa-mutation-contract', type: 'article', title: 'Modern Load Testing como Código con K6', url: 'https://dev.to/darlangui/k6-modern-load-testing-m6o', locale: 'es', durationMin: 20, quality: 4 },
  { topicId: 'elite-qa-mutation-contract', type: 'article', title: 'Load Testing using K6 (Go API)', url: 'https://dev.to/eminetto/load-testing-using-k6-57ph', locale: 'en', durationMin: 20, quality: 4 },
  { topicId: 'elite-qa-mutation-contract', type: 'article', title: 'API Performance Testing con K6 — Quick Start Guide', url: 'https://dev.to/nadirbasalamah/api-performance-testing-with-k6-a-quick-start-guide-2ngc', locale: 'en', durationMin: 15, quality: 4 },
  { topicId: 'elite-qa-mutation-contract', type: 'article', title: 'Enforcing Clean Architecture with ArchUnit', url: 'https://medium.com/@jugurtha.aitoufella/enforcing-and-testing-your-java-clean-architecture-project-with-archunit-56569f3fd547', locale: 'en', durationMin: 20, quality: 4 },
  { topicId: 'elite-qa-mutation-contract', type: 'article', title: 'Mutation Testing con Pitest — Baeldung', url: 'https://www.baeldung.com/java-mutation-testing-with-pitest', locale: 'en', durationMin: 25, quality: 5 },
  { topicId: 'elite-qa-mutation-contract', type: 'article', title: 'Consumer-Driven Contract Testing con Pact paso a paso', url: 'https://dev.to/rogervinas/contract-testing-with-pact-4g2n', locale: 'es', durationMin: 25, quality: 4 },
  { topicId: 'elite-qa-mutation-contract', type: 'article', title: 'Measure Test Quality with Mutation Testing', url: 'https://dev.to/agileactors/measure-the-quality-of-your-tests-with-mutation-testing-1bcd', locale: 'en', durationMin: 15, quality: 4 },

  // ══════════════════════════════════════════════════════
  // Domain 5 — Cloud-Native DevOps: GitOps, K8s & CI/CD
  // ══════════════════════════════════════════════════════

  // ── Videos ──
  { topicId: 'cloud-native-devops-gitops', type: 'video', title: 'Incrementando la Seguridad y CI/CD usando GitOps', url: 'https://www.youtube.com/watch?v=f5EpcWp0THw', locale: 'es', durationMin: 40, quality: 4 },
  { topicId: 'cloud-native-devops-gitops', type: 'video', title: 'Self-Healing en Kubernetes y ArgoCD Automatización', url: 'https://www.youtube.com/watch?v=p-kAqxuJNik', locale: 'es', durationMin: 35, quality: 5 },
  { topicId: 'cloud-native-devops-gitops', type: 'video', title: 'ArgoCD Syncing vs Drift: Reversiones de estado manual', url: 'https://www.youtube.com/watch?v=MeU5_k9ssrs', locale: 'en', durationMin: 30, quality: 4 },
  { topicId: 'cloud-native-devops-gitops', type: 'video', title: 'El peligro de alterar manifiestos Helm manualmente', url: 'https://www.youtube.com/watch?v=e6Wmu77HoV8', locale: 'es', durationMin: 20, quality: 4 },
  { topicId: 'cloud-native-devops-gitops', type: 'video', title: 'Los límites y cuellos de botella de ArgoCD a gran escala', url: 'https://www.youtube.com/watch?v=zNGg87RME7I', locale: 'en', durationMin: 40, quality: 5 },
  { topicId: 'cloud-native-devops-gitops', type: 'video', title: 'Entrenamientos en Azure DevOps y Pipelines Corporativos', url: 'https://www.youtube.com/watch?v=GrqMXRMkrKQ', locale: 'en', durationMin: 60, quality: 4 },
  { topicId: 'cloud-native-devops-gitops', type: 'video', title: 'CI/CD Explicado Paso a Paso: Mejores prácticas', url: 'https://www.youtube.com/watch?v=yhzdg5loJIA', locale: 'es', durationMin: 55, quality: 5 },
  { topicId: 'cloud-native-devops-gitops', type: 'video', title: 'RoadMap del AWS DevOps Engineer e Infraestructura', url: 'https://www.youtube.com/watch?v=Bqdr9gd2Pwc', locale: 'es', durationMin: 50, quality: 4 },
  { topicId: 'cloud-native-devops-gitops', type: 'video', title: 'CI/CD en Kubernetes Local con Docker Desktop', url: 'https://www.youtube.com/watch?v=Zvch_KoyFnQ', locale: 'es', durationMin: 45, quality: 4 },
  { topicId: 'cloud-native-devops-gitops', type: 'video', title: 'Mega Curso DevOps (Jenkins, Docker, K8s)', url: 'https://www.youtube.com/watch?v=RwIhQg7Gxz0', locale: 'es', durationMin: 660, quality: 4 },
  { topicId: 'cloud-native-devops-gitops', type: 'video', title: 'Kubernetes Architecture y Docker Networking (Simplilearn)', url: 'https://www.youtube.com/watch?v=cC0V1LRDeLs', locale: 'es', durationMin: 60, quality: 4 },
  { topicId: 'cloud-native-devops-gitops', type: 'video', title: 'GitOps Avanzado con FluxCD (Kubernetes)', url: 'https://www.youtube.com/watch?v=PFLimPh5-wo', locale: 'en', durationMin: 45, quality: 4 },
  { topicId: 'cloud-native-devops-gitops', type: 'video', title: 'Pipelines Continuos y GitOps con ArgoCD a fondo', url: 'https://www.youtube.com/watch?v=AE5xTLV3qMk', locale: 'es', durationMin: 50, quality: 5 },
  { topicId: 'cloud-native-devops-gitops', type: 'video', title: 'Terraform: Infraestructura como Código y Monitoreo', url: 'https://www.youtube.com/watch?v=6GQRb4fGvtk', locale: 'es', durationMin: 50, quality: 4 },
  { topicId: 'cloud-native-devops-gitops', type: 'video', title: 'Curso de Edureka DevOps 7 Horas', url: 'https://www.youtube.com/watch?v=Ou9j73aWgyE', locale: 'en', durationMin: 420, quality: 4 },
  { topicId: 'cloud-native-devops-gitops', type: 'video', title: 'Shell scripting, AWS EC2 Deploy y Github Actions', url: 'https://www.youtube.com/watch?v=Tq0vZU7Hp_M', locale: 'es', durationMin: 45, quality: 4 },
  { topicId: 'cloud-native-devops-gitops', type: 'video', title: 'Despliegue de Java Oracle en OKE usando GitOps y CircleCI', url: 'https://www.youtube.com/watch?v=yu2xFcX6nTY', locale: 'es', durationMin: 50, quality: 4 },
  { topicId: 'cloud-native-devops-gitops', type: 'video', title: 'GitLab en K8s automatizado y Runners', url: 'https://www.youtube.com/watch?v=c5T0UkuD-6g', locale: 'es', durationMin: 45, quality: 4 },
  { topicId: 'cloud-native-devops-gitops', type: 'video', title: 'CI/CD con Terraform, CircleCI y Docker', url: 'https://www.youtube.com/watch?v=o5-QPfh-piM', locale: 'es', durationMin: 40, quality: 4 },
  { topicId: 'cloud-native-devops-gitops', type: 'video', title: 'Jenkins CI/CD Integración Pipeline', url: 'https://www.youtube.com/watch?v=iV1dSjdFKpg', locale: 'es', durationMin: 50, quality: 3 },

  // ── Articles ──
  { topicId: 'cloud-native-devops-gitops', type: 'article', title: 'GitOps: Construcción y Despliegue en K8s con GitLab y ArgoCD', url: 'https://medium.com/@ismaelaguilera_/gitops-construcci%C3%B3n-y-despliegue-de-aplicaciones-en-kubernetes-con-gitlab-ci-cd-y-argocd-81dd6215d032', locale: 'es', durationMin: 35, quality: 4 },
  { topicId: 'cloud-native-devops-gitops', type: 'article', title: 'DevOps Made Simple: CI/CD Pipelines con GitHub Actions', url: 'https://dev.to/yash_sonawane25/devops-made-simple-a-beginners-guide-to-setting-up-cicd-pipelines-with-github-actions--4143', locale: 'en', durationMin: 25, quality: 4 },
  { topicId: 'cloud-native-devops-gitops', type: 'article', title: 'Implement GitOps on Kubernetes using Argo CD (FreeCodeCamp)', url: 'https://www.freecodecamp.org/news/how-to-implement-gitops-on-kubernetes-using-argo-cd/', locale: 'en', durationMin: 40, quality: 5 },
  { topicId: 'cloud-native-devops-gitops', type: 'article', title: 'Infrastructure Automation with GitOps (Push vs Pull)', url: 'https://medium.com/@blogs4devs/infrastructure-automation-with-gitops-5be9219e7c07', locale: 'en', durationMin: 20, quality: 4 },
  { topicId: 'cloud-native-devops-gitops', type: 'article', title: 'Kubernetes GitOps: A Beginner\'s Guide with Harness', url: 'https://dev.to/pavanbelagatti/kubernetes-gitops-a-beginners-guide-with-a-hands-on-tutorial-56de', locale: 'en', durationMin: 25, quality: 4 },
  { topicId: 'cloud-native-devops-gitops', type: 'article', title: 'Introduction to Gitless-GitOps (OCI-Centric Architecture)', url: 'https://dev.to/t-kikuc/introduction-to-gitless-gitops-a-new-oci-centric-and-secure-architecture-2pgi', locale: 'en', durationMin: 20, quality: 4 },
  { topicId: 'cloud-native-devops-gitops', type: 'article', title: 'Kubernetes Architecture Deep Dive: Etcd and API Server', url: 'https://dev.to/godofgeeks/kubernetes-architecture-deep-dive-etcd-api-server-1995', locale: 'en', durationMin: 25, quality: 5 },
  { topicId: 'cloud-native-devops-gitops', type: 'article', title: 'Complete Guide to Etcd: The Distributed Key-Value Store', url: 'https://dev.to/jimjunior/a-complete-guide-to-etcd-the-distributed-key-value-store-powering-cloud-infrastructure-pif', locale: 'en', durationMin: 30, quality: 5 },
  { topicId: 'cloud-native-devops-gitops', type: 'article', title: 'Kubernetes Architecture Documentation (Official)', url: 'https://kubernetes.io/docs/concepts/overview/components/', locale: 'en', durationMin: 45, quality: 5 },
  { topicId: 'cloud-native-devops-gitops', type: 'article', title: 'Configure Upgrade Etcd in HA (Kubernetes Docs)', url: 'https://kubernetes.io/docs/tasks/administer-cluster/configure-upgrade-etcd/', locale: 'en', durationMin: 30, quality: 5 },
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
  { topicId: 'deep-observability-otel-sre', type: 'video', title: 'Las Partes de OpenTelemetry: APIs, SDKs y Collectors', url: 'https://www.youtube.com/watch?v=qX1pwf6njX4', locale: 'es', durationMin: 40, quality: 5 },
  { topicId: 'deep-observability-otel-sre', type: 'video', title: 'Dominando OpenTelemetry: Evitando el Vendor Lock-in', url: 'https://www.youtube.com/watch?v=wz1wAtVeeeQ', locale: 'es', durationMin: 45, quality: 5 },
  { topicId: 'deep-observability-otel-sre', type: 'video', title: 'Trazas Distribuidas con OpenTelemetry en Splunk / Grafana', url: 'https://www.youtube.com/watch?v=BM66TDy5y4I', locale: 'es', durationMin: 40, quality: 4 },
  { topicId: 'deep-observability-otel-sre', type: 'video', title: 'El Colector OTel vs Scraping de Servidores Prometheus', url: 'https://www.youtube.com/watch?v=zpDTAZ_yvl4', locale: 'es', durationMin: 30, quality: 5 },
  { topicId: 'deep-observability-otel-sre', type: 'video', title: 'Prometheus Metrics vs OTel: Delta Temporality & Ventajas', url: 'https://www.youtube.com/watch?v=39Dx4IocLyI', locale: 'es', durationMin: 35, quality: 4 },
  { topicId: 'deep-observability-otel-sre', type: 'video', title: 'Dashboards Grafana en Tiempo Real', url: 'https://www.youtube.com/watch?v=tLSS2t7Md3w', locale: 'es', durationMin: 35, quality: 4 },
  { topicId: 'deep-observability-otel-sre', type: 'video', title: 'Exportación de Trazas Zipkin y Configuración Prometheus', url: 'https://www.youtube.com/watch?v=V8TvJK2hU54', locale: 'es', durationMin: 25, quality: 4 },
  { topicId: 'deep-observability-otel-sre', type: 'video', title: 'Creación de Alertas basadas en Picos y Anomalías', url: 'https://www.youtube.com/watch?v=sNk9NkgTOLs', locale: 'es', durationMin: 30, quality: 4 },
  { topicId: 'deep-observability-otel-sre', type: 'video', title: 'Datadog Log Monitoring: Centralización Industrial', url: 'https://www.youtube.com/watch?v=uM9E3jqOYiA', locale: 'en', durationMin: 35, quality: 4 },
  { topicId: 'deep-observability-otel-sre', type: 'video', title: 'DevOps Monitoring: Logz.io vs ELK vs Prometheus', url: 'https://www.youtube.com/watch?v=nD6JfA9nGOg', locale: 'es', durationMin: 40, quality: 4 },
  { topicId: 'deep-observability-otel-sre', type: 'video', title: 'Ciberseguridad y Analítica de Logs para Respondedores SOC', url: 'https://www.youtube.com/watch?v=wv9stsMynC4', locale: 'es', durationMin: 45, quality: 4 },
  { topicId: 'deep-observability-otel-sre', type: 'video', title: 'Taller Web de Respuesta a Incidentes Vía Logs de Red', url: 'https://www.youtube.com/watch?v=8XuqFwgFYUk', locale: 'en', durationMin: 40, quality: 5 },
  { topicId: 'deep-observability-otel-sre', type: 'video', title: 'Cyberchef y Extracción de Payload en Sistemas', url: 'https://www.youtube.com/watch?v=mRqWtY6boxk', locale: 'es', durationMin: 25, quality: 3 },
  { topicId: 'deep-observability-otel-sre', type: 'video', title: 'Impacto de Latencia y Sharding en Dashboards y Métricas', url: 'https://www.youtube.com/watch?v=tVwEGkQ6idg', locale: 'es', durationMin: 30, quality: 4 },
  { topicId: 'deep-observability-otel-sre', type: 'video', title: 'Arquitectura de Sistemas de Mensajería Avanzados', url: 'https://www.youtube.com/watch?v=rd1VmW7ItD4', locale: 'es', durationMin: 50, quality: 4 },
  { topicId: 'deep-observability-otel-sre', type: 'video', title: 'Hilos en Red y el Costo Físico de Revisar Requests', url: 'https://www.youtube.com/watch?v=x9iHwoAbwiA', locale: 'es', durationMin: 35, quality: 4 },
  { topicId: 'deep-observability-otel-sre', type: 'video', title: 'Costo Operacional de Cabeceras Custom sobre HTTP/2', url: 'https://www.youtube.com/watch?v=ixuSv0k-jWU', locale: 'es', durationMin: 25, quality: 4 },
  { topicId: 'deep-observability-otel-sre', type: 'video', title: 'Protocolos de Red Exóticos y Entendimiento con cURL', url: 'https://www.youtube.com/watch?v=eusHw-mUa8Y', locale: 'es', durationMin: 30, quality: 3 },
  { topicId: 'deep-observability-otel-sre', type: 'video', title: 'NAT y Rutas IP para Ingenieros de Backend', url: 'https://www.youtube.com/watch?v=iV5fajdpb7c', locale: 'es', durationMin: 25, quality: 4 },
  { topicId: 'deep-observability-otel-sre', type: 'video', title: 'Configurar y Particionar Clústers NoSQL y Replicación', url: 'https://www.youtube.com/watch?v=jLEp1XI_L6Q', locale: 'es', durationMin: 35, quality: 4 },

  // ── Articles ──
  { topicId: 'deep-observability-otel-sre', type: 'article', title: 'OpenTelemetry — Sitio Oficial', url: 'https://opentelemetry.io/', locale: 'en', durationMin: 30, quality: 5 },
  { topicId: 'deep-observability-otel-sre', type: 'article', title: 'OTel y Prometheus en Clústers Azure (MS Docs)', url: 'https://learn.microsoft.com/es-es/azure/api-management/how-to-deploy-self-hosted-gateway-kubernetes-opentelemetry', locale: 'es', durationMin: 40, quality: 5 },
  { topicId: 'deep-observability-otel-sre', type: 'article', title: 'Monitorear Clústers Kubernetes con Prometheus, Loki y Grafana', url: 'https://medium.com/@ismaelaguilera_/monitorear-cluster-de-kubernetes-con-prometheus-loki-y-grafana-d6ffb620d265', locale: 'es', durationMin: 35, quality: 4 },
  { topicId: 'deep-observability-otel-sre', type: 'article', title: 'OTel in Action on K8s: Cluster-Level Observability', url: 'https://dev.to/kartikdudeja21/opentelemetry-in-action-on-kubernetes-part-9-cluster-level-observability-with-opentelemetry-3d5p', locale: 'en', durationMin: 30, quality: 4 },
  { topicId: 'deep-observability-otel-sre', type: 'article', title: 'Observability 2.0: The Future of Monitoring (Netflix Case)', url: 'https://dev.to/yash_sonawane25/observability-20-the-future-of-monitoring-with-opentelemetry-1d10', locale: 'en', durationMin: 25, quality: 4 },
  { topicId: 'deep-observability-otel-sre', type: 'article', title: 'Behind the Scenes: How Distributed Tracing Actually Works', url: 'https://medium.com/codex/behind-the-scenes-opentelemetry-how-distributed-tracing-actually-works-c6db84ce287b', locale: 'en', durationMin: 20, quality: 5 },
  { topicId: 'deep-observability-otel-sre', type: 'article', title: 'Observability Platform: Traces and Interconnected Spans', url: 'https://remyasavithry.medium.com/observability-platform-traces-b1ee670f46d3', locale: 'en', durationMin: 15, quality: 4 },
  { topicId: 'deep-observability-otel-sre', type: 'article', title: 'OpenTelemetry en Kubernetes — FreeCodeCamp Collection', url: 'https://www.freecodecamp.org/news/tag/opentelemetry/', locale: 'en', durationMin: 30, quality: 4 },
  { topicId: 'deep-observability-otel-sre', type: 'article', title: 'Effective Logging in Go: Best Practices', url: 'https://dev.to/fazal_mansuri_/effective-logging-in-go-best-practices-and-implementation-guide-23hp', locale: 'en', durationMin: 20, quality: 4 },
  { topicId: 'deep-observability-otel-sre', type: 'article', title: 'Exploring Logging Best Practices and Typologies', url: 'https://dev.to/574n13y/exploring-logging-best-practices-37l7', locale: 'en', durationMin: 15, quality: 4 },
  { topicId: 'deep-observability-otel-sre', type: 'article', title: 'Observability Best Practices: Future-Proofing Your Software', url: 'https://medium.com/eteam/observability-best-practices-how-to-future-proof-your-software-e2604c92fdc8', locale: 'en', durationMin: 20, quality: 4 },
  { topicId: 'deep-observability-otel-sre', type: 'article', title: 'Effective Logging con ISO 8601, Entity IDs y Relojes Sincronizados', url: 'https://juliofalbo.medium.com/effective-logging-strategies-for-better-observability-and-debugging-4b90decefdf1', locale: 'es', durationMin: 25, quality: 4 },
  { topicId: 'deep-observability-otel-sre', type: 'article', title: 'GitOps con GitLab CI/CD y ArgoCD (Mega Taller)', url: 'https://medium.com/@ismaelaguilera_/gitops-construcci%C3%B3n-y-despliegue-de-aplicaciones-en-kubernetes-con-gitlab-ci-cd-y-argocd-81dd6215d032', locale: 'es', durationMin: 45, quality: 4 },
  { topicId: 'deep-observability-otel-sre', type: 'article', title: 'GitHub Actions: Despliegues automatizados paso a paso', url: 'https://dev.to/yash_sonawane25/devops-made-simple-a-beginners-guide-to-setting-up-cicd-pipelines-with-github-actions--4143', locale: 'es', durationMin: 25, quality: 4 },
  { topicId: 'deep-observability-otel-sre', type: 'article', title: 'ArgoCD Image Updater: Loop Cero Intervenciones (FreeCodeCamp)', url: 'https://www.freecodecamp.org/news/how-to-implement-gitops-on-kubernetes-using-argo-cd/', locale: 'en', durationMin: 35, quality: 5 },
  { topicId: 'deep-observability-otel-sre', type: 'article', title: 'GitOps PUSH vs PULL Deployment Models', url: 'https://medium.com/@blogs4devs/infrastructure-automation-with-gitops-5be9219e7c07', locale: 'en', durationMin: 20, quality: 4 },
  { topicId: 'deep-observability-otel-sre', type: 'article', title: 'Deploying to Cloud with Harness.io (CD as a Service)', url: 'https://dev.to/pavanbelagatti/kubernetes-gitops-a-beginners-guide-with-a-hands-on-tutorial-56de', locale: 'en', durationMin: 25, quality: 4 },
  { topicId: 'deep-observability-otel-sre', type: 'article', title: 'Gitless-GitOps: OCI Registry Centric Architecture', url: 'https://dev.to/t-kikuc/introduction-to-gitless-gitops-a-new-oci-centric-and-secure-architecture-2pgi', locale: 'en', durationMin: 20, quality: 4 },
  { topicId: 'deep-observability-otel-sre', type: 'article', title: 'Kubernetes Architecture Deep Dive: Etcd and API Server', url: 'https://dev.to/godofgeeks/kubernetes-architecture-deep-dive-etcd-api-server-1995', locale: 'en', durationMin: 30, quality: 5 },
  { topicId: 'deep-observability-otel-sre', type: 'article', title: 'Complete Guide to Etcd: Distributed Key-Value Store Powering Cloud', url: 'https://dev.to/jimjunior/a-complete-guide-to-etcd-the-distributed-key-value-store-powering-cloud-infrastructure-pif', locale: 'en', durationMin: 30, quality: 5 },
];

// ──────────────────────────────────────────────────────
// PILLS — Micro-learning per topic
// ──────────────────────────────────────────────────────
const pills = [
  // ── Foundation pills (original) ──
  {
    id: 'pill-ds-1',
    topicId: 'data-structures-fundamentals',
    content:
      '**Arrays vs Linked Lists**: Arrays offer O(1) random access but O(n) insertion; linked lists offer O(1) insertion at head but O(n) access by index.',
    locale: 'en',
  },
  {
    id: 'pill-ds-2',
    topicId: 'data-structures-fundamentals',
    content:
      '**Hash Tables**: A hash table maps keys to values using a hash function, providing amortized O(1) lookup, insert, and delete — at the cost of extra memory and potential collisions.',
    locale: 'en',
  },
  {
    id: 'pill-algo-1',
    topicId: 'algorithms-complexity',
    content:
      '**Big-O Notation**: Big-O describes the upper bound on an algorithm\'s growth rate; O(log n) algorithms (e.g., binary search) are far more scalable than O(n²) ones for large inputs.',
    locale: 'en',
  },
  {
    id: 'pill-algo-2',
    topicId: 'algorithms-complexity',
    content:
      '**Divide & Conquer**: Algorithms like merge sort split a problem into halves recursively, solve each half, then combine — achieving O(n log n) time versus O(n²) for naive sorting.',
    locale: 'en',
  },
  {
    id: 'pill-sys-1',
    topicId: 'systems-design-basics',
    content:
      '**Horizontal vs Vertical Scaling**: Vertical scaling adds resources to one machine (limited by hardware); horizontal scaling adds more machines and requires load balancing and stateless services.',
    locale: 'en',
  },
  {
    id: 'pill-sys-2',
    topicId: 'systems-design-basics',
    content:
      '**CAP Theorem**: A distributed system can guarantee at most two of: Consistency, Availability, and Partition tolerance — most real systems choose AP or CP depending on their use case.',
    locale: 'en',
  },

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
      '**Single Responsibility Principle**: A class should have one reason to change. God Objects violate SRV by handling UI, data access, and business logic — split them into focused components.',
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
      '**GitOps**: Git is the single source of truth. ArgoCD/FluxCD watch your repo and reconcile cluster state. Manual kubectl edits are automatically reverted — infrastructure as code enforced.',
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
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());