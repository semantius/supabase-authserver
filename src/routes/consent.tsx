import { createRoute } from '@tanstack/react-router'
import { Route as RootRoute } from './__root'
import { ConsentPage } from '../pages/consent'

export const Route = createRoute({
  getParentRoute: () => RootRoute,
  path: '/oauth/consent',
  component: ConsentPage,
})
