import { createRoute } from '@tanstack/react-router'
import { Route as RootRoute } from './__root'
import { HomePage } from '../pages/home'
import { useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { useNavigate } from '@tanstack/react-router'

function IndexPage() {
  const navigate = useNavigate()

  useEffect(() => {
    // Check if user is authenticated and HOME_URL is set
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        const homeUrl = import.meta.env.VITE_HOME_URL
        if (homeUrl) {
          // Check if it's an external URL
          if (homeUrl.startsWith('http://') || homeUrl.startsWith('https://')) {
            window.location.href = homeUrl
          } else {
            navigate({ to: homeUrl })
          }
        }
      }
    })
  }, [navigate])

  return <HomePage />
}

export const Route = createRoute({
  getParentRoute: () => RootRoute,
  path: '/',
  component: IndexPage,
})
