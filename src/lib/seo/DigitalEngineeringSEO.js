'use client';

import Head from 'next/head';

/**
 * Comprehensive SEO System for Digital Engineering Page
 * Provides meta tags, structured data, and SEO optimization utilities
 */

// SEO metadata configuration
export const digitalEngineeringSEO = {
  title: "AI-Powered Digital Engineering Solutions | CodeSpire",
  description: "Transform your engineering processes with cutting-edge AI solutions. From design optimization to predictive maintenance, we deliver intelligent engineering systems that drive innovation and efficiency.",
  keywords: [
    "digital engineering",
    "AI engineering",
    "artificial intelligence",
    "engineering automation",
    "predictive maintenance",
    "design optimization",
    "engineering consulting",
    "AI-powered solutions",
    "digital transformation",
    "engineering innovation",
    "machine learning engineering",
    "intelligent systems",
    "engineering technology",
    "automated engineering",
    "smart engineering"
  ],
  canonical: "https://codespire.com/digital-engineering",
  ogImage: "https://codespire.com/images/digital-engineering-og.jpg",
  twitterCard: "summary_large_image",
  twitterSite: "@CodeSpire",
  twitterCreator: "@CodeSpire"
};

// Structured data for Digital Engineering services
export const digitalEngineeringStructuredData = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "AI-Powered Digital Engineering Solutions",
  "description": "Comprehensive digital engineering services powered by artificial intelligence, including design optimization, predictive maintenance, and intelligent automation.",
  "provider": {
    "@type": "Organization",
    "name": "CodeSpire",
    "url": "https://codespire.com",
    "logo": "https://codespire.com/logo.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-555-CODE-SPIRE",
      "contactType": "customer service",
      "areaServed": "US",
      "availableLanguage": "English"
    }
  },
  "serviceType": "Digital Engineering",
  "areaServed": {
    "@type": "Country",
    "name": "United States"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Digital Engineering Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "AI-Powered Design & Engineering",
          "description": "Accelerate design cycles with AI-powered tools that automate complex calculations and optimize solutions."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Predictive Maintenance Systems",
          "description": "Streamline production processes with intelligent automation and predictive maintenance systems."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "System Engineering Integration",
          "description": "Integrate complex systems with AI orchestration for seamless connectivity and optimal performance."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Product Testing & Quality Assurance",
          "description": "Comprehensive testing frameworks powered by AI to ensure quality and reliability at every stage."
        }
      }
    ]
  },
  "offers": {
    "@type": "Offer",
    "description": "Custom AI-powered digital engineering solutions",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock"
  }
};

// FAQ structured data
export const faqStructuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is AI-powered digital engineering?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "AI-powered digital engineering combines artificial intelligence with traditional engineering practices to create intelligent systems that can automate complex processes, optimize designs, predict maintenance needs, and enhance overall engineering efficiency."
      }
    },
    {
      "@type": "Question",
      "name": "How can AI improve engineering processes?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "AI can improve engineering processes by automating repetitive tasks, optimizing designs through machine learning algorithms, predicting equipment failures before they occur, and providing intelligent insights for better decision-making."
      }
    },
    {
      "@type": "Question",
      "name": "What industries benefit from digital engineering solutions?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Industries that benefit from digital engineering solutions include manufacturing, automotive, aerospace, energy, healthcare, telecommunications, and any sector that relies on complex engineering processes and systems."
      }
    },
    {
      "@type": "Question",
      "name": "How long does it take to implement AI engineering solutions?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Implementation timelines vary based on project complexity, but typically range from 3-12 months for comprehensive AI engineering solutions. We work closely with clients to ensure smooth integration and minimal disruption to existing operations."
      }
    }
  ]
};

// Breadcrumb structured data
export const breadcrumbStructuredData = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://codespire.com"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Services",
      "item": "https://codespire.com/services"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Digital Engineering",
      "item": "https://codespire.com/digital-engineering"
    }
  ]
};

// Organization structured data
export const organizationStructuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "CodeSpire",
  "url": "https://codespire.com",
  "logo": "https://codespire.com/logo.png",
  "description": "Leading provider of AI-powered digital engineering solutions and intelligent automation systems.",
  "foundingDate": "2020",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "4754 U.S. Route 40",
    "addressLocality": "Tipp City",
    "addressRegion": "OH",
    "postalCode": "45371",
    "addressCountry": "US"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+1-555-CODE-SPIRE",
    "contactType": "customer service",
    "areaServed": "US",
    "availableLanguage": "English"
  },
  "sameAs": [
    "https://linkedin.com/company/codespire",
    "https://twitter.com/codespire",
    "https://github.com/codespire"
  ]
};

// SEO component for Digital Engineering page
export const DigitalEngineeringSEO = () => {
  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{digitalEngineeringSEO.title}</title>
      <meta name="description" content={digitalEngineeringSEO.description} />
      <meta name="keywords" content={digitalEngineeringSEO.keywords.join(', ')} />
      <meta name="author" content="CodeSpire" />
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={digitalEngineeringSEO.canonical} />
      
      {/* Open Graph Meta Tags */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={digitalEngineeringSEO.title} />
      <meta property="og:description" content={digitalEngineeringSEO.description} />
      <meta property="og:url" content={digitalEngineeringSEO.canonical} />
      <meta property="og:image" content={digitalEngineeringSEO.ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="CodeSpire" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content={digitalEngineeringSEO.twitterCard} />
      <meta name="twitter:site" content={digitalEngineeringSEO.twitterSite} />
      <meta name="twitter:creator" content={digitalEngineeringSEO.twitterCreator} />
      <meta name="twitter:title" content={digitalEngineeringSEO.title} />
      <meta name="twitter:description" content={digitalEngineeringSEO.description} />
      <meta name="twitter:image" content={digitalEngineeringSEO.ogImage} />
      
      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#3B82F6" />
      <meta name="msapplication-TileColor" content="#3B82F6" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="CodeSpire Digital Engineering" />
      
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(digitalEngineeringStructuredData)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqStructuredData)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbStructuredData)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationStructuredData)
        }}
      />
      
      {/* Preconnect to external domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      
      {/* DNS Prefetch for performance */}
      <link rel="dns-prefetch" href="//www.google-analytics.com" />
      <link rel="dns-prefetch" href="//www.googletagmanager.com" />
    </Head>
  );
};

// SEO utilities
export const seoUtils = {
  // Generate meta description
  generateMetaDescription: (content, maxLength = 160) => {
    const cleanContent = content.replace(/<[^>]*>/g, '').trim();
    return cleanContent.length > maxLength 
      ? cleanContent.substring(0, maxLength - 3) + '...'
      : cleanContent;
  },
  
  // Generate title tag
  generateTitle: (pageTitle, siteName = 'CodeSpire', separator = ' | ') => {
    return `${pageTitle}${separator}${siteName}`;
  },
  
  // Generate canonical URL
  generateCanonicalUrl: (path, baseUrl = 'https://codespire.com') => {
    return `${baseUrl}${path}`;
  },
  
  // Generate Open Graph image URL
  generateOGImageUrl: (title, baseUrl = 'https://codespire.com') => {
    const encodedTitle = encodeURIComponent(title);
    return `${baseUrl}/api/og?title=${encodedTitle}`;
  },
  
  // Validate meta tags
  validateMetaTags: (metaTags) => {
    const errors = [];
    
    if (!metaTags.title || metaTags.title.length > 60) {
      errors.push('Title should be present and under 60 characters');
    }
    
    if (!metaTags.description || metaTags.description.length > 160) {
      errors.push('Description should be present and under 160 characters');
    }
    
    if (!metaTags.canonical) {
      errors.push('Canonical URL is required');
    }
    
    return errors;
  }
};

// Performance optimization for SEO
export const seoPerformanceOptimizations = {
  // Lazy load images with proper alt text
  lazyLoadImages: () => {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          imageObserver.unobserve(img);
        }
      });
    });
    
    images.forEach(img => imageObserver.observe(img));
  },
  
  // Optimize images for SEO
  optimizeImages: () => {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      // Ensure all images have alt text
      if (!img.alt) {
        img.alt = 'CodeSpire Digital Engineering';
      }
      
      // Add loading="lazy" for performance
      if (!img.hasAttribute('loading')) {
        img.setAttribute('loading', 'lazy');
      }
    });
  },
  
  // Add structured data validation
  validateStructuredData: () => {
    // This would integrate with Google's Structured Data Testing Tool API
    console.log('Validating structured data...');
  }
};

export default {
  digitalEngineeringSEO,
  digitalEngineeringStructuredData,
  faqStructuredData,
  breadcrumbStructuredData,
  organizationStructuredData,
  DigitalEngineeringSEO,
  seoUtils,
  seoPerformanceOptimizations
};
