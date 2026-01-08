import { RouterProvider } from '@tanstack/react-router'
import { router } from './router'
import { missingEnvVariables } from './lib/supabase'
import EnvErrorPage from './pages/env-error'

function App() {
  // Show error page if environment variables are missing
  if (missingEnvVariables.length > 0) {
    return <EnvErrorPage missingVariables={missingEnvVariables} />
  }

  return <RouterProvider router={router} />
}

export default App
