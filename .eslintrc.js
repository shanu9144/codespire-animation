/**
 * ESLint Configuration
 * Enhanced JavaScript linting rules for CodeSpire
 * Note: This is a backup config. The main config is in eslint.config.mjs
 */

module.exports = {
  root: true,
  env: {
    browser: true,
    es2022: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'next/core-web-vitals',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    // Best practices
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'no-debugger': 'error',
    'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    'prefer-const': 'error',
    'no-var': 'error',
    
    // React
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'react/no-unescaped-entities': 'error',
    
    // Code style
    'quotes': ['error', 'single', { avoidEscape: true }],
    'semi': ['error', 'always'],
    'comma-dangle': ['error', 'always-multiline'],
    'indent': ['error', 2, { SwitchCase: 1 }],
    
    // Accessibility
    'jsx-a11y/alt-text': 'warn',
    'jsx-a11y/anchor-is-valid': 'warn',
  },
};

