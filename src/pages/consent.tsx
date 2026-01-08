import { useEffect, useState } from 'react'
import { useNavigate, useSearch } from '@tanstack/react-router'
import { supabase } from '../lib/supabase'

export function ConsentPage() {
  const navigate = useNavigate()
  const searchParams = useSearch({ from: '/oauth/consent' })
  const authorizationId = (searchParams as any).authorization_id

  const [authDetails, setAuthDetails] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadAuthDetails() {
      if (!authorizationId) {
        setError('Missing authorization_id')
        setLoading(false)
        return
      }
      console.log('Loading authorization details for ID:', authorizationId)
      // Check if user is authenticated
      const {
        data: { user },
      } = await supabase.auth.getUser()
      console.log('Current user:', user);

      if (!user) {
        await navigate({ to: `/sign-in?redirect=/oauth/consent?authorization_id=${authorizationId}` })
        return
      }

      // Get authorization details using the authorization_id
      const { data, error } = await supabase.auth.oauth.getAuthorizationDetails(authorizationId)
      console.log('Authorization details:', data, error);

      if (error) {
        setError(error.message)
      } else {
        // Check if user already gave consent (API returns redirect_url directly)
        if (data.redirect_url) {
          // User already consented, redirect immediately
          window.location.href = data.redirect_url
          // Return a placeholder to keep loading state while redirect happens
          return new Promise(() => { })  // Never resolves, redirect takes over
        } 

        // Check if admin consent is enabled (auto-approve for internal systems)
        const adminConsent = import.meta.env.VITE_ADMIN_CONSENT
        if (adminConsent === 'true' || adminConsent === '1') {
          // Auto-approve consent for internal systems
          console.log('Admin consent enabled, auto-approving authorization')
          const { data: approvalData, error: approvalError } = await supabase.auth.oauth.approveAuthorization(authorizationId, { skipBrowserRedirect: true })

          if (approvalError) {
            setError(approvalError.message)
          } else {
            // Redirect to client app
            window.location.href = approvalData.redirect_url
            return new Promise(() => { })  // Never resolves, redirect takes over
          }
        }

        setAuthDetails(data)
      }

      setLoading(false)
    }

    loadAuthDetails()
  }, [authorizationId, navigate])

  async function handleApprove() {
    if (!authorizationId) return
    console.log('Approving authorization for ID:', authorizationId)
    const { data, error } = await supabase.auth.oauth.approveAuthorization(authorizationId)

    if (error) {
      setError(error.message)
    } else {
      // Redirect to client app
      window.location.href = data.redirect_url
    }
  }

  async function handleDeny() {
    if (!authorizationId) return

    const { data, error } = await supabase.auth.oauth.denyAuthorization(authorizationId)

    if (error) {
      setError(error.message)
    } else {
      // Redirect to client app with error
      window.location.href = data.redirect_url
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
        <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-md border border-red-200">
          <div className="flex items-center mb-4">
            <svg className="h-6 w-6 text-red-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h2 className="text-xl font-semibold text-red-600">Error</h2>
          </div>
          <p className="text-gray-700">{error}</p>
        </div>
      </div>
    )
  }

  if (!authDetails) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
        <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-md border border-gray-200">
          <p className="text-gray-700 text-center">No authorization request found</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md border border-gray-200 p-6 sm:p-8">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Authorize {authDetails.client?.name || authDetails.client_id || 'Application'}
          </h1>
          <p className="text-gray-600">
            This application wants to access your account.
          </p>
        </div>

        <div className="space-y-4 mb-6 bg-gray-50 rounded-lg p-4 border border-gray-200">
          <div>
            <p className="text-sm font-semibold text-gray-700 mb-1">Client</p>
            <p className="text-gray-900">{authDetails.client?.name || authDetails.client_id || 'Unknown'}</p>
          </div>

          <div>
            <p className="text-sm font-semibold text-gray-700 mb-1">Redirect URI</p>
            <p className="text-gray-900 break-all text-sm">{authDetails.redirect_uri}</p>
          </div>

          {authDetails.scopes && authDetails.scopes.length > 0 && (
            <div>
              <p className="text-sm font-semibold text-gray-700 mb-2">Requested permissions</p>
              <ul className="space-y-1">
                {authDetails.scopes.map((scope: string) => (
                  <li key={scope} className="flex items-center text-gray-900">
                    <svg className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm">{scope}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleApprove}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Approve
          </button>
          <button
            onClick={handleDeny}
            className="flex-1 bg-white hover:bg-gray-50 text-gray-700 font-medium py-2.5 px-4 rounded-lg border border-gray-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Deny
          </button>
        </div>

        <p className="text-xs text-gray-500 text-center mt-6">
          By approving, you allow this application to access your account information according to the permissions listed above.
        </p>
      </div>
    </div>
  )
}
