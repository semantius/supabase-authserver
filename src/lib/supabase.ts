import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Check for missing environment variables
export const missingEnvVariables: string[] = []
if (!supabaseUrl) missingEnvVariables.push('VITE_SUPABASE_URL')
if (!supabaseAnonKey) missingEnvVariables.push('VITE_SUPABASE_ANON_KEY')

// Only create client if all variables are present
// The client will be created if no variables are missing, which means the app
// won't even render pages that use it due to the check in App.tsx
export const supabase = createClient(
  supabaseUrl || 'http://placeholder.local', 
  supabaseAnonKey || 'placeholder'
)
