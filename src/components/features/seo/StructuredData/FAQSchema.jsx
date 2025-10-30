'use client';

/**
 * FAQ Schema Component
 * Renders JSON-LD structured data for FAQPage
 * 
 * @component
 * @param {Object} props - Component props
 * @param {Array<{question: string, answer: string}>} props.faqs - FAQ items
 * @example
 * <FAQSchema faqs={[
 *   { question: 'What is AI-powered digital engineering?', answer: 'AI-powered digital engineering combines...' },
 *   { question: 'How can AI improve engineering processes?', answer: 'AI can improve engineering processes by...' }
 * ]} />
 */
export default function FAQSchema({ faqs = [] }) {
  if (faqs.length === 0) {
    return null;
  }

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

