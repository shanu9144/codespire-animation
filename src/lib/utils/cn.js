/**
 * Class Name Utility (cn)
 * Utility function for merging class names (similar to clsx)
 * Compatible with tailwind-merge if available
 * 
 * @module lib/utils/cn
 */

/**
 * Merge class names
 * @param {...string|Object} classes - Class names to merge
 * @returns {string} Merged class names
 */
export function cn(...classes) {
  const filtered = classes
    .filter(Boolean)
    .map((cls) => {
      if (typeof cls === 'string') {
        return cls.trim();
      }
      if (typeof cls === 'object' && cls !== null) {
        return Object.entries(cls)
          .filter(([_, value]) => Boolean(value))
          .map(([key]) => key)
          .join(' ');
      }
      return '';
    })
    .filter(Boolean);

  return filtered.join(' ');
}

export default cn;

