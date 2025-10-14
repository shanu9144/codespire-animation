import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import dynamic from 'next/dynamic';

import './globals.css';
import { Header, Footer } from '@/components/sections';
import { Wrapper, VerticalContactButton } from '@/components/ui';

// Lazy load CursorSystem
const CursorSystem = dynamic(() => import('@/lib/animations').then(mod => ({ default: mod.CursorSystem })), {
  loading: () => null
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'optional', // Changed from 'swap' to prevent FOUT
  preload: true,
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
        <style dangerouslySetInnerHTML={{__html: `
          :root{--primary:#384bff;--primary-hover:#2d3fd9;--white:#ffffff;--gray-50:#f9fafb;--text-primary:#111827;--text-secondary:#6b7280}
          *{box-sizing:border-box}
          body{background:var(--white);color:var(--text-primary);font-family:var(--font-inter),system-ui,sans-serif;line-height:1.6;margin:0;padding:0}
          .main{min-height:100vh;display:flex;flex-direction:column;background:linear-gradient(135deg,#f8fafc 0%,#ffffff 100%)}
          .wrapper{width:100%;max-width:1520px;margin:0 auto;padding:0 1.25rem}
          .text-hero{font-size:4rem;line-height:1.1;font-weight:700}
          .btn-primary{background:linear-gradient(135deg,var(--primary) 0%,var(--primary-hover) 100%);color:white;padding:0.75rem 1.5rem;border-radius:0.75rem}
          @media(min-width:768px){.wrapper{padding:0 2rem}}
        `}} />
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
            
            {/* Global Vertical Contact Button */}
            <VerticalContactButton />
          </div>
        </CursorSystem>

        {/* Note: Avoid mutating <html> classes before hydration to prevent mismatches */}
      </body>
    </html>
  );
}
