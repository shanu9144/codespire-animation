import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { defineConfig } from 'vitest/config';

import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';

const dirname =
  typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  test: {
    // TypeScript support
    typecheck: {
      enabled: true,
      tsconfig: './tsconfig.json',
    },
    // Environment setup
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    // File patterns
    include: [
      'src/**/*.{test,spec}.{js,jsx,ts,tsx}',
      'src/**/__tests__/**/*.{js,jsx,ts,tsx}',
      '.storybook/**/*.{test,spec}.{js,jsx,ts,tsx}',
    ],
    exclude: [
      'node_modules',
      '.next',
      'out',
      'build',
      'dist',
    ],
    // Coverage configuration
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        '.next/',
        'out/',
        'build/',
        'dist/',
        '**/*.d.ts',
        '**/*.config.{js,ts,mjs}',
        '**/stories/**',
        '**/*.stories.{js,jsx,ts,tsx}',
        'src/test/**',
      ],
      thresholds: {
        global: {
          branches: 80,
          functions: 80,
          lines: 80,
          statements: 80,
        },
      },
    },
    // Test projects
    projects: [
      {
        name: 'unit',
        test: {
          include: ['src/**/*.{test,spec}.{js,jsx,ts,tsx}'],
          exclude: [
            'src/**/__tests__/**/*',
            '.storybook/**/*',
          ],
        },
      },
      {
        name: 'integration',
        test: {
          include: ['src/**/__tests__/**/*.{js,jsx,ts,tsx}'],
        },
      },
      {
        name: 'storybook',
        extends: true,
        plugins: [
          // The plugin will run tests for the stories defined in your Storybook config
          // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
          storybookTest({ configDir: path.join(dirname, '.storybook') }),
        ],
        test: {
          name: 'storybook',
          browser: {
            enabled: true,
            headless: true,
            provider: 'playwright',
            instances: [{ browser: 'chromium' }],
          },
          setupFiles: ['.storybook/vitest.setup.js'],
        },
      },
    ],
  },
  // Resolve configuration for TypeScript
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@/components': path.resolve(__dirname, './src/components'),
      '@/animations': path.resolve(__dirname, './src/animations'),
      '@/lib': path.resolve(__dirname, './src/lib'),
      '@/app': path.resolve(__dirname, './src/app'),
      '@/styles': path.resolve(__dirname, './src/styles'),
      '@/stories': path.resolve(__dirname, './src/stories'),
      '@/types': path.resolve(__dirname, './src/types'),
    },
  },
});
