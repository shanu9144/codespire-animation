'use client';

/**
 * Breadcrumb Schema Component
 * Renders JSON-LD structured data for breadcrumb navigation
 * 
 * @component
 * @param {Object} props - Component props
 * @param {Array<{name: string, url: string}>} props.items - Breadcrumb items
 * @example
 * <BreadcrumbSchema items={[
 *   { name: 'Home', url: 'https://codespire.com' },
 *   { name: 'Services', url: 'https://codespire.com/services' },
 *   { name: 'Digital Engineering', url: 'https://codespire.com/services/digital-engineering' }
 * ]} />
 */
export default function BreadcrumbSchema({ items = [] }) {
  if (items.length === 0) {
    return null;
  }

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

