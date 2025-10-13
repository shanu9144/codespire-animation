import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import './globals.css';
import { Header, Footer } from '@/components/sections';
import { Wrapper } from '@/components/ui';
import { CursorSystem } from '@/lib/animations';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'CodeSpire Solutions - From Idea to Enterprise-Grade AI in a Blink',
    template: '%s | CodeSpire Solutions',
  },
  description: 'CodeSpire Solutions specializes in rapid AI product engineering with enterprise-grade quality. Transform your business with our AI expertise across manufacturing, hi-tech, BFSI, and more.',
  keywords: ['AI', 'Enterprise', 'Product Engineering', 'CodeSpire', 'Artificial Intelligence', 'Machine Learning', 'B2B AI Solutions'],
  authors: [{ name: 'CodeSpire Solutions' }],
  creator: 'CodeSpire Solutions',
  publisher: 'CodeSpire Solutions',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://codespire.com',
    siteName: 'CodeSpire Solutions',
    title: 'CodeSpire Solutions - From Idea to Enterprise-Grade AI in a Blink',
    description: 'Transform your business with cutting-edge AI solutions and expert engineering. 50+ skilled experts, 7+ satisfied clients, 5+ global industries.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'CodeSpire Solutions - Enterprise AI Engineering',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CodeSpire Solutions - From Idea to Enterprise-Grade AI in a Blink',
    description: 'Transform your business with cutting-edge AI solutions and expert engineering.',
    images: ['/og-image.jpg'],
  },
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#384bff" />
      </head>
      <body className="font-sans antialiased min-h-screen flex flex-col" suppressHydrationWarning={true}>

        <CursorSystem
          cursorType="invisible-magnetic"
          magneticConfig={{
            strength: 0.3,
            radius: 80,
            ease: 0.15,
          }}
          touchConfig={{
            enableRipples: true,
            enableHaptics: true,
            enableVisualFeedback: true,
            rippleColor: '#384bff',
            rippleDuration: 600,
          }}
        >
          <div className="main">
            <Header />
            <main className="flex-1 pt-16">
              <Wrapper>
                {children}
              </Wrapper>
            </main>
            <Footer />
          </div>
        </CursorSystem>

        {/* Note: Avoid mutating <html> classes before hydration to prevent mismatches */}
      </body>
    </html>
  );
}
