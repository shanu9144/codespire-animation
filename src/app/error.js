'use client';

/**
 * Error Page Component
 * Next.js error page for route-level errors
 * 
 * @param {Object} props - Component props
 * @param {Error} props.error - Error object
 * @param {Function} props.reset - Reset function
 */
export default function Error({ error, reset }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="mb-4">
          <svg
            className="mx-auto h-12 w-12 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Something went wrong!
        </h1>
        <p className="text-gray-600 mb-6">
          {error?.message || 'An unexpected error occurred. Please try again.'}
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => reset()}
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-hover transition-colors"
            aria-label="Try again"
          >
            Try Again
          </button>
          <button
            onClick={() => (window.location.href = '/')}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
            aria-label="Go to home page"
          >
            Go Home
          </button>
        </div>
        {process.env.NODE_ENV === 'development' && error && (
          <details className="mt-6 text-left">
            <summary className="cursor-pointer text-sm font-medium text-gray-700 mb-2">
              Error Stack (Development Only)
            </summary>
            <pre className="text-xs bg-gray-100 p-4 rounded overflow-auto max-h-48">
              {error.stack}
            </pre>
          </details>
        )}
      </div>
    </div>
  );
}

