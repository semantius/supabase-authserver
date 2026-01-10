import { useSearch } from '@tanstack/react-router'

export function OAuthErrorPage() {
  const searchParams = useSearch({ from: '/oauth/error' }) as any
  
  const error = searchParams.error || 'unknown_error'
  const errorDescription = searchParams.error_description || 'An unexpected error occurred during authentication'

  const errorMessages: Record<string, { title: string; description: string; userAction: string }> = {
    invalid_request: {
      title: 'Invalid Request',
      description: 'The authentication request was invalid or malformed.',
      userAction: 'Please try starting the sign-in process again from the beginning.'
    },
    invalid_state_parameter: {
      title: 'Session Expired',
      description: 'Your authentication session has expired or is invalid.',
      userAction: 'Please return to the application and try signing in again.'
    },
    access_denied: {
      title: 'Access Denied',
      description: 'You denied access to the application.',
      userAction: 'If this was a mistake, you can try again.'
    },
    server_error: {
      title: 'Server Error',
      description: 'The authentication server encountered an error.',
      userAction: 'Please try again later or contact support if the problem persists.'
    },
    temporarily_unavailable: {
      title: 'Service Temporarily Unavailable',
      description: 'The authentication service is temporarily unavailable.',
      userAction: 'Please try again in a few moments.'
    }
  }

  const errorInfo = errorMessages[error] || {
    title: 'Authentication Error',
    description: errorDescription,
    userAction: 'Please return to the application and try signing in again.'
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-6 sm:p-8 shadow-lg border border-red-200">
        <div className="flex items-center justify-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full">
            <svg 
              className="h-8 w-8 text-red-600" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
              strokeWidth={2}
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
              />
            </svg>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 text-center mb-2">
          {errorInfo.title}
        </h1>

        <p className="text-gray-600 text-center mb-6">
          {errorInfo.description}
        </p>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-blue-800">
            <span className="font-semibold">What to do next:</span> {errorInfo.userAction}
          </p>
        </div>

        {error && error !== 'unknown_error' && (
          <details className="mt-4">
            <summary className="text-sm text-gray-500 cursor-pointer hover:text-gray-700">
              Technical details
            </summary>
            <div className="mt-2 p-3 bg-gray-50 rounded border border-gray-200">
              <p className="text-xs text-gray-600 font-mono break-all">
                Error: {error}
              </p>
              {errorDescription && (
                <p className="text-xs text-gray-600 font-mono break-all mt-2">
                  Description: {errorDescription}
                </p>
              )}
            </div>
          </details>
        )}
      </div>
    </div>
  )
}
