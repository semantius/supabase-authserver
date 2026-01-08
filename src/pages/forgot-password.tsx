import { Auth } from '@supabase/auth-ui-react'
import { supabase } from '../lib/supabase'
import { authAppearance } from '../lib/auth-appearance'
import { useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'

export function ForgotPasswordPage() {
  const navigate = useNavigate()

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        navigate({ to: '/' })
      }
    })

    return () => subscription.unsubscribe()
  }, [navigate])

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-md bg-white sm:rounded-lg sm:shadow-md sm:border sm:border-gray-200 p-6 sm:p-8">
        <Auth
          supabaseClient={supabase}
          appearance={authAppearance}
          providers={[]}
          view="forgotten_password"
          showLinks={true}
        />
      </div>
    </div>
  )
}
