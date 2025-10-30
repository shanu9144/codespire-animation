'use client';

import { useEffect, useCallback } from 'react';

/**
 * Keyboard Navigation Hook
 * Handles keyboard event listeners for accessible navigation
 * 
 * @param {Object} callbacks - Keyboard event callbacks
 * @param {Function} callbacks.onEscape - Escape key handler
 * @param {Function} callbacks.onEnter - Enter/Space key handler
 * @param {Function} callbacks.onArrowKeys - Arrow keys handler
 * @param {Function} callbacks.onTab - Tab key handler
 * @returns {Object} Keyboard navigation utilities
 */
export function useKeyboardNavigation({
  onEscape,
  onEnter,
  onArrowKeys,
  onTab,
}) {
  const handleKeyDown = useCallback(
    (event) => {
      switch (event.key) {
        case 'Escape':
          onEscape?.(event);
          break;
        case 'Enter':
        case ' ':
          if (event.target.tagName !== 'INPUT' && event.target.tagName !== 'TEXTAREA') {
            event.preventDefault();
            onEnter?.(event);
          }
          break;
        case 'ArrowUp':
        case 'ArrowDown':
        case 'ArrowLeft':
        case 'ArrowRight':
          onArrowKeys?.(event);
          break;
        case 'Tab':
          onTab?.(event);
          break;
      }
    },
    [onEscape, onEnter, onArrowKeys, onTab]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return {
    handleKeyDown,
  };
}

export default useKeyboardNavigation;

