'use client';

import { useState, useCallback } from 'react';

/**
 * ARIA State Management Hook
 * Provides utilities for managing ARIA attributes dynamically
 * 
 * @param {boolean} initialState - Initial state (for aria-expanded, etc.)
 * @returns {Object} ARIA utilities
 */
export function useARIA(initialState = false) {
  const [isExpanded, setIsExpanded] = useState(initialState);
  const [isSelected, setIsSelected] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const toggle = useCallback(() => {
    setIsExpanded((prev) => !prev);
  }, []);

  const expand = useCallback(() => {
    setIsExpanded(true);
  }, []);

  const collapse = useCallback(() => {
    setIsExpanded(false);
  }, []);

  const select = useCallback((index) => {
    setSelectedIndex(index);
    setIsSelected(true);
  }, []);

  const getExpandedProps = useCallback(
    (controlsId) => ({
      'aria-expanded': isExpanded,
      'aria-controls': controlsId,
    }),
    [isExpanded]
  );

  const getSelectedProps = useCallback(
    (itemId) => ({
      'aria-selected': isSelected,
      'aria-activedescendant': itemId ? `item-${selectedIndex}` : undefined,
    }),
    [isSelected, selectedIndex]
  );

  return {
    isExpanded,
    isSelected,
    selectedIndex,
    toggle,
    expand,
    collapse,
    select,
    getExpandedProps,
    getSelectedProps,
  };
}

export default useARIA;

