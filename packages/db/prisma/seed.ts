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

async function main() {
  console.log('Seeding foundational topics...');

  for (const topic of topics) {
    await prisma.topic.upsert({
      where: { id: topic.id },
      update: {},
      create: topic,
    });
  }

  const count = await prisma.topic.count();
  console.log(`Done — ${count} topics in database.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
