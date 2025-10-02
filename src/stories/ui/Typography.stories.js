import { Heading, Text, Label } from '../../components/ui/Typography';

export default {
  title: 'UI/Typography',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Typography components for consistent text styling across the CodeSpire design system.',
      },
    },
  },
  tags: ['autodocs'],
};

// Heading component stories
export const Headings = {
  render: () => (
    <div className="space-y-6">
      <div>
        <Heading level={1} size="hero">Hero Heading</Heading>
        <Text size="sm" color="secondary">level={1} size=&quot;hero&quot;</Text>
      </div>
      <div>
        <Heading level={1}>H1 Heading</Heading>
        <Text size="sm" color="secondary">level={1} (auto-sized)</Text>
      </div>
      <div>
        <Heading level={2}>H2 Heading</Heading>
        <Text size="sm" color="secondary">level={2} (auto-sized)</Text>
      </div>
      <div>
        <Heading level={3}>H3 Heading</Heading>
        <Text size="sm" color="secondary">level={3} (auto-sized)</Text>
      </div>
      <div>
        <Heading level={4}>H4 Heading</Heading>
        <Text size="sm" color="secondary">level={4} (auto-sized)</Text>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All heading levels with automatic sizing based on semantic level.',
      },
    },
  },
};

// Text component stories
export const TextSizes = {
  render: () => (
    <div className="space-y-4">
      <div>
        <Text size="body-lg">Large body text for emphasis</Text>
        <Text size="sm" color="secondary">size=&quot;body-lg&quot;</Text>
      </div>
      <div>
        <Text size="body">Regular body text for main content</Text>
        <Text size="sm" color="secondary">size=&quot;body&quot; (default)</Text>
      </div>
      <div>
        <Text size="sm">Small text for captions and secondary information</Text>
        <Text size="sm" color="secondary">size=&quot;sm&quot;</Text>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different text sizes for various content hierarchy levels.',
      },
    },
  },
};

// Text colors
export const TextColors = {
  render: () => (
    <div className="space-y-4">
      <div>
        <Text color="primary">Primary text color for main content</Text>
        <Text size="sm" color="secondary">color=&quot;primary&quot; (default)</Text>
      </div>
      <div>
        <Text color="secondary">Secondary text color for supporting content</Text>
        <Text size="sm" color="secondary">color=&quot;secondary&quot;</Text>
      </div>
      <div className="bg-gray-900 p-4 rounded">
        <Text color="white">White text for dark backgrounds</Text>
        <Text size="sm" color="secondary">color=&quot;white&quot;</Text>
      </div>
      <div>
        <Text color="primary-color">Primary brand color text</Text>
        <Text size="sm" color="secondary">color=&quot;primary-color&quot;</Text>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different text colors for various contexts and emphasis levels.',
      },
    },
  },
};

// Label component
export const Labels = {
  render: () => (
    <div className="space-y-4">
      <div>
        <Label>Form Label</Label>
        <Text size="sm" color="secondary">Standard label styling</Text>
      </div>
      <div>
        <Label className="text-primary">Custom Styled Label</Label>
        <Text size="sm" color="secondary">Label with custom className</Text>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Label component for form fields and small text elements.',
      },
    },
  },
};

// Typography hierarchy showcase
export const TypographyHierarchy = {
  render: () => (
    <div className="max-w-3xl space-y-6">
      <Heading level={1} size="hero">CodeSpire Design System</Heading>
      <Text size="body-lg" color="secondary">
        A comprehensive typography system for consistent and accessible text styling.
      </Text>
      
      <Heading level={2}>Getting Started</Heading>
      <Text>
        The typography system provides semantic heading levels and flexible text components
        that automatically adapt to your design needs while maintaining accessibility standards.
      </Text>
      
      <Heading level={3}>Key Features</Heading>
      <Text>
        Our typography components include automatic sizing, semantic HTML output, and
        consistent spacing that works seamlessly with the overall design system.
      </Text>
      
      <div className="bg-gray-50 p-4 rounded-lg">
        <Label>Pro Tip</Label>
        <Text size="sm">
          Use semantic heading levels (h1-h6) for proper document structure, and override
          visual sizing with the size prop when needed.
        </Text>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A complete example showing typography hierarchy in a real content context.',
      },
    },
  },
};

// Individual component stories for better control testing
export const HeadingComponent = {
  component: Heading,
  argTypes: {
    level: {
      control: { type: 'select' },
      options: [1, 2, 3, 4, 5, 6],
      description: 'Semantic heading level (h1-h6)',
    },
    size: {
      control: { type: 'select' },
      options: ['hero', 'h1', 'h2', 'h3'],
      description: 'Visual size override',
    },
    children: {
      control: { type: 'text' },
      description: 'Heading text content',
    },
  },
  args: {
    level: 2,
    children: 'Sample Heading',
  },
};

export const TextComponent = {
  component: Text,
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['body-lg', 'body', 'sm'],
      description: 'Text size variant',
    },
    color: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'white', 'primary-color'],
      description: 'Text color variant',
    },
    children: {
      control: { type: 'text' },
      description: 'Text content',
    },
  },
  args: {
    size: 'body',
    color: 'primary',
    children: 'Sample text content for the typography component.',
  },
};