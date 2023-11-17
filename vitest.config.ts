import { defineConfig } from 'vitest/config';

const resolve = (val: string) => new URL(val, import.meta.url).pathname;

const exclude = [
  '**/node_modules/**',
  '**/dist/**',
  '**/.{idea,git,cache,output,temp}/**',
  '**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build}.config.*',
];

export default defineConfig({
  root: process.cwd(),
  test: {
    hideSkippedTests: true,
    environment: 'happy-dom',
    coverage: {
      provider: 'v8',
      exclude,
      reporter: ['text', 'json', 'html'],
    },
    exclude,
  },
  resolve: {
    alias: {
      '@': resolve('src'),
    },
  },
});
