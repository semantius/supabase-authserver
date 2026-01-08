interface EnvErrorPageProps {
  missingVariables: string[]
}

export default function EnvErrorPage({ missingVariables }: EnvErrorPageProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex-shrink-0 w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
            <svg
              className="w-6 h-6 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">
            Environment Configuration Error
          </h1>
        </div>

        <div className="space-y-4">
          <p className="text-gray-700">
            The following required environment variables are missing:
          </p>

          <ul className="bg-red-50 border border-red-200 rounded-md p-4 space-y-2">
            {missingVariables.map((variable) => (
              <li key={variable} className="flex items-center gap-2 text-red-800 font-mono">
                <span className="text-red-500">✗</span>
                <code className="font-semibold">{variable}</code>
              </li>
            ))}
          </ul>

          <div className="bg-blue-50 border border-blue-200 rounded-md p-4 space-y-2">
            <h2 className="font-semibold text-blue-900 flex items-center gap-2">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              How to fix this
            </h2>
            <p className="text-sm text-blue-800">
              Set these environment variables using one of the following methods:
            </p>
            <ul className="text-sm text-blue-800 list-disc list-inside space-y-1 ml-2">
              <li>Create a <code className="bg-blue-100 px-1 rounded">.env</code> file in the project root</li>
              <li>Set them in your hosting platform's environment configuration</li>
              <li>Export them in your shell before running the application</li>
            </ul>
            <p className="text-sm text-blue-800 font-semibold mt-3">
              ⚠️ After setting the variables, restart the development server or rebuild the application.
            </p>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-md p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Example .env file:</h3>
            <pre className="bg-gray-900 text-gray-100 p-3 rounded text-sm overflow-x-auto">
              <code>
                {missingVariables.map((variable) => `${variable}=your_value_here`).join('\n')}
              </code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
}
