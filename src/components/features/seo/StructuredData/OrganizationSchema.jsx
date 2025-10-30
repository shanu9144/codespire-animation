'use client';

/**
 * Organization Schema Component
 * Renders JSON-LD structured data for CodeSpire organization
 * 
 * @component
 * @example
 * <OrganizationSchema />
 */
export default function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'CodeSpire Solutions',
    url: 'https://codespire.com',
    logo: 'https://codespire.com/assets/codespirelogo.png',
    description: 'Leading provider of AI-powered digital engineering solutions and intelligent automation systems.',
    foundingDate: '2020',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '4754 U.S. Route 40',
      addressLocality: 'Tipp City',
      addressRegion: 'OH',
      postalCode: '45371',
      addressCountry: 'US',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      areaServed: 'US',
      availableLanguage: 'English',
    },
    sameAs: [
      'https://linkedin.com/company/codespire',
      'https://twitter.com/codespire',
      'https://github.com/codespire',
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

