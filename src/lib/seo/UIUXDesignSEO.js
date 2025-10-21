'use client';

import Head from 'next/head';

/**
 * SEO Component for UI/UX Design Services Page
 * Provides meta tags, structured data, and SEO optimization utilities
 */

// SEO metadata configuration
export const uiuxDesignSEO = {
  title: "UI/UX as a Service - Designing Experiences that Inspire and Perform | CodeSpire Solutions",
  description: "Transform your digital products with our AI-powered UI/UX services. From user research to design systems, we craft intelligent, human-centered experiences that drive engagement and growth.",
  keywords: [
    "UI/UX design",
    "user experience",
    "user interface",
    "design services",
    "AI-powered design",
    "user research",
    "prototyping",
    "design systems",
    "digital product design",
    "interaction design",
    "visual design",
    "usability testing",
    "design thinking",
    "human-centered design",
    "design strategy"
  ],
  canonical: "https://codespire.com/services/ui-ux-design",
  ogImage: "https://codespire.com/images/ui-ux-design-og.jpg",
  twitterCard: "summary_large_image",
  twitterSite: "@CodeSpire",
  twitterCreator: "@CodeSpire"
};

// Structured data for UI/UX Design services
export const uiuxDesignStructuredData = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "UI/UX Design Services",
  "description": "Comprehensive UI/UX design services powered by artificial intelligence, including user research, prototyping, visual design, and design system development.",
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
  "serviceType": "UI/UX Design",
  "areaServed": {
    "@type": "Country",
    "name": "United States"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "UI/UX Design Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "User Research & Strategy",
          "description": "Gain deep understanding of user needs through AI-driven analytics, persona modeling, and behavior mapping."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Information Architecture",
          "description": "Design logical and intuitive content structures that enhance discoverability and navigation efficiency."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Wireframing & Prototyping",
          "description": "Translate ideas into interactive, high-fidelity prototypes that validate functionality and flow before development."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Visual & Interaction Design",
          "description": "Craft visually stunning and brand-aligned interfaces optimized for engagement, accessibility, and clarity."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Usability Testing & Optimization",
          "description": "Use AI-driven feedback loops and A/B testing to refine designs and continuously improve user experience."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Design System Development",
          "description": "Build scalable, reusable UI frameworks and component libraries that ensure consistency and speed across products."
        }
      }
    ]
  },
  "offers": {
    "@type": "Offer",
    "description": "Custom AI-powered UI/UX design solutions",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock"
  }
};

// FAQ structured data
export const uiuxFAQStructuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is AI-powered UI/UX design?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "AI-powered UI/UX design combines artificial intelligence with user experience design to create intelligent, data-driven interfaces that adapt to user behavior, optimize engagement, and deliver personalized experiences."
      }
    },
    {
      "@type": "Question",
      "name": "How can AI improve user experience design?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "AI can improve UX design by analyzing user behavior patterns, automating usability testing, generating design variations, predicting user preferences, and providing data-driven insights for design optimization."
      }
    },
    {
      "@type": "Question",
      "name": "What industries benefit from UI/UX design services?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "All industries benefit from professional UI/UX design services, including technology, healthcare, finance, e-commerce, education, and any business with digital touchpoints that interact with users."
      }
    },
    {
      "@type": "Question",
      "name": "How long does a typical UI/UX design project take?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "UI/UX design project timelines vary based on complexity, but typically range from 4-16 weeks for comprehensive design projects. We work efficiently with agile methodologies to deliver results quickly."
      }
    }
  ]
};

// Breadcrumb structured data
export const uiuxBreadcrumbStructuredData = {
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
      "name": "UI/UX Design",
      "item": "https://codespire.com/services/ui-ux-design"
    }
  ]
};

// SEO component for UI/UX Design page
export const UIUXDesignSEO = ({ title, description, keywords }) => {
  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{title || uiuxDesignSEO.title}</title>
      <meta name="description" content={description || uiuxDesignSEO.description} />
      <meta name="keywords" content={keywords || uiuxDesignSEO.keywords.join(', ')} />
      <meta name="author" content="CodeSpire" />
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={uiuxDesignSEO.canonical} />
      
      {/* Open Graph Meta Tags */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title || uiuxDesignSEO.title} />
      <meta property="og:description" content={description || uiuxDesignSEO.description} />
      <meta property="og:url" content={uiuxDesignSEO.canonical} />
      <meta property="og:image" content={uiuxDesignSEO.ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="CodeSpire" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content={uiuxDesignSEO.twitterCard} />
      <meta name="twitter:site" content={uiuxDesignSEO.twitterSite} />
      <meta name="twitter:creator" content={uiuxDesignSEO.twitterCreator} />
      <meta name="twitter:title" content={title || uiuxDesignSEO.title} />
      <meta name="twitter:description" content={description || uiuxDesignSEO.description} />
      <meta name="twitter:image" content={uiuxDesignSEO.ogImage} />
      
      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#3B82F6" />
      <meta name="msapplication-TileColor" content="#3B82F6" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="CodeSpire UI/UX Design" />
      
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(uiuxDesignStructuredData)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(uiuxFAQStructuredData)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(uiuxBreadcrumbStructuredData)
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

export default UIUXDesignSEO;
