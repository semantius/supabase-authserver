import { createRoute } from '@tanstack/react-router'
import { Route as rootRoute } from '../__root'
import { OAuthErrorPage } from '../../pages/oauth-error'

export const oauthErrorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/oauth/error',
  component: OAuthErrorPage,
})
