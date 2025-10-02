import { Zap, Shield, Code2, Rocket, Users, Target } from 'lucide-react';
import HighlightCard from '../../components/ui/HighlightCard';

export default {
  title: 'UI/HighlightCard',
  component: HighlightCard,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A highlight card component with icon, title, description, and hover animations. Used in the "Why CodeSpire" section.',
      },
    },
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'The title of the highlight card',
    },
    description: {
      control: 'text',
      description: 'The description text for the card',
    },
    icon: {
      control: 'select',
      options: ['Zap', 'Shield', 'Code2', 'Rocket', 'Users', 'Target'],
      mapping: {
        Zap: Zap,
        Shield: Shield,
        Code2: Code2,
        Rocket: Rocket,
        Users: Users,
        Target: Target,
      },
      description: 'The Lucide React icon to display',
    },
    delay: {
      control: { type: 'range', min: 0, max: 1, step: 0.1 },
      description: 'Animation delay in seconds',
    },
  },
};

// Default story
export const Default = {
  args: {
    title: 'Rapid AI Product Engineering',
    description: 'From concept to deployment in weeks, not months. Our agile approach and pre-built AI frameworks accelerate your time-to-market while maintaining enterprise standards.',
    icon: Zap,
    delay: 0,
  },
};

// Enterprise Quality variant
export const EnterpriseQuality = {
  args: {
    title: 'Enterprise-Grade Quality',
    description: 'Built for scale with security, compliance, and reliability at the core. Our solutions meet the highest enterprise standards with robust architecture and comprehensive testing.',
    icon: Shield,
    delay: 0.2,
  },
};

// Full Stack Expertise variant
export const FullStackExpertise = {
  args: {
    title: 'AI + Full Stack Expertise',
    description: 'Complete end-to-end solutions combining cutting-edge AI with full-stack development. From machine learning models to production-ready applications.',
    icon: Code2,
    delay: 0.4,
  },
};

// Grid layout example
export const GridLayout = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl">
      <HighlightCard
        title="Rapid AI Product Engineering"
        description="From concept to deployment in weeks, not months. Our agile approach and pre-built AI frameworks accelerate your time-to-market."
        icon={Zap}
        delay={0}
      />
      <HighlightCard
        title="Enterprise-Grade Quality"
        description="Built for scale with security, compliance, and reliability at the core. Our solutions meet the highest enterprise standards."
        icon={Shield}
        delay={0.2}
      />
      <HighlightCard
        title="AI + Full Stack Expertise"
        description="Complete end-to-end solutions combining cutting-edge AI with full-stack development expertise."
        icon={Code2}
        delay={0.4}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Example of highlight cards in a responsive grid layout. Displays 3 columns on large screens, 2 on medium, and 1 on mobile.',
      },
    },
  },
};

// Responsive behavior demonstration
export const ResponsiveBehavior = {
  render: () => (
    <div className="space-y-8">
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-2">Responsive Grid Behavior</h3>
        <p className="text-sm text-gray-600 mb-4">Resize your browser to see the grid adapt</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto">
        <HighlightCard
          title="Mobile: 1 Column"
          description="On mobile devices, cards stack vertically in a single column for optimal readability."
          icon={Zap}
          delay={0}
        />
        <HighlightCard
          title="Tablet: 2 Columns"
          description="On medium screens, cards arrange in a 2-column grid for balanced layout."
          icon={Shield}
          delay={0.2}
        />
        <HighlightCard
          title="Desktop: 3 Columns"
          description="On large screens, all three cards display side-by-side for maximum efficiency."
          icon={Code2}
          delay={0.4}
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates the responsive behavior of the grid layout across different screen sizes.',
      },
    },
  },
};

// Different icons showcase
export const IconVariants = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl">
      <HighlightCard
        title="Innovation"
        description="Cutting-edge solutions that push the boundaries of what's possible."
        icon={Rocket}
        delay={0}
      />
      <HighlightCard
        title="Team Expertise"
        description="50+ skilled experts with deep knowledge in AI and enterprise development."
        icon={Users}
        delay={0.1}
      />
      <HighlightCard
        title="Targeted Solutions"
        description="Precisely crafted solutions that address your specific business challenges."
        icon={Target}
        delay={0.2}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Showcase of different icon variants available for highlight cards.',
      },
    },
  },
};