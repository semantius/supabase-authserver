import { createRouter, notFound } from '@tanstack/react-router'
import { Route as RootRoute } from './routes/__root'
import { Route as IndexRoute } from './routes/index'
import { Route as HelloRoute } from './routes/hello'
import { Route as SignInRoute } from './routes/sign-in'
import { Route as SignUpRoute } from './routes/sign-up'
import { Route as ForgotPasswordRoute } from './routes/forgot-password'
import { Route as ConsentRoute } from './routes/consent'
import { NotFoundPage } from './pages/not-found'

const routeTree = RootRoute.addChildren([
  IndexRoute,
  HelloRoute,
  SignInRoute,
  SignUpRoute,
  ForgotPasswordRoute,
  ConsentRoute,
])

export const router = createRouter({
  routeTree,
  defaultNotFoundComponent: NotFoundPage,
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
