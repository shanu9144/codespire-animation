import WhyCodeSpire from '../../components/sections/WhyCodeSpire';

export default {
  title: 'Sections/WhyCodeSpire',
  component: WhyCodeSpire,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'The "Why CodeSpire" section showcasing company highlights with animated cards in a responsive grid layout.',
      },
    },
  },
};

// Default story
export const Default = {
  render: () => <WhyCodeSpire />,
  parameters: {
    docs: {
      description: {
        story: 'The complete WhyCodeSpire section with three highlight cards featuring staggered entrance animations.',
      },
    },
  },
};

// With background context
export const WithBackground = {
  render: () => (
    <div className="bg-white">
      <div className="py-20 bg-gray-50">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-400 mb-4">Previous Section</h2>
          <p className="text-gray-500">This shows how the section looks in context</p>
        </div>
      </div>
      <WhyCodeSpire />
      <div className="py-20 bg-white">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-400 mb-4">Next Section</h2>
          <p className="text-gray-500">Following content would go here</p>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'WhyCodeSpire section shown with surrounding context to demonstrate how it fits in the overall page layout.',
      },
    },
  },
};