// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [...compat.extends("next/core-web-vitals", "next/typescript"), {
  ignores: [
    "node_modules/**",
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "**/*.d.ts",
    "**/*.config.js",
    "**/*.config.mjs",
  ],
  rules: {
    // TypeScript specific rules
    "@typescript-eslint/no-unused-vars": ["warn", { 
      "argsIgnorePattern": "^_",
      "varsIgnorePattern": "^_",
      "caughtErrorsIgnorePattern": "^_"
    }],
    "@typescript-eslint/no-explicit-any": "warn",
    "prefer-const": "error",
    "@typescript-eslint/no-non-null-assertion": "warn",
    "@typescript-eslint/consistent-type-imports": ["error", { 
      "prefer": "type-imports",
      "disallowTypeAnnotations": false
    }],
    
    // React specific rules
    "react-hooks/exhaustive-deps": "warn",
    "react/no-unescaped-entities": "error",
    "react/prop-types": "off", // Not needed with TypeScript
    "react/react-in-jsx-scope": "off", // Not needed with Next.js
    
    // Import rules
    "import/no-anonymous-default-export": "warn",
    "import/order": ["error", {
      "groups": [
        "builtin",
        "external", 
        "internal",
        "parent",
        "sibling",
        "index"
      ],
      "newlines-between": "always",
      "alphabetize": {
        "order": "asc",
        "caseInsensitive": true
      }
    }],
    
    // Next.js specific rules
    "@next/next/no-img-element": "warn",
    "@next/next/no-html-link-for-pages": "error",
    
    // General rules - JavaScript focused
    "no-var": "error",
    "no-console": ["warn", { "allow": ["warn", "error"] }],
    "no-debugger": "error",
    "no-duplicate-imports": "error",
    "no-unused-expressions": "error",
    "no-unused-vars": ["warn", { 
      "argsIgnorePattern": "^_",
      "varsIgnorePattern": "^_",
      "caughtErrorsIgnorePattern": "^_"
    }],
    
    // Accessibility rules
    "jsx-a11y/alt-text": "warn",
    "jsx-a11y/anchor-is-valid": "warn",
    "jsx-a11y/aria-props": "warn",
    "jsx-a11y/aria-proptypes": "warn",
    "jsx-a11y/aria-unsupported-elements": "warn",
    "jsx-a11y/role-has-required-aria-props": "warn",
    "jsx-a11y/role-supports-aria-props": "warn",
    
    // Code style
    "indent": ["error", 2, { "SwitchCase": 1 }],
    "quotes": ["error", "single", { "avoidEscape": true }],
    "semi": ["error", "always"],
    "comma-dangle": ["error", "always-multiline"],
    "object-curly-spacing": ["error", "always"],
    "array-bracket-spacing": ["error", "never"],
    "space-before-function-paren": ["error", {
      "anonymous": "always",
      "named": "never",
      "asyncArrow": "always"
    }]
  }
}, ...storybook.configs["flat/recommended"]];

export default eslintConfig;
