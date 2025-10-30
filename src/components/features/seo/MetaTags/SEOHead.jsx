'use client';

/**
 * SEO Head Component
 * Renders SEO meta tags for a page
 * 
 * @component
 * @param {Object} props - Component props
 * @param {Object} props.metadata - Metadata object from generateMetadata
 * @example
 * <SEOHead metadata={generateMetadata({
 *   title: 'About Us',
 *   description: 'Learn about CodeSpire Solutions',
 *   path: '/about'
 * })} />
 */
export default function SEOHead({ metadata }) {
  if (!metadata) {
    return null;
  }

  return (
    <>
      {/* Basic Meta Tags */}
      {metadata.title && <title>{metadata.title}</title>}
      {metadata.description && (
        <meta name="description" content={metadata.description} />
      )}
      {metadata.keywords && (
        <meta name="keywords" content={metadata.keywords} />
      )}
      {metadata.authors && (
        <meta name="author" content={metadata.authors.map((a) => a.name).join(', ')} />
      )}

      {/* Canonical URL */}
      {metadata.alternates?.canonical && (
        <link rel="canonical" href={metadata.alternates.canonical} />
      )}

      {/* Open Graph Tags */}
      {metadata.openGraph && (
        <>
          <meta property="og:type" content={metadata.openGraph.type || 'website'} />
          <meta property="og:title" content={metadata.openGraph.title} />
          <meta property="og:description" content={metadata.openGraph.description} />
          <meta property="og:url" content={metadata.openGraph.url} />
          <meta property="og:site_name" content={metadata.openGraph.siteName} />
          <meta property="og:locale" content={metadata.openGraph.locale} />
          {metadata.openGraph.images && metadata.openGraph.images.map((image, index) => (
            <meta key={index} property="og:image" content={image.url || image} />
          ))}
          {metadata.openGraph.publishedTime && (
            <meta property="article:published_time" content={metadata.openGraph.publishedTime} />
          )}
          {metadata.openGraph.modifiedTime && (
            <meta property="article:modified_time" content={metadata.openGraph.modifiedTime} />
          )}
        </>
      )}

      {/* Twitter Card Tags */}
      {metadata.twitter && (
        <>
          <meta name="twitter:card" content={metadata.twitter.card} />
          <meta name="twitter:title" content={metadata.twitter.title} />
          <meta name="twitter:description" content={metadata.twitter.description} />
          {metadata.twitter.images && metadata.twitter.images.map((image, index) => (
            <meta key={index} name="twitter:image" content={image} />
          ))}
          {metadata.twitter.site && (
            <meta name="twitter:site" content={metadata.twitter.site} />
          )}
          {metadata.twitter.creator && (
            <meta name="twitter:creator" content={metadata.twitter.creator} />
          )}
        </>
      )}
    </>
  );
}

