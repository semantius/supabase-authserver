import { Auth } from '@supabase/auth-ui-react'
import { supabase } from '../lib/supabase'
import { authAppearance } from '../lib/auth-appearance'
import { useNavigate, useSearch } from '@tanstack/react-router'
import { useEffect } from 'react'

export function SignInPage() {
  const navigate = useNavigate()
  const searchParams = useSearch({ from: '/sign-in' })
  const redirect = (searchParams as any).redirect
  const enableSignUp = import.meta.env.VITE_ENABLE_SIGNUP === 'true'

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        // Use redirect parameter if provided, otherwise go to home
        const redirectTo = redirect || '/'
        navigate({ to: redirectTo })
      }
    })

    return () => subscription.unsubscribe()
  }, [navigate, redirect])

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-md bg-white sm:rounded-lg sm:shadow-md sm:border sm:border-gray-200 p-6 sm:p-8">
        <Auth
          supabaseClient={supabase}
          appearance={authAppearance}
          providers={[]}
          view="sign_in"
          showLinks={enableSignUp}
        />
      </div>
    </div>
  )
}
