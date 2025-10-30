'use client';

/**
 * Product Schema Component
 * Renders JSON-LD structured data for Product pages
 * 
 * @component
 * @param {Object} props - Component props
 * @param {string} props.name - Product name
 * @param {string} props.description - Product description
 * @param {string} props.url - Product URL
 * @param {string} props.image - Product image URL (optional)
 * @example
 * <ProductSchema
 *   name="Smart RFQ AI"
 *   description="Intelligent Quoting for Modern Manufacturing"
 *   url="https://codespire.com/products/smart-rfq-ai"
 *   image="https://codespire.com/Smart RFQ AI - Hero Card.jpg"
 * />
 */
export default function ProductSchema({
  name,
  description,
  url,
  image,
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: `${name} | CodeSpire Solutions`,
    description,
    url,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      description: `Enterprise ${name} solution by CodeSpire`,
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
    provider: {
      '@type': 'Organization',
      name: 'CodeSpire Solutions',
      url: 'https://codespire.com',
      logo: 'https://codespire.com/assets/codespirelogo.png',
    },
    image: image || 'https://codespire.com/assets/codespirelogo.png',
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

