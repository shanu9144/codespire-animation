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
src/
├── app/
│   ├── page.js (Homepage)
│   ├── about/
│   ├── products/
│   └── layout.js
├── components/
│   ├── ui/ (Reusable UI components)
│   ├── sections/ (Page sections)
│   └── animations/ (Animation wrappers)
├── lib/
│   └── utils.js (Utility functions)
└── styles/
    └── globals.css
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

## Development

The project follows a component-based architecture with:
- Reusable UI components in `components/ui/`
- Page sections in `components/sections/`
- Animation utilities in `components/animations/`
- Shared utilities in `lib/utils.js`

## Performance

- Optimized for Core Web Vitals
- 60fps animations with Framer Motion
- Next.js Image optimization
- Minimal bundle size with tree shaking
