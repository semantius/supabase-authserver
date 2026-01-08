import { createRoute } from '@tanstack/react-router'
import { Route as RootRoute } from './__root'
import { ForgotPasswordPage } from '../pages/forgot-password'

export const Route = createRoute({
  getParentRoute: () => RootRoute,
  path: '/forgot-password',
  component: ForgotPasswordPage,
})
