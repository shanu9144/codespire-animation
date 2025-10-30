'use client';

import { useRef, useCallback } from 'react';

/**
 * Focus Management Hook
 * Provides utilities for managing focus order and focusable elements
 * 
 * @returns {Object} Focus management utilities
 */
export function useFocusManagement() {
  const focusableElements = useRef([]);
  const currentFocusIndex = useRef(0);

  const updateFocusableElements = useCallback(() => {
    const elements = document.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    focusableElements.current = Array.from(elements);
  }, []);

  const focusNext = useCallback(() => {
    updateFocusableElements();
    currentFocusIndex.current = (currentFocusIndex.current + 1) % focusableElements.current.length;
    focusableElements.current[currentFocusIndex.current]?.focus();
  }, [updateFocusableElements]);

  const focusPrevious = useCallback(() => {
    updateFocusableElements();
    currentFocusIndex.current =
      currentFocusIndex.current === 0
        ? focusableElements.current.length - 1
        : currentFocusIndex.current - 1;
    focusableElements.current[currentFocusIndex.current]?.focus();
  }, [updateFocusableElements]);

  const focusFirst = useCallback(() => {
    updateFocusableElements();
    currentFocusIndex.current = 0;
    focusableElements.current[0]?.focus();
  }, [updateFocusableElements]);

  const focusLast = useCallback(() => {
    updateFocusableElements();
    currentFocusIndex.current = focusableElements.current.length - 1;
    focusableElements.current[currentFocusIndex.current]?.focus();
  }, [updateFocusableElements]);

  return {
    focusNext,
    focusPrevious,
    focusFirst,
    focusLast,
    updateFocusableElements,
  };
}

export default useFocusManagement;

