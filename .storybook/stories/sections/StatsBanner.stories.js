import StatsBanner from '../../../src/features/stats/components/StatsBanner';

export default {
  title: 'Sections/StatsBanner',
  component: StatsBanner,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A stats banner component that displays animated counters for key metrics with scroll-triggered animations.',
      },
    },
  },
  tags: ['autodocs'],
};

export const Default = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'The default stats banner showing 50+ Skilled Experts, 7+ Satisfied Clients, and 5+ Global Industries with animated counters.',
      },
    },
  },
};

export const WithReducedMotion = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'Stats banner with reduced motion for accessibility. Animations are simplified or disabled based on user preferences.',
      },
    },
  },
  beforeEach: () => {
    // Mock reduced motion preference
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: query === '(prefers-reduced-motion: reduce)',
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  },
};

export const InViewport = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'Stats banner when it comes into viewport, triggering the counter animations.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    // Simulate scroll to trigger intersection observer
    const section = canvasElement.querySelector('section');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  },
};