/**
 * LoadingScreenFallback Component
 * Pure CSS loading screen for non-JavaScript environments
 * Provides progressive enhancement with automatic timeout
 */

'use client';

import { useEffect, useState } from 'react';

const LoadingScreenFallback = ({ 
  timeout = 3000,
  onTimeout,
  theme = 'dark',
  showBranding = true 
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [hasTimedOut, setHasTimedOut] = useState(false);

  useEffect(() => {
    // Auto-hide after timeout for progressive enhancement
    const timeoutId = setTimeout(() => {
      setHasTimedOut(true);
      setIsVisible(false);
      if (onTimeout) {
        onTimeout();
      }
    }, timeout);

    return () => clearTimeout(timeoutId);
  }, [timeout, onTimeout]);

  if (!isVisible) {
    return null;
  }

  return (
    <>
      {/* CSS-only loading screen styles */}
      <style jsx>{`
        .css-loading-screen {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          background: ${theme === 'dark' 
            ? 'linear-gradient(135deg, #1f2937 0%, #111827 50%, #0f172a 100%)' 
            : 'linear-gradient(135deg, #ffffff 0%, #f9fafb 50%, #f3f4f6 100%)'
          };
          animation: css-fade-in 0.5s ease-out;
        }

        .css-loading-content {
          text-align: center;
          animation: css-slide-up 0.8s ease-out 0.2s both;
        }

        .css-loading-brand {
          font-size: 2rem;
          font-weight: bold;
          color: ${theme === 'dark' ? '#384bff' : '#384bff'};
          margin-bottom: 0.5rem;
          letter-spacing: 0.05em;
        }

        .css-loading-subtitle {
          font-size: 0.875rem;
          font-weight: 500;
          color: ${theme === 'dark' ? '#9ca3af' : '#6b7280'};
          letter-spacing: 0.1em;
          margin-bottom: 2rem;
        }

        .css-loading-spinner {
          width: 60px;
          height: 60px;
          border: 3px solid ${theme === 'dark' ? '#374151' : '#e5e7eb'};
          border-top: 3px solid #384bff;
          border-radius: 50%;
          margin: 0 auto 1.5rem;
          animation: css-spin 1s linear infinite;
        }

        .css-loading-text {
          font-size: 1.125rem;
          font-weight: 500;
          color: ${theme === 'dark' ? '#d1d5db' : '#4b5563'};
          animation: css-pulse 2s ease-in-out infinite;
        }

        .css-loading-dots {
          display: inline-block;
          animation: css-dots 1.5s ease-in-out infinite;
        }

        .css-loading-progress {
          width: 200px;
          height: 4px;
          background: ${theme === 'dark' ? '#374151' : '#e5e7eb'};
          border-radius: 2px;
          margin: 1.5rem auto 0;
          overflow: hidden;
          position: relative;
        }

        .css-loading-progress-bar {
          height: 100%;
          background: linear-gradient(90deg, #384bff 0%, #6366f1 50%, #384bff 100%);
          border-radius: 2px;
          animation: css-progress 2s ease-in-out infinite;
        }

        /* Animations */
        @keyframes css-fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes css-slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes css-spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        @keyframes css-pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }

        @keyframes css-dots {
          0%, 20% {
            color: transparent;
            text-shadow: 0.25em 0 0 transparent, 0.5em 0 0 transparent;
          }
          40% {
            color: ${theme === 'dark' ? '#d1d5db' : '#4b5563'};
            text-shadow: 0.25em 0 0 transparent, 0.5em 0 0 transparent;
          }
          60% {
            text-shadow: 0.25em 0 0 ${theme === 'dark' ? '#d1d5db' : '#4b5563'}, 0.5em 0 0 transparent;
          }
          80%, 100% {
            text-shadow: 0.25em 0 0 ${theme === 'dark' ? '#d1d5db' : '#4b5563'}, 0.5em 0 0 ${theme === 'dark' ? '#d1d5db' : '#4b5563'};
          }
        }

        @keyframes css-progress {
          0% {
            transform: translateX(-100%);
          }
          50% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        /* Auto-hide after timeout */
        .css-loading-screen.timeout {
          animation: css-fade-out 0.5s ease-in-out forwards;
        }

        @keyframes css-fade-out {
          from {
            opacity: 1;
            visibility: visible;
          }
          to {
            opacity: 0;
            visibility: hidden;
          }
        }

        /* Reduced motion preferences */
        @media (prefers-reduced-motion: reduce) {
          .css-loading-screen,
          .css-loading-content,
          .css-loading-spinner,
          .css-loading-text,
          .css-loading-dots,
          .css-loading-progress-bar {
            animation: none;
          }
          
          .css-loading-spinner {
            border-top-color: #384bff;
            opacity: 0.8;
          }
          
          .css-loading-text {
            opacity: 0.9;
          }
        }

        /* High contrast mode support */
        @media (prefers-contrast: high) {
          .css-loading-screen {
            background: ${theme === 'dark' ? '#000000' : '#ffffff'};
            border: 2px solid ${theme === 'dark' ? '#ffffff' : '#000000'};
          }
          
          .css-loading-brand {
            color: ${theme === 'dark' ? '#ffffff' : '#000000'};
          }
          
          .css-loading-spinner {
            border-color: ${theme === 'dark' ? '#ffffff' : '#000000'};
            border-top-color: #384bff;
          }
        }
      `}</style>

      {/* Fallback loading screen */}
      <div 
        className={`css-loading-screen ${hasTimedOut ? 'timeout' : ''}`}
        role="progressbar"
        aria-label="Loading content"
        aria-live="polite"
      >
        <div className="css-loading-content">
          {/* CodeSpire branding */}
          {showBranding && (
            <>
              <div className="css-loading-brand">
                CodeSpire
              </div>
              <div className="css-loading-subtitle">
                SOLUTIONS
              </div>
            </>
          )}

          {/* Loading spinner */}
          <div className="css-loading-spinner" aria-hidden="true"></div>

          {/* Loading text */}
          <div className="css-loading-text">
            Loading<span className="css-loading-dots">...</span>
          </div>

          {/* Progress indicator */}
          <div className="css-loading-progress" aria-hidden="true">
            <div className="css-loading-progress-bar"></div>
          </div>
        </div>

        {/* Screen reader announcement */}
        <div className="sr-only">
          Loading content, please wait...
        </div>
      </div>
    </>
  );
};

export default LoadingScreenFallback;