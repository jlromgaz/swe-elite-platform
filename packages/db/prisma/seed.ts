import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  datasourceUrl: process.env.DATABASE_URL ?? 'file:./dev.db',
});

const topics = [
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
];

const pills = [
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
];

async function main() {
  console.log('Seeding foundational topics...');

  for (const topic of topics) {
    await prisma.topic.upsert({
      where: { id: topic.id },
      update: {},
      create: topic,
    });
  }

  const topicCount = await prisma.topic.count();
  console.log(`Done — ${topicCount} topics in database.`);

  console.log('Seeding pills...');

  for (const pill of pills) {
    await prisma.pill.upsert({
      where: { id: pill.id },
      update: {},
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
