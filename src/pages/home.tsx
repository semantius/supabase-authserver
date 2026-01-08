import { useEffect, useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { supabase } from '../lib/supabase'
import type { User } from '@supabase/supabase-js'

export function HomePage() {
  const navigate = useNavigate()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate({ to: '/sign-in' })
      } else {
        setUser(session.user)
      }
      setLoading(false)
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        navigate({ to: '/sign-in' })
      } else {
        setUser(session.user)
      }
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [navigate])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    navigate({ to: '/sign-in' })
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-12 px-4">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Welcome! 🎉</h1>
            <button
              onClick={handleSignOut}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
            >
              Sign Out
            </button>
          </div>

          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Logged in as</p>
                  <p className="font-semibold text-gray-900">{user?.email}</p>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
              <h2 className="text-lg font-semibold text-yellow-900 mb-2">⚙️ Configuration Needed</h2>
              <p className="text-gray-700 mb-3">
                You're seeing this page because you logged in directly without an OAuth flow redirect, 
                and no default redirect URL is configured.
              </p>
              <p className="text-gray-700 mb-3">
                <strong>Recommended:</strong> Set <code className="bg-gray-200 px-1.5 py-0.5 rounded text-sm">VITE_HOME_URL</code> in 
                your <code className="bg-gray-200 px-1.5 py-0.5 rounded text-sm">.env</code> file to automatically 
                redirect users to your application after sign-in:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4 text-sm text-gray-700">
                <li>External URL: <code className="bg-gray-200 px-1.5 py-0.5 rounded text-xs">VITE_HOME_URL=https://app.example.com</code></li>
                <li>Internal path: <code className="bg-gray-200 px-1.5 py-0.5 rounded text-xs">VITE_HOME_URL=/dashboard</code></li>
              </ul>
            </div>

            <div className="border-t pt-6">
              <h2 className="text-xl font-semibold mb-3">Alternative: Customize This Page</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Instead of redirecting, you can customize this page to show a dashboard or list of applications. 
                  Edit the following files:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
                  <li><code className="bg-gray-200 px-1.5 py-0.5 rounded text-xs">src/pages/home.tsx</code> - Main content and layout</li>
                  <li><code className="bg-gray-200 px-1.5 py-0.5 rounded text-xs">src/routes/index.tsx</code> - Route configuration and redirect logic</li>
                </ul>
              </div>
            </div>

            <div className="border-t pt-6">
              <h2 className="text-xl font-semibold mb-3">User Details</h2>
              <div className="bg-gray-100 rounded-md p-4 overflow-auto">
                <pre className="text-sm">
                  {JSON.stringify(
                    {
                      id: user?.id,
                      email: user?.email,
                      created_at: user?.created_at,
                      last_sign_in_at: user?.last_sign_in_at,
                    },
                    null,
                    2
                  )}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
