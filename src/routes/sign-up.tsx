import { createRoute } from '@tanstack/react-router'
import { Route as RootRoute } from './__root'
import { SignUpPage } from '../pages/sign-up'

export const Route = createRoute({
  getParentRoute: () => RootRoute,
  path: '/sign-up',
  component: SignUpPage,
  validateSearch: (search: Record<string, unknown>) => {
    return {
      redirect: (search.redirect as string) || undefined,
    }
  },
})
