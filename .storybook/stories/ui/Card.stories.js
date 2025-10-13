import Card, { CardHeader, CardContent, CardFooter } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { Heading, Text } from '../../components/ui/Typography';

export default {
  title: 'UI/Card',
  component: Card,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A flexible card component with header, content, and footer sections for the CodeSpire design system.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'elevated', 'highlight'],
      description: 'The visual style variant of the card',
    },
    hover: {
      control: { type: 'boolean' },
      description: 'Whether the card has hover effects',
    },
  },
};

// Basic card
export const Default = {
  args: {
    variant: 'default',
    hover: true,
    children: (
      <div className="p-6">
        <Text>This is a basic card with default styling.</Text>
      </div>
    ),
  },
};

// Card with header and content
export const WithHeaderAndContent = {
  args: {
    variant: 'default',
    hover: true,
    children: (
      <>
        <CardHeader>
          <Heading level={3}>Card Title</Heading>
          <Text size="sm" color="secondary">Card subtitle or description</Text>
        </CardHeader>
        <CardContent>
          <Text>
            This is the main content area of the card. It can contain any type of content
            including text, images, or other components.
          </Text>
        </CardContent>
      </>
    ),
  },
};

// Full card with header, content, and footer
export const FullCard = {
  args: {
    variant: 'default',
    hover: true,
    children: (
      <>
        <CardHeader>
          <Heading level={3}>Complete Card</Heading>
          <Text size="sm" color="secondary">A card with all sections</Text>
        </CardHeader>
        <CardContent>
          <Text>
            This card demonstrates all available sections: header, content, and footer.
            Perfect for displaying structured information with actions.
          </Text>
        </CardContent>
        <CardFooter>
          <div className="flex gap-2">
            <Button size="sm" variant="primary">Primary Action</Button>
            <Button size="sm" variant="outline">Secondary</Button>
          </div>
        </CardFooter>
      </>
    ),
  },
};

// Elevated variant
export const Elevated = {
  args: {
    variant: 'elevated',
    hover: true,
    children: (
      <>
        <CardHeader>
          <Heading level={3}>Elevated Card</Heading>
          <Text size="sm" color="secondary">Enhanced shadow styling</Text>
        </CardHeader>
        <CardContent>
          <Text>
            This card uses the elevated variant for more prominent display with enhanced shadows.
          </Text>
        </CardContent>
      </>
    ),
  },
};

// Highlight variant
export const Highlight = {
  args: {
    variant: 'highlight',
    hover: true,
    children: (
      <>
        <CardHeader>
          <Heading level={3}>Highlight Card</Heading>
          <Text size="sm" color="secondary">Special emphasis styling</Text>
        </CardHeader>
        <CardContent>
          <Text>
            This card uses the highlight variant with primary color accents for special emphasis.
          </Text>
        </CardContent>
      </>
    ),
  },
};

// No hover effects
export const NoHover = {
  args: {
    variant: 'default',
    hover: false,
    children: (
      <div className="p-6">
        <Text>This card has hover effects disabled.</Text>
      </div>
    ),
  },
};

// All variants showcase
export const AllVariants = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl">
      <Card variant="default">
        <CardHeader>
          <Heading level={4}>Default</Heading>
          <Text size="sm" color="secondary">Standard card styling</Text>
        </CardHeader>
        <CardContent>
          <Text size="sm">Basic card with subtle border and shadow.</Text>
        </CardContent>
      </Card>
      
      <Card variant="elevated">
        <CardHeader>
          <Heading level={4}>Elevated</Heading>
          <Text size="sm" color="secondary">Enhanced shadow</Text>
        </CardHeader>
        <CardContent>
          <Text size="sm">Card with more prominent shadow for emphasis.</Text>
        </CardContent>
      </Card>
      
      <Card variant="highlight">
        <CardHeader>
          <Heading level={4}>Highlight</Heading>
          <Text size="sm" color="secondary">Primary accent</Text>
        </CardHeader>
        <CardContent>
          <Text size="sm">Card with primary color accents for special content.</Text>
        </CardContent>
      </Card>
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'A showcase of all card variants side by side.',
      },
    },
  },
};