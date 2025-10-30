# CodeSpire Animation

A modern, minimalist B2B website for CodeSpire Solutions built with Next.js, showcasing AI expertise and enterprise-grade solutions with advanced animations.

## Tech Stack

- **Framework**: Next.js 15.5.4 with App Router
- **Styling**: Tailwind CSS v4 with custom design system
- **Animations**: Framer Motion for smooth, performant animations
- **Icons**: Lucide React for consistent iconography
- **Font**: Inter for modern typography

## Design System

### Colors
- **Primary**: #384bff (CodeSpire Blue)
- **Primary Hover**: #2d3fd9
- **Background**: White (#ffffff)
- **Text**: #111827 (primary), #6b7280 (secondary)

### Typography Scale
- **Hero**: 4rem (64px) - Bold
- **H1**: 3rem (48px) - Bold
- **H2**: 2.25rem (36px) - Semibold
- **H3**: 1.875rem (30px) - Semibold
- **Body Large**: 1.125rem (18px)
- **Body**: 1rem (16px)

## Project Structure

```
codespire-animation/
├── src/
│   ├── app/                          # Next.js 15 App Router
│   │   ├── page.tsx (Homepage)
│   │   ├── contact/
│   │   ├── products/
│   │   ├── services/
│   │   ├── schedule-demo/
│   │   └── layout.tsx
│   ├── components/                   # React components
│   │   ├── ui/                       # Atomic UI components
│   │   ├── sections/                 # Page sections
│   │   ├── backgrounds/              # Background components
│   │   ├── animations/               # Animation wrapper components
│   │   ├── debug/                    # Debug components
│   │   ├── demo/                     # Demo components
│   │   ├── optimized/                # Optimized components
│   │   └── providers/                # Context providers
│   ├── lib/                          # Core libraries
│   │   ├── animations/               # Animation system
│   │   │   ├── 3d/                   # Three.js 3D animations
│   │   │   ├── scroll/               # Scroll-based animations
│   │   │   ├── cursor/               # Cursor effects
│   │   │   ├── fluid/                # Fluid/liquid effects
│   │   │   ├── particles/            # Particle systems
│   │   │   ├── intersection/         # Intersection Observer
│   │   │   └── core/                 # Animation engine core
│   │   ├── performance/              # Performance utilities
│   │   ├── accessibility/            # A11y utilities
│   │   ├── seo/                      # SEO utilities
│   │   └── utils/                    # General utilities
│   ├── hooks/                        # Custom React hooks
│   ├── context/                      # React contexts
│   ├── types/                        # TypeScript type definitions
│   ├── config/                       # Configuration files
│   │   └── fonts.ts                  # Font configurations
│   ├── stories/                      # Storybook stories
│   └── test/                         # Test setup
├── docs/                             # Documentation
│   ├── animations/                   # Animation-specific docs
│   ├── backgrounds/                  # Background-specific docs
│   └── *.md                          # Project documentation
├── public/                           # Static assets
├── package.json
├── next.config.js
├── tsconfig.json
├── tailwind.config.js
└── README.md
```

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) to view the website.

## Features

- ✅ Modern Next.js 15+ with App Router
- ✅ Tailwind CSS with custom CodeSpire theme
- ✅ Framer Motion for smooth animations
- ✅ Lucide React icons
- ✅ Responsive design system
- ✅ Accessibility-first approach
- ✅ Performance optimized

### Recent Updates
- Global SEO enhancements: added comprehensive primary keywords in `src/app/layout.tsx` (`metadata.keywords`).
- Open Graph/Twitter fix: set `metadataBase` for absolute social image URLs.
- Smooth scrolling future-proofing: added `data-scroll-behavior="smooth"` on `<html>`.
- Home promo video UX: no autoplay; hover-only play/pause overlay; audio plays when user clicks.
- Dev-only stability: neutralized React DevTools injection to avoid semver console noise.
- SVG safety: ensured animated circles define numeric `r` and `initial.r`.
- Performance governor: real-time FPS monitor clamps heavy animations under load; adds `reduced-animations` class to `<html>` when active.

## Development

The project follows a component-based architecture with:
- Reusable UI components in `src/components/ui/`
- Page sections in `src/components/sections/`
- Animation utilities in `src/lib/animations/`
- Shared utilities in `src/lib/utils/`
- Custom hooks in `src/hooks/`
- Type definitions in `src/types/`
- Configuration in `src/config/`

### Path Aliases

The project uses TypeScript path aliases for clean imports:
- `@/components/*` → `src/components/*`
- `@/lib/*` → `src/lib/*`
- `@/hooks/*` → `src/hooks/*`
- `@/config/*` → `src/config/*`
- `@/types/*` → `src/types/*`
- `@/context/*` → `src/context/*`

## Performance

- Optimized for Core Web Vitals
- Framer Motion animations tuned dynamically by `useAnimationPerformance()`
- Real-time FPS monitoring with tiered clamping (disables complex animations, parallax, blur under load)
- Adds `reduced-animations` class to document root for global CSS fallbacks
- Next.js Image optimization and intrinsic sizing to preserve aspect ratio
- Minimal bundle size with tree shaking

## SEO
- Keywords configured in `src/app/layout.tsx` under `export const metadata.keywords`.
- OpenGraph/Twitter images resolve against `metadataBase`.

## Video Behavior (Home)
- The promo `<video>` renders without native controls, shows a play/pause button on hover, and unmutes on user play.

## Dev Notes
- To update three.js/fiber versions: `npm i @react-three/fiber@latest three@latest`.
- To adjust performance thresholds, edit `src/lib/performance.js` `getPerformanceConfig()`.
