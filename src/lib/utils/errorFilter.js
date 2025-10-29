'use client';

/**
 * Filters out browser extension errors from console
 * This helps keep the console clean during development
 */
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  const originalError = console.error;
  const originalWarn = console.warn;

  // Filter extension-related errors
  const isExtensionError = (args) => {
    if (!args || args.length === 0) return false;
    
    // Extract all string representations from all arguments
    const errorStr = String(args[0] || '');
    const errorMessage = args[0]?.message || '';
    const stackStr = args[0]?.stack || args[1]?.stack || '';
    const combinedStr = JSON.stringify(args);
    
    // Check if any argument contains extension-related content
    const allArgsStr = args.map(arg => {
      if (typeof arg === 'string') return arg;
      if (arg instanceof Error) return arg.message + ' ' + (arg.stack || '');
      if (typeof arg === 'object' && arg !== null) return JSON.stringify(arg);
      return String(arg);
    }).join(' ');
    
    // Combine all strings for comprehensive checking
    const fullText = [errorStr, errorMessage, stackStr, allArgsStr, combinedStr].join(' ');
    
    return (
      // Dark mode/theme extensions
      errorStr.includes('content.js') ||
      errorStr.includes('shadesOn') ||
      
      // Video player extensions
      errorStr.includes('stefanvd') ||
      errorStr.includes('stefanvdvideowindow') ||
      errorStr.includes('player.classList') ||
      
      // React DevTools extension - check all variations
      fullText.includes('react_devtools_backend') ||
      fullText.includes('React instrumentation encountered an error') ||
      fullText.includes('Invalid argument not valid semver') ||
      fullText.includes('not valid semver') ||
      fullText.includes("'' received") ||
      fullText.includes("('' received)") ||
      fullText.includes('validateAndParse') ||
      fullText.includes('esm_compareVersions') ||
      fullText.includes('backendManager') ||
      fullText.includes('activateBackend') ||
      fullText.includes('chrome-extension://fmkadmapgofadopljbjfkapdkoienihi') ||
      (fullText.includes('@react-three/fiber') && (fullText.includes('semver') || fullText.includes('compareVersions') || fullText.includes('validateAndParse'))) ||
      stackStr.includes('react_devtools_backend') ||
      stackStr.includes('backendManager') ||
      stackStr.includes('activateBackend') ||
      stackStr.includes('chrome-extension://fmkadmapgofadopljbjfkapdkoienihi') ||
      errorMessage.includes('not valid semver') ||
      errorMessage.includes('Invalid argument not valid semver') ||
      errorMessage.includes('validateAndParse') ||
      errorMessage.includes('activateBackend') ||
      (errorStr.includes('Invalid argument not valid semver') && errorStr.includes("'' received")) ||
      (errorStr.includes('activateBackend') && errorStr.includes('semver')) ||
      
      // Generic extension errors
      (errorStr.includes('Cannot read properties of undefined') && 
        (stackStr.includes('content.js') || stackStr.includes('stefanvd') || stackStr.includes('chrome-extension://'))) ||
      fullText.includes('chrome-extension://') ||
      fullText.includes('moz-extension://') ||
      fullText.includes('safari-extension://')
    );
  };

  console.error = (...args) => {
    if (!isExtensionError(args)) {
      originalError.apply(console, args);
    }
  };

  // Throttle performance warnings to prevent spam
  let lastPerformanceWarning = 0;
  const performanceWarningCooldown = 5000; // 5 seconds cooldown between warnings
  
  console.warn = (...args) => {
    if (!isExtensionError(args)) {
      // Check if it's a performance warning
      const warningText = String(args[0] || '');
      if (warningText.includes('Animation performance warning: FPS dropped')) {
        const now = Date.now();
        if (now - lastPerformanceWarning < performanceWarningCooldown) {
          return; // Suppress if within cooldown period
        }
        lastPerformanceWarning = now;
      }
      
      originalWarn.apply(console, args);
    }
  };
}
