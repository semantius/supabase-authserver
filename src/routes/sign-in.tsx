import { createRoute } from '@tanstack/react-router'
import { Route as RootRoute } from './__root'
import { SignInPage } from '../pages/sign-in'

export const Route = createRoute({
  getParentRoute: () => RootRoute,
  path: '/sign-in',
  component: SignInPage,
  validateSearch: (search: Record<string, unknown>): { redirect?: string } => {
    return {
      redirect: (search.redirect as string) || undefined,
    }
  },
})
