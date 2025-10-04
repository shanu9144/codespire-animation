import { Inter } from "next/font/google";
import "./globals.css";
import "../styles/loading-fallback.css";
import Header from "../components/sections/Header";
import Footer from "../components/sections/Footer";
import Wrapper from "../components/ui/Wrapper";
import { CursorSystem } from "../animations";
import { LoadingProvider } from "../lib/loading/LoadingContext";
import LoadingScreenWrapper from "../components/ui/LoadingScreenWrapper";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  title: {
    default: "CodeSpire Solutions - From Idea to Enterprise-Grade AI in a Blink",
    template: "%s | CodeSpire Solutions"
  },
  description: "CodeSpire Solutions specializes in rapid AI product engineering with enterprise-grade quality. Transform your business with our AI expertise across manufacturing, hi-tech, BFSI, and more.",
  keywords: ["AI", "Enterprise", "Product Engineering", "CodeSpire", "Artificial Intelligence", "Machine Learning", "B2B AI Solutions"],
  authors: [{ name: "CodeSpire Solutions" }],
  creator: "CodeSpire Solutions",
  publisher: "CodeSpire Solutions",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://codespire.com",
    siteName: "CodeSpire Solutions",
    title: "CodeSpire Solutions - From Idea to Enterprise-Grade AI in a Blink",
    description: "Transform your business with cutting-edge AI solutions and expert engineering. 50+ skilled experts, 7+ satisfied clients, 5+ global industries.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "CodeSpire Solutions - Enterprise AI Engineering",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CodeSpire Solutions - From Idea to Enterprise-Grade AI in a Blink",
    description: "Transform your business with cutting-edge AI solutions and expert engineering.",
    images: ["/og-image.jpg"],
  },

};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#384bff" />
      </head>
      <body className="font-sans antialiased min-h-screen flex flex-col" suppressHydrationWarning={true}>
        {/* CSS-only loading fallback for non-JS environments */}
        <div className="css-loading-fallback" role="progressbar" aria-label="Loading content">
          <div className="css-loading-fallback-content">
            <div className="css-loading-fallback-brand">CodeSpire</div>
            <div className="css-loading-fallback-subtitle">SOLUTIONS</div>
            <div className="css-loading-fallback-spinner" aria-hidden="true"></div>
            <div className="css-loading-fallback-text">
              Loading<span className="css-loading-fallback-dots">...</span>
            </div>
            <div className="css-loading-fallback-progress" aria-hidden="true">
              <div className="css-loading-fallback-progress-bar"></div>
            </div>
          </div>
          <div className="css-loading-fallback-sr-only">Loading content, please wait...</div>
        </div>

        <LoadingProvider
          autoStart={true}
          enableErrorHandling={true}
          config={{
            minimumLoadingTime: 800,
            maximumLoadingTime: 8000,
            progressUpdateInterval: 16,
            counterAnimationDuration: 300,
            transitionDuration: 600
          }}
        >
          <LoadingScreenWrapper>
            <CursorSystem
              cursorType="invisible-magnetic"
              magneticConfig={{
                strength: 0.3,
                radius: 80,
                ease: 0.15
              }}
              touchConfig={{
                enableRipples: true,
                enableHaptics: true,
                enableVisualFeedback: true,
                rippleColor: '#384bff'
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
          </LoadingScreenWrapper>
        </LoadingProvider>

        {/* JavaScript detection script */}
        <script dangerouslySetInnerHTML={{
          __html: `
            // Add js-enabled class to hide CSS fallback when JS is available
            document.documentElement.classList.add('js-enabled');
          `
        }} />
      </body>
    </html>
  );
}