import { createRoute } from '@tanstack/react-router'
import { Route as RootRoute } from './__root'
import { HomePage } from '../pages/home'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { useNavigate } from '@tanstack/react-router'

function IndexPage() {
  const navigate = useNavigate()
  const [shouldShowHome, setShouldShowHome] = useState(false)

  useEffect(() => {
    // Check if user is authenticated and HOME_URL is set
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        const homeUrl = import.meta.env.VITE_HOME_URL
        if (homeUrl) {
          // Redirect immediately without rendering home page
          if (homeUrl.startsWith('http://') || homeUrl.startsWith('https://')) {
            window.location.href = homeUrl
          } else {
            navigate({ to: homeUrl })
          }
          // Don't show home page when redirecting
          return
        }
      }
      // Only show home page if no redirect is configured
      setShouldShowHome(true)
    })
  }, [navigate])

  // Show nothing while checking for redirect
  if (!shouldShowHome) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    )
  }

  return <HomePage />
}

export const Route = createRoute({
  getParentRoute: () => RootRoute,
  path: '/',
  component: IndexPage,
})
