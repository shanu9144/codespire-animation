# Enterprise Folder Structure Documentation

## Overview

This document describes the enterprise-level folder structure implemented for the CodeSpire website. The structure follows best practices for SEO, accessibility, code organization, and maintainability.

## Directory Structure

```
codespire-animation/
├── src/
│   ├── app/                    # Next.js 15 App Router
│   │   ├── (marketing)/        # Route group for marketing pages
│   │   ├── (products)/         # Route group for products
│   │   ├── (services)/         # Route group for services
│   │   ├── layout.js           # Root layout with SEO & A11y providers
│   │   ├── page.js             # Homepage
│   │   ├── error.js            # Error boundary page
│   │   ├── global-error.jsx    # Global error handler
│   │   ├── sitemap.js          # Dynamic sitemap generation
│   │   ├── robots.js           # Dynamic robots.txt
│   │   └── opengraph-image.jsx # Dynamic OG image generation
│   │
│   ├── components/
│   │   ├── ui/                 # Atomic UI components
│   │   │   ├── buttons/
│   │   │   ├── cards/
│   │   │   ├── typography/
│   │   │   └── index.js
│   │   ├── sections/           # Page sections
│   │   │   ├── layout/         # Layout components (Header, Footer)
│   │   │   ├── hero/           # Hero sections
│   │   │   ├── products/       # Product-specific sections
│   │   │   ├── services/       # Service-specific sections
│   │   │   └── index.js
│   │   ├── features/           # Feature-based components
│   │   │   ├── seo/            # SEO components
│   │   │   │   ├── StructuredData/
│   │   │   │   └── MetaTags/
│   │   │   └── accessibility/  # A11y components
│   │   ├── backgrounds/        # Background components
│   │   ├── providers/          # Context providers
│   │   └── index.js
│   │
│   ├── lib/                    # Core libraries
│   │   ├── seo/                # SEO utilities
│   │   │   ├── config/         # SEO configuration
│   │   │   ├── utils/          # SEO utilities
│   │   │   └── hooks/          # SEO hooks
│   │   ├── accessibility/      # Accessibility utilities
│   │   │   ├── hooks/          # A11y hooks
│   │   │   ├── utils/          # A11y utilities
│   │   │   └── constants/      # ARIA constants
│   │   ├── animations/         # Animation system
│   │   ├── performance/        # Performance utilities
│   │   └── utils/              # General utilities
│   │
│   ├── config/                 # Configuration files
│   │   ├── seo.js              # SEO configuration
│   │   ├── site.js             # Site-wide config
│   │   ├── accessibility.js    # A11y config
│   │   ├── analytics.js        # Analytics config
│   │   └── fonts.js            # Font configuration
│   │
│   ├── constants/              # Application constants
│   │   ├── routes.js           # Route definitions
│   │   ├── keywords.js         # SEO keywords
│   │   └── metadata.js         # Static metadata
│   │
│   ├── hooks/                  # Custom React hooks
│   ├── context/                # React contexts
│   ├── styles/                 # Additional styles
│   │   ├── accessibility.css   # A11y styles
│   │   ├── animations.css      # Animation keyframes
│   │   └── utilities.css       # Utility classes
│   └── types/                  # TypeScript definitions
│
├── public/                     # Static assets
│   ├── assets/                 # Images, icons, videos
│   ├── robots.txt              # Static robots.txt
│   └── manifest.json           # PWA manifest
│
├── .prettierrc                 # Prettier configuration
├── .eslintrc.js                # ESLint configuration
├── eslint.config.mjs           # ESLint flat config
├── next.config.js              # Next.js configuration
└── package.json
```

## Key Features

### 1. SEO Optimization
- **Primary Keyword**: "Codespire" - integrated throughout the site
- Centralized SEO configuration in `src/config/seo.js`
- Dynamic sitemap and robots.txt generation
- Structured data components for Schema.org
- Open Graph image generation
- Metadata utilities for all pages

### 2. Accessibility (WCAG 2.1 AA)
- Skip navigation links
- ARIA live regions for screen readers
- Focus indicators
- Keyboard navigation support
- Reduced motion support
- High contrast mode detection
- Screen reader optimization

### 3. Code Organization
- Barrel exports for clean imports
- Feature-based component organization
- Atomic design pattern for UI components
- Centralized configuration
- Reusable utilities

### 4. Best Practices
- Error boundaries for error handling
- ESLint configuration for code quality
- Prettier for code formatting
- Security headers in Next.js config
- Performance optimizations

## Usage Examples

### Using SEO Utilities

```javascript
import { generatePageMetadata } from '@/lib/seo/utils/generate-metadata';

export const metadata = generatePageMetadata({
  title: 'About Us',
  description: 'Learn about CodeSpire Solutions',
  path: '/about',
  keywords: ['about', 'company'],
});
```

### Using Accessibility Components

```javascript
import { SkipToContent } from '@/components/features/accessibility';

function Page() {
  return (
    <>
      <SkipToContent />
      {/* Page content */}
    </>
  );
}
```

### Using Structured Data

```javascript
import { OrganizationSchema } from '@/components/features/seo';

function Layout() {
  return (
    <>
      <OrganizationSchema />
      {/* Layout content */}
    </>
  );
}
```

## Import Paths

The project uses Next.js path aliases:

- `@/components/*` → `src/components/*`
- `@/lib/*` → `src/lib/*`
- `@/config/*` → `src/config/*`
- `@/hooks/*` → `src/hooks/*`
- `@/constants/*` → `src/constants/*`

## Next Steps

1. Update individual page.js files to use new SEO utilities
2. Add structured data to product and service pages
3. Implement accessibility features in interactive components
4. Run accessibility audits (axe DevTools, Lighthouse)
5. Test SEO implementation with Google Search Console
6. Verify all barrel exports work correctly

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Schema.org Documentation](https://schema.org/)
- [SEO Best Practices](https://developers.google.com/search/docs)

