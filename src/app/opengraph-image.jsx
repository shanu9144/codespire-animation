/**
 * Dynamic Open Graph Image Generation for CodeSpire
 * Generates OG images for social media sharing
 * 
 * @module app/opengraph-image
 */

import { ImageResponse } from 'next/og';
import { seoConfig } from '@/config/seo';

/**
 * Generate Open Graph image
 * @param {Object} props - Props containing metadata
 * @returns {ImageResponse} OG image response
 */
export default async function Image({ params }) {
  const title = params?.title || seoConfig.siteName;
  const tagline = params?.tagline || seoConfig.siteTagline;

  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #384bff 0%, #2d3fd9 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'system-ui, sans-serif',
          padding: '80px',
        }}
      >
        <h1
          style={{
            fontSize: '72px',
            fontWeight: 'bold',
            color: 'white',
            textAlign: 'center',
            marginBottom: '20px',
            lineHeight: '1.1',
          }}
        >
          {title}
        </h1>
        <p
          style={{
            fontSize: '32px',
            color: 'rgba(255, 255, 255, 0.9)',
            textAlign: 'center',
            maxWidth: '900px',
          }}
        >
          {tagline}
        </p>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}

