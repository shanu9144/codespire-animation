'use client';

/**
 * Service Schema Component
 * Renders JSON-LD structured data for Service pages
 * 
 * @component
 * @param {Object} props - Component props
 * @param {string} props.name - Service name
 * @param {string} props.description - Service description
 * @param {string} props.url - Service URL
 * @param {string} props.serviceType - Type of service
 * @param {Array} props.offers - Service offers/catalog (optional)
 * @example
 * <ServiceSchema
 *   name="Digital Engineering"
 *   description="Transform your engineering processes with AI..."
 *   url="https://codespire.com/services/digital-engineering"
 *   serviceType="Digital Engineering"
 * />
 */
export default function ServiceSchema({
  name,
  description,
  url,
  serviceType,
  offers = [],
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `${name} | CodeSpire Solutions`,
    description,
    provider: {
      '@type': 'Organization',
      name: 'CodeSpire Solutions',
      url: 'https://codespire.com',
      logo: 'https://codespire.com/assets/codespirelogo.png',
    },
    serviceType,
    url,
    areaServed: {
      '@type': 'Country',
      name: 'United States',
    },
  };

  if (offers.length > 0) {
    schema.hasOfferCatalog = {
      '@type': 'OfferCatalog',
      name: `${name} Services`,
      itemListElement: offers.map((offer) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: offer.name,
          description: offer.description,
        },
      })),
    };
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

