'use client';

import { useEffect, useRef } from 'react';

const CalendlyWidget = ({ 
  url, 
  height = '600px', 
  minWidth = '320px',
  className = '',
  prefill = {},
  utm = {},
  ...props 
}) => {
  const widgetRef = useRef(null);

  useEffect(() => {
    if (!url || !widgetRef.current) return;

    // Load Calendly widget script if not already loaded
    const loadCalendlyScript = () => {
      return new Promise((resolve) => {
        if (window.Calendly) {
          resolve();
          return;
        }

        const script = document.createElement('script');
        script.src = 'https://assets.calendly.com/assets/external/widget.js';
        script.async = true;
        script.onload = () => resolve();
        script.onerror = () => resolve();
        document.head.appendChild(script);
      });
    };

    const initWidget = async () => {
      await loadCalendlyScript();
      
      if (window.Calendly && widgetRef.current) {
        window.Calendly.initInlineWidget({
          url: url,
          parentElement: widgetRef.current,
          prefill: prefill,
          utm: utm,
        });
      }
    };

    initWidget();

    return () => {
      // Cleanup if needed
      const currentWidget = widgetRef.current;
      if (currentWidget) {
        currentWidget.innerHTML = '';
      }
    };
  }, [url, prefill, utm]);

  if (!url) {
    return (
      <div 
        className={`flex items-center justify-center bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 ${className}`}
        style={{ height, minWidth }}
        {...props}
      >
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Calendly Integration</h3>
          <p className="text-gray-600 mb-4">
            This is where the Calendly widget will be embedded.<br />
            Please provide the Calendly URL to enable booking.
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-md mx-auto">
            <p className="text-sm text-blue-800">
              <strong>Note:</strong> Once you provide the Calendly URL, this placeholder will be replaced with the actual booking widget.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={widgetRef}
      className={`calendly-inline-widget ${className}`}
      style={{ height, minWidth }}
      {...props}
    />
  );
};

export default CalendlyWidget;

