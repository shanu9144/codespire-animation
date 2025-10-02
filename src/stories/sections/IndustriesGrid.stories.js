import IndustriesGrid from '../../components/sections/IndustriesGrid';

export default {
  title: 'Sections/IndustriesGrid',
  component: IndustriesGrid,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Industries served section with responsive grid that becomes carousel on mobile. Features interactive hover effects and smooth animations.',
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
        story: 'Default industries grid showing all 5 industries with hover effects and animations.',
      },
    },
  },
};

export const MobileView = {
  args: {},
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    docs: {
      description: {
        story: 'Mobile carousel view with touch/swipe navigation and dot indicators.',
      },
    },
  },
};

export const TabletView = {
  args: {},
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
    docs: {
      description: {
        story: 'Tablet view showing responsive grid layout.',
      },
    },
  },
};