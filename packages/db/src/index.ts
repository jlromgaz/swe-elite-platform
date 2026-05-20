import { PrismaClient } from '@prisma/client';

export { QUIZ_BANK } from './quiz-bank';
export type { QuizEntry } from './quiz-bank';

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasourceUrl: process.env.DATABASE_URL ?? 'file:./dev.db',
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

prisma.$executeRawUnsafe('PRAGMA journal_mode=WAL').catch(() => {});
prisma.$executeRawUnsafe('PRAGMA synchronous=NORMAL').catch(() => {});
