# Agent Instructions

## Critical Requirements

### Port Configuration
- **ALWAYS use port 3000** - This is the ONLY acceptable port for the development server
- Never use port 3001, 3002, or any other port
- **BEFORE starting the dev server, ALWAYS check if it's already running** - Check if `http://localhost:3000` is accessible
- **IF PORT 3000 IS IN USE, JUST USE IT! DO NOT KILL IT OR START A NEW SERVER!**
- **NEVER start a new dev server if one is already running on port 3000**
- All Playwright tests MUST use `http://localhost:3000`

### Visual Verification
- **ALWAYS visually verify your work** using Playwright browser automation
- Never assume your changes work without visual confirmation
- After making UI changes:
  1. Start the dev server on port 3000
  2. Use Playwright to navigate to the page
  3. Take screenshots to verify the visual appearance
  4. Test responsive behavior at different viewport sizes (mobile, tablet, desktop)
  5. Verify all interactive elements work as expected

### Testing Requirements
- All automated tests must use `http://localhost:3000`
- Test both desktop and mobile viewports
- Verify visual appearance matches requirements before completing work
- Don't trust class names alone - verify the actual rendered output

### Workflow
1. Make code changes
2. **CHECK if dev server is already running** (test if `http://localhost:3000` is accessible)
3. **ONLY if not running**, start dev server on port 3000
4. Use Playwright to visually verify changes
5. Test responsive behavior
6. Only then confirm work is complete

## Common Mistakes to Avoid
- ❌ Starting a new dev server without checking if one is already running
- ❌ Assuming Tailwind classes are working without visual verification
- ❌ Using ports other than 3000
- ❌ Not testing mobile responsive behavior
- ❌ Trusting that HTML has correct classes without seeing the rendered output

## Project Architecture

### Environment Variables
- `VITE_SUPABASE_URL` - Supabase project URL (required)
- `VITE_SUPABASE_ANON_KEY` - Supabase anonymous key (required)
- `VITE_ENABLE_SIGNUP` - Enable/disable user registration (`true` or `false`, defaults to disabled)
- `VITE_HOME_URL` - Optional redirect URL after authentication. If set, users will be redirected here after sign-in. Can be external (https://example.com) or internal (/dashboard). If not set, users stay on the home page (/).

### Key Files
- `src/lib/supabase.ts` - Supabase client configuration
- `src/lib/auth-redirect.ts` - Handles post-authentication redirect logic
- `src/lib/auth-appearance.ts` - Supabase Auth UI theming
- `src/pages/` - Page components using Supabase Auth UI
- `src/routes/` - TanStack Router route definitions
- `src/router.ts` - Router configuration

### Authentication Flow
1. Users accessing protected routes are redirected to `/sign-in`
2. Sign-in/sign-up uses `@supabase/auth-ui-react` components
3. After authentication, check `VITE_HOME_URL` environment variable
4. If `VITE_HOME_URL` is set and external (http/https), redirect via `window.location.href`
5. If internal path, use TanStack Router navigation
6. If not set, user stays on home page (`/`)
7. Session persists via Supabase client

### Tech Stack
- **React 19** with TypeScript
- **Vite** - Dev server (port 3000) and build tool
- **Supabase** - Backend and authentication (@supabase/auth-ui-react for UI)
- **TanStack Router** - Type-safe routing
- **Tailwind CSS v4** - Styling with CSS variables
