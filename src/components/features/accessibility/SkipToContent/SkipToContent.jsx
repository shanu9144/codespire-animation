'use client';

/**
 * Skip To Content Component
 * Provides skip navigation links for keyboard users and screen readers
 * WCAG 2.1 Level A requirement
 * 
 * @component
 * @param {Object} props - Component props
 * @param {Array<{label: string, targetId: string}>} props.links - Skip link configurations
 * @example
 * <SkipToContent links={[
 *   { label: 'Skip to main content', targetId: 'main-content' },
 *   { label: 'Skip to navigation', targetId: 'main-navigation' }
 * ]} />
 */
export default function SkipToContent({ links = [] }) {
  // Default skip link if none provided
  const defaultLinks = [
    { label: 'Skip to main content', targetId: 'main-content' },
  ];

  const skipLinks = links.length > 0 ? links : defaultLinks;

  return (
    <>
      {skipLinks.map((link, index) => (
        <a
          key={index}
          href={`#${link.targetId}`}
          className="skip-link sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-md focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          aria-label={`Skip to ${link.label}`}
          onClick={(e) => {
            e.preventDefault();
            const target = document.getElementById(link.targetId);
            if (target) {
              target.setAttribute('tabindex', '-1');
              target.focus();
              target.scrollIntoView({ behavior: 'smooth', block: 'start' });
              // Remove tabindex after focus to restore normal tab order
              setTimeout(() => {
                target.removeAttribute('tabindex');
              }, 1000);
            }
          }}
        >
          {link.label}
        </a>
      ))}
    </>
  );
}

