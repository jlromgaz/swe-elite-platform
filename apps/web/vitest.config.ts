import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@elite/db': path.resolve(__dirname, '../../packages/db/src/index.ts'),
    },
  },
  test: {
    environment: 'node',
    env: {
      DATABASE_URL: 'file:./test.db',
    },
    pool: 'forks',
    poolOptions: {
      forks: {
        singleFork: true,
      },
    },
  },
});
