/**
 * LoadingSystemIntegration Component
 * Connects loading system to Next.js router events and page loading
 */

'use client';

import { useEffect, useCallback, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { useLoading } from '../../lib/loading/LoadingContext';

const LoadingSystemIntegration = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { 
    startLoading, 
    completeLoading, 
    trackResource, 
    markResourceLoaded,
    trackAnimationSystem,
    markAnimationSystemLoaded,
    isLoading 
  } = useLoading();

  const navigationTimeoutRef = useRef(null);
  const resourceObserverRef = useRef(null);
  const currentPathRef = useRef(pathname);

  // Track page-specific resources
  const trackPageResources = useCallback((currentPath) => {
    // Track page-specific JavaScript chunks
    trackResource(`/_next/static/chunks/pages${currentPath}.js`, 0.3, 'critical');
    
    // Track page-specific CSS if it exists
    trackResource(`/_next/static/css/pages${currentPath}.css`, 0.1, 'critical');
    
    // Track images that might be on the page
    const images = document.querySelectorAll('img[src]');
    images.forEach((img, index) => {
      if (index < 3) { // Only track first 3 images as critical
        trackResource(img.src, 0.05, 'images');
      }
    });

    // Track fonts
    if (document.fonts) {
      document.fonts.forEach((font) => {
        trackResource(`font:${font.family}`, 0.05, 'fonts');
      });
    }
  }, [trackResource]);

  // Mark page resources as loaded
  const markPageResourcesLoaded = useCallback((currentPath) => {
    // Mark page chunks as loaded when they're available
    const pageScripts = document.querySelectorAll(`script[src*="pages${currentPath}"]`);
    if (pageScripts.length > 0) {
      markResourceLoaded(`/_next/static/chunks/pages${currentPath}.js`);
    }

    // Mark CSS as loaded
    const pageStyles = document.querySelectorAll(`link[href*="pages${currentPath}"]`);
    if (pageStyles.length > 0) {
      markResourceLoaded(`/_next/static/css/pages${currentPath}.css`);
    }

    // Mark images as loaded
    const images = document.querySelectorAll('img[src]');
    images.forEach((img, index) => {
      if (index < 3 && img.complete && img.naturalHeight !== 0) {
        markResourceLoaded(img.src);
      }
    });

    // Mark fonts as loaded
    if (document.fonts && document.fonts.status === 'loaded') {
      document.fonts.forEach((font) => {
        markResourceLoaded(`font:${font.family}`);
      });
    }
  }, [markResourceLoaded]);

  // Track animation systems initialization
  const trackAnimationSystems = useCallback(() => {
    // Track cursor system
    trackAnimationSystem('cursor-system', 0.2);
    
    // Track particle systems
    trackAnimationSystem('particle-field', 0.15);
    trackAnimationSystem('connection-lines', 0.1);
    
    // Track fluid animations
    trackAnimationSystem('liquid-background', 0.15);
    trackAnimationSystem('morphing-shapes', 0.1);
    
    // Track 3D systems
    trackAnimationSystem('3d-scene', 0.1);
    trackAnimationSystem('post-processing', 0.05);
    
    // Track scroll animations
    trackAnimationSystem('scroll-animations', 0.1);
    trackAnimationSystem('parallax-controller', 0.05);
  }, [trackAnimationSystem]);

  // Mark animation systems as loaded
  const markAnimationSystemsLoaded = useCallback(() => {
    // Check for cursor system
    if (document.querySelector('[data-cursor-system]') || window.CursorSystem) {
      markAnimationSystemLoaded('cursor-system');
    }

    // Check for particle systems
    if (document.querySelector('canvas[data-particle-field]') || window.ParticleField) {
      markAnimationSystemLoaded('particle-field');
    }

    if (document.querySelector('canvas[data-connection-lines]') || window.ConnectionLines) {
      markAnimationSystemLoaded('connection-lines');
    }

    // Check for fluid animations
    if (document.querySelector('canvas[data-liquid-background]') || window.LiquidBackground) {
      markAnimationSystemLoaded('liquid-background');
    }

    if (document.querySelector('[data-morphing-shapes]') || window.MorphingShapes) {
      markAnimationSystemLoaded('morphing-shapes');
    }

    // Check for 3D systems
    if (document.querySelector('canvas[data-3d-scene]') || window.Scene3D) {
      markAnimationSystemLoaded('3d-scene');
    }

    if (window.PostProcessing) {
      markAnimationSystemLoaded('post-processing');
    }

    // Check for scroll animations
    if (window.ScrollAnimations || document.querySelector('[data-scroll-animation]')) {
      markAnimationSystemLoaded('scroll-animations');
    }

    if (window.ParallaxController || document.querySelector('[data-parallax]')) {
      markAnimationSystemLoaded('parallax-controller');
    }
  }, [markAnimationSystemLoaded]);

  // Handle navigation start
  const handleNavigationStart = useCallback((path) => {
    console.log('Navigation started to:', path);
    
    // Clear any existing timeout
    if (navigationTimeoutRef.current) {
      clearTimeout(navigationTimeoutRef.current);
    }

    // Start loading if not already loading
    if (!isLoading) {
      startLoading();
    }

    // Track resources for the new page
    trackPageResources(path);
    trackAnimationSystems();
  }, [startLoading, trackPageResources, trackAnimationSystems, isLoading]);

  // Handle navigation complete
  const handleNavigationComplete = useCallback((path) => {
    console.log('Navigation completed to:', path);
    
    // Set a timeout to mark resources as loaded and complete loading
    navigationTimeoutRef.current = setTimeout(() => {
      markPageResourcesLoaded(path);
      markAnimationSystemsLoaded();
      
      // Complete loading after a short delay to ensure all resources are marked
      setTimeout(() => {
        completeLoading();
      }, 500);
    }, 100);
  }, [markPageResourcesLoaded, markAnimationSystemsLoaded, completeLoading]);

  // Monitor DOM changes for resource loading
  const setupResourceObserver = useCallback(() => {
    if (resourceObserverRef.current) {
      resourceObserverRef.current.disconnect();
    }

    resourceObserverRef.current = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            // Check for new images
            if (node.tagName === 'IMG') {
              trackResource(node.src, 0.05, 'images');
              
              // Mark as loaded when image loads
              node.onload = () => markResourceLoaded(node.src);
              node.onerror = () => markResourceLoaded(node.src); // Mark as loaded even on error
            }

            // Check for new scripts
            if (node.tagName === 'SCRIPT' && node.src) {
              trackResource(node.src, 0.1, 'critical');
              
              node.onload = () => markResourceLoaded(node.src);
              node.onerror = () => markResourceLoaded(node.src);
            }

            // Check for new stylesheets
            if (node.tagName === 'LINK' && node.rel === 'stylesheet') {
              trackResource(node.href, 0.05, 'critical');
              
              node.onload = () => markResourceLoaded(node.href);
              node.onerror = () => markResourceLoaded(node.href);
            }

            // Check for animation system elements
            if (node.dataset) {
              Object.keys(node.dataset).forEach((key) => {
                if (key.includes('animation') || key.includes('particle') || key.includes('3d')) {
                  const systemName = key.replace(/([A-Z])/g, '-$1').toLowerCase();
                  markAnimationSystemLoaded(systemName);
                }
              });
            }
          }
        });
      });
    });

    resourceObserverRef.current.observe(document.body, {
      childList: true,
      subtree: true
    });
  }, [trackResource, markResourceLoaded, markAnimationSystemLoaded]);

  // Handle pathname changes (navigation)
  useEffect(() => {
    const currentPath = pathname + (searchParams.toString() ? `?${searchParams.toString()}` : '');
    
    // Check if this is actually a navigation (path changed)
    if (currentPath !== currentPathRef.current) {
      handleNavigationStart(currentPath);
      currentPathRef.current = currentPath;
    }
  }, [pathname, searchParams, handleNavigationStart]);

  // Handle page load completion
  useEffect(() => {
    const handlePageLoad = () => {
      const currentPath = pathname + (searchParams.toString() ? `?${searchParams.toString()}` : '');
      handleNavigationComplete(currentPath);
    };

    // Check if page is already loaded
    if (document.readyState === 'complete') {
      handlePageLoad();
    } else {
      window.addEventListener('load', handlePageLoad);
      return () => window.removeEventListener('load', handlePageLoad);
    }
  }, [pathname, searchParams, handleNavigationComplete]);

  // Setup resource observer on mount
  useEffect(() => {
    setupResourceObserver();
    
    return () => {
      if (resourceObserverRef.current) {
        resourceObserverRef.current.disconnect();
      }
    };
  }, [setupResourceObserver]);

  // Handle font loading
  useEffect(() => {
    if (document.fonts) {
      const handleFontsLoaded = () => {
        document.fonts.forEach((font) => {
          markResourceLoaded(`font:${font.family}`);
        });
      };

      if (document.fonts.status === 'loaded') {
        handleFontsLoaded();
      } else {
        document.fonts.addEventListener('loadingdone', handleFontsLoaded);
        return () => document.fonts.removeEventListener('loadingdone', handleFontsLoaded);
      }
    }
  }, [markResourceLoaded]);

  // Handle image loading for existing images
  useEffect(() => {
    const images = document.querySelectorAll('img[src]');
    images.forEach((img) => {
      if (img.complete && img.naturalHeight !== 0) {
        markResourceLoaded(img.src);
      } else {
        img.onload = () => markResourceLoaded(img.src);
        img.onerror = () => markResourceLoaded(img.src);
      }
    });
  }, [pathname, markResourceLoaded]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (navigationTimeoutRef.current) {
        clearTimeout(navigationTimeoutRef.current);
      }
      if (resourceObserverRef.current) {
        resourceObserverRef.current.disconnect();
      }
    };
  }, []);

  // This component doesn't render anything
  return null;
};

export default LoadingSystemIntegration;