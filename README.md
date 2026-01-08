# Supabase OAuth Authentication Server

Ready to use OAuth authentication server that provides the missing UI for Supabase OAuth Server. Enables multiple internal apps to use centralized authentication without implementing their own auth. Easily brandable and customizable.

## Features

- Complete OAuth server UI for Supabase
- Centralized authentication for multiple internal apps
- Sign-in and optional sign-up pages
- Password reset flow
- OAuth consent screen
- Easy branding and customization

## Prerequisites

- Node.js 18+
- Supabase account ([free tier available](https://supabase.com))

## Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Configure environment**
   
   Copy `.env.example` to `.env` and add your Supabase credentials:
   ```bash
   cp .env.example .env
   ```

   Get your credentials from [Supabase Dashboard](https://app.supabase.com) → Settings → API and update:
   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   VITE_ENABLE_SIGNUP=false  # Set to 'true' to enable sign-up
   # VITE_HOME_URL=https://example.com  # Uncomment to redirect after auth
   ```

3. **Configure OAuth Server in Supabase**
   
   In your Supabase dashboard: Authentication → OAuth Server → Enable OAuth Server
   
   Set Authorization Path to: `/oauth/consent`

4. **Run**
   ```bash
   npm run dev
   ```
   
   Opens at `http://localhost:3000`


## Configuration

**Environment Variables:**
- `VITE_SUPABASE_URL` - Your Supabase project URL *(required)*
- `VITE_SUPABASE_ANON_KEY` - Your Supabase anon key *(required)*
- `VITE_ENABLE_SIGNUP` - Set to `true` to enable sign-up *(optional, defaults to disabled)*
- `VITE_HOME_URL` - URL to redirect after authentication *(optional)*
  - If set, users redirect here after sign-in (e.g., `https://myapp.com` or `/dashboard`)
  - If not set, users stay on the home page
- `VITE_ADMIN_CONSENT` - Set to `true` or `1` to automatically approve OAuth consent *(optional, defaults to disabled)*
  - Useful for internal systems where admin pre-approves clients
  - When enabled, users skip the consent screen and are automatically approved

## Build

```bash
npm run build
```

Deploy the `dist` directory to any static hosting. Remember to set your environment variables in your hosting platform.


[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/semantius/supabase-authserver)

## Using with Client Apps

Client applications can connect to this OAuth server using standard OpenID Connect:

1. **Get Server Configuration**
   
   Your apps can retrieve the OpenID configuration from:
   ```
   https://<projectid>.supabase.co/auth/v1/.well-known/openid-configuration
   ```

2. **Generate Client ID**
   
   In Supabase dashboard: Authentication → OAuth Apps → Create a new OAuth app
   
   Use the generated Client ID in your client applications to authenticate against this server.







## Limitations

The authentication UI is based on [Supabase's password-based auth components](https://supabase.com/ui/docs/react-router/password-based-auth), which currently does not support 2FA/MFA.

To support [multi-factor authentication](https://supabase.com/docs/guides/auth/auth-mfa), either:
- Supabase must add MFA support to their Auth UI components, or
- The UI components need to be replaced with custom implementations that support MFA flows
