# CodeSpire Liquid Background Components

Advanced liquid shader effects integrated with CodeSpire's design system, maintaining brand consistency while adding modern visual appeal.

## Components

### CodeSpireLiquidBackground

A versatile background component that adds subtle liquid animations while preserving your existing color theme and professional aesthetic.

#### Usage

```jsx
import { CodeSpireLiquidBackground } from '../backgrounds';

// Basic usage
<CodeSpireLiquidBackground variant="hero">
  <YourContent />
</CodeSpireLiquidBackground>

// With custom settings
<CodeSpireLiquidBackground
  variant="section"
  intensity="medium"
  enableMouseInteraction={true}
  className="py-20"
>
  <YourContent />
</CodeSpireLiquidBackground>
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'hero' \| 'section' \| 'subtle' \| 'accent'` | `'hero'` | Visual style variant |
| `intensity` | `'low' \| 'medium' \| 'high'` | `'medium'` | Animation intensity |
| `enableMouseInteraction` | `boolean` | `true` | Enable mouse interaction effects |
| `className` | `string` | `''` | Additional CSS classes |
| `style` | `object` | `{}` | Inline styles |
| `children` | `ReactNode` | - | Content to render over the background |

#### Variants

- **`hero`**: Primary blue gradient, perfect for hero sections
- **`section`**: Primary with light grays, ideal for content sections  
- **`subtle`**: Subtle grays, great for backgrounds that shouldn't distract
- **`accent`**: Primary with white, good for highlighting important sections

## Enhanced Section Components

### HeroWithLiquid

Enhanced version of the Hero component with integrated liquid background effects.

```jsx
import { HeroWithLiquid } from '../sections';

<HeroWithLiquid />
```

### WhyCodeSpireWithLiquid  

Enhanced version of the WhyCodeSpire component with subtle liquid accents.

```jsx
import { WhyCodeSpireWithLiquid } from '../sections';

<WhyCodeSpireWithLiquid />
```

## Performance Features

- **Automatic Quality Scaling**: Adjusts complexity based on device performance
- **WebGL Fallbacks**: Graceful degradation to CSS animations when WebGL unavailable
- **Reduced Motion Support**: Respects user accessibility preferences
- **60fps Target**: Optimized for smooth performance across all devices

## Browser Support

- **Modern Browsers**: Full WebGL shader support with all features
- **Older Browsers**: CSS-based fallbacks maintain visual consistency
- **Mobile Devices**: Automatic performance optimization for smooth experience

## Color Theme Integration

All components automatically use your existing CodeSpire color variables:

- `--primary`: #384bff
- `--primary-hover`: #2d3fd9  
- `--primary-light`: rgba(56, 75, 255, 0.1)
- `--gray-*`: Your existing gray scale

No additional color configuration needed - the effects seamlessly integrate with your current design system.

## Examples

Visit `/design-comparison` to see interactive before/after comparisons, or `/enhanced-design` to experience the full enhanced design.