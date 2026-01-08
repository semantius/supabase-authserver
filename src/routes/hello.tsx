import { createRoute } from '@tanstack/react-router'
import { Route as RootRoute } from './__root'
import { HomePage } from '../pages/home'

export const Route = createRoute({
  getParentRoute: () => RootRoute,
  path: '/hello',
  component: HomePage,
})
