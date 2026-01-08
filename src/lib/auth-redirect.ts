/**
 * Get the redirect URL after successful authentication.
 * If HOME_URL is set, it will be used for redirect (can be external).
 * Otherwise, redirects to the default home page ('/').
 */
export function getAuthRedirectUrl(): string {
  const homeUrl = import.meta.env.VITE_HOME_URL
  return homeUrl || '/'
}

/**
 * Navigate to the appropriate URL after authentication.
 * Handles both internal routes and external URLs.
 */
export function navigateAfterAuth(navigate: (options: { to: string }) => void) {
  const redirectUrl = getAuthRedirectUrl()
  
  // Check if it's an external URL
  if (redirectUrl.startsWith('http://') || redirectUrl.startsWith('https://')) {
    window.location.href = redirectUrl
  } else {
    navigate({ to: redirectUrl })
  }
}
