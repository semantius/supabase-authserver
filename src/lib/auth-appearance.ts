import { ThemeSupa } from '@supabase/auth-ui-shared'

export const authAppearance = {
  theme: ThemeSupa,
  variables: {
    default: {
      colors: {
        brand: 'hsl(var(--primary))',
        brandAccent: 'hsl(var(--primary))',
        brandButtonText: 'white',
        defaultButtonBackground: 'hsl(var(--primary))',
        defaultButtonBackgroundHover: 'hsl(var(--primary))',
        defaultButtonBorder: 'hsl(var(--border))',
        defaultButtonText: 'hsl(var(--primary-foreground))',
        inputBackground: 'hsl(var(--background))',
        inputBorder: 'hsl(var(--border))',
        inputBorderHover: 'hsl(var(--ring))',
        inputBorderFocus: 'hsl(var(--ring))',
        inputText: 'hsl(var(--foreground))',
        inputPlaceholder: 'hsl(var(--muted-foreground))',
      }
    }
  },
  style: {
    button: {
      borderRadius: 'var(--radius)',
    },
    input: {
      borderRadius: 'var(--radius)',
    }
  }
}
